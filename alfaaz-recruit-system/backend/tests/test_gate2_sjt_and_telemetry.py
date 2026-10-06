import unittest
import os
import sys
import json
import hashlib
import uuid
from pathlib import Path

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from recruit_system.services.sjt_engine import (
    verify_and_load_configs, get_public_sjt_payload, score_sjt_responses, get_config_hash
)
from recruit_system.services.telemetry_engine import ingest_telemetry_batch, calculate_active_duration_ms
from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBApplicantIdentity, DBDataQualityFlag
from sqlmodel import Session, create_engine, SQLModel, select

class TestGate2SJTAndTelemetry(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def test_config_hashes_and_golden_ranges(self):
        params, sjt, config_hash, ranges = verify_and_load_configs()
        self.assertEqual(len(params), 7)
        self.assertEqual(len(sjt["scenarios"]), 7)
        self.assertIsNotNone(config_hash)

        expected_ranges = {
            "empathy": {"min": 0, "max": 19, "span": 19},
            "conscientiousness": {"min": 0, "max": 21, "span": 21},
            "collaborative_spirit": {"min": 1, "max": 18, "span": 17},
            "emotional_agility": {"min": 1, "max": 17, "span": 16},
            "curiosity": {"min": 0, "max": 17, "span": 17},
            "creative_initiative": {"min": 0, "max": 20, "span": 20},
            "motivation": {"min": 0, "max": 19, "span": 19}
        }

        for p, exp in expected_ranges.items():
            self.assertEqual(ranges[p]["min"], exp["min"], f"Min mismatch for {p}")
            self.assertEqual(ranges[p]["max"], exp["max"], f"Max mismatch for {p}")
            self.assertEqual(ranges[p]["span"], exp["span"], f"Span mismatch for {p}")

    def test_recruit_config_copies_are_byte_identical(self):
        root = Path(__file__).resolve().parents[2] if (Path(__file__).resolve().parents[2] / "backend").exists() else Path(__file__).resolve().parents[1]
        for filename in ("sjt_items.json", "parameters.json", "locked_hashes.json"):
            self.assertEqual(
                (root / "config" / filename).read_bytes(),
                (root / "backend" / "config" / filename).read_bytes(),
                f"{filename} must be synchronized with backend/config",
            )

    def test_locked_hashes_and_fingerprints(self):
        root = Path(__file__).resolve().parents[2] if (Path(__file__).resolve().parents[2] / "backend").exists() else Path(__file__).resolve().parents[1]
        with open(root / "config" / "locked_hashes.json", "r", encoding="utf-8") as f:
            locked = json.load(f)

        sjt_bytes = (root / "config" / "sjt_items.json").read_bytes()
        sjt_lf = hashlib.sha256(sjt_bytes.replace(b"\r\n", b"\n")).hexdigest()
        self.assertEqual(sjt_lf, locked["sjt_reference_lf_sha256"])

        param_bytes = (root / "config" / "parameters.json").read_bytes()
        param_lf = hashlib.sha256(param_bytes.replace(b"\r\n", b"\n")).hexdigest()
        self.assertEqual(param_lf, locked["parameters_lf_sha256"])

        param_data = json.loads(param_bytes.decode("utf-8"))
        canonical_p = json.dumps(param_data, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
        self.assertEqual(hashlib.sha256(canonical_p).hexdigest(), locked["parameters_canonical_sha256"])

        sjt_data = json.loads(sjt_bytes.decode("utf-8"))
        from recruit_system.services.sjt_engine import compute_keys_fingerprint
        self.assertEqual(compute_keys_fingerprint(sjt_data), locked["sjt_keys_fingerprint"])

    def test_tampering_with_sjt_keys_fails(self):
        import recruit_system.services.sjt_engine as engine
        # Clear cache
        engine._CACHED_PARAMS = None
        engine._CACHED_SJT = None

        orig_path = engine.SJT_ITEMS_PATH
        import tempfile
        try:
            with open(orig_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            # Tamper key value
            data["scenarios"][0]["options"][0]["keys"]["empathy"] += 1
            with tempfile.NamedTemporaryFile("w", delete=False, suffix=".json", encoding="utf-8") as tf:
                json.dump(data, tf)
                temp_name = tf.name

            engine.SJT_ITEMS_PATH = temp_name
            with self.assertRaises(RuntimeError):
                engine.verify_and_load_configs()
        finally:
            engine.SJT_ITEMS_PATH = orig_path
            engine._CACHED_PARAMS = None
            engine._CACHED_SJT = None
            if 'temp_name' in locals() and os.path.exists(temp_name):
                os.remove(temp_name)

    def test_sjt_band_boundary_cutoffs(self):
        params, sjt, _, _ = verify_and_load_configs()
        responses = {s["id"]: s["options"][0]["id"] for s in sjt["scenarios"]}
        result = score_sjt_responses(responses)
        for p in params:
            self.assertIn(result[p]["band"], ["LOW", "MODERATE", "HIGH"])
            self.assertGreaterEqual(result[p]["raw"], result[p]["min"])
            self.assertLessEqual(result[p]["raw"], result[p]["max"])

    def test_public_payload_omits_scoring_keys(self):
        public_payload = get_public_sjt_payload()
        self.assertIn("scenarios", public_payload)
        payload_str = json.dumps(public_payload)

        # Scoring keys must NEVER be exposed
        self.assertNotIn('"keys"', payload_str)
        self.assertNotIn('"conscientiousness"', payload_str)
        self.assertNotIn('"creative_initiative"', payload_str)

        for s in public_payload["scenarios"]:
            self.assertIn("id", s)
            self.assertIn("setup", s)
            self.assertEqual(len(s["options"]), 4)
            for opt in s["options"]:
                self.assertIn("id", opt)
                self.assertIn("text", opt)
                self.assertNotIn("keys", opt)

    def test_telemetry_idempotency_and_gap_detection(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            sess = DBSession(session_id=session_id, status="ACTIVE")
            db.add(sess)
            db.commit()

            batch1 = [
                {"seq": 1, "segment_id": 1, "t_ms": 100.0, "screen": "sjt", "action": "view"},
                {"seq": 2, "segment_id": 1, "t_ms": 200.0, "screen": "sjt", "action": "hover"},
                {"seq": 3, "segment_id": 1, "t_ms": 300.0, "screen": "sjt", "action": "click"}
            ]
            res1 = ingest_telemetry_batch(db, session_id, batch1)
            self.assertEqual(res1["ingested_count"], 3)
            self.assertEqual(res1["ignored_duplicates"], 0)

            # Duplicate submission
            batch2 = [
                {"seq": 2, "segment_id": 1, "t_ms": 200.0, "screen": "sjt", "action": "hover"},
                {"seq": 3, "segment_id": 1, "t_ms": 300.0, "screen": "sjt", "action": "click"},
                {"seq": 4, "segment_id": 1, "t_ms": 400.0, "screen": "sjt", "action": "next"}
            ]
            res2 = ingest_telemetry_batch(db, session_id, batch2)
            self.assertEqual(res2["ingested_count"], 1)
            self.assertEqual(res2["ignored_duplicates"], 2)

            events = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id)).all()
            self.assertEqual(len(events), 4)

    def test_active_duration_pausing_subtraction(self):
        ev1 = DBTelemetryEvent(session_id="s1", seq=1, segment_id=1, t_ms=1000.0, screen="game", action="start")
        ev2 = DBTelemetryEvent(session_id="s1", seq=2, segment_id=1, t_ms=3000.0, screen="game", action="pause")
        ev3 = DBTelemetryEvent(session_id="s1", seq=3, segment_id=1, t_ms=8000.0, screen="game", action="resume")
        ev4 = DBTelemetryEvent(session_id="s1", seq=4, segment_id=1, t_ms=10000.0, screen="game", action="finish")

        dur = calculate_active_duration_ms([ev1, ev2, ev3, ev4])
        self.assertEqual(dur, 4000.0)

    def test_forbidden_client_fields_stripped_and_flagged(self):
        """Forbidden client fields are strictly stripped and flagged diagnostically."""
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            hostile_event = {
                "seq": 1,
                "segment_id": 1,
                "t_ms": 1000.0,
                "screen": "game",
                "mini_game": "E1",
                "action": "tile_sorted",
                "task_def_version": "1.0",
                "data": {
                    "stimulus_id": "E1_T1",
                    "choice": "container_1",
                    "condition_id": "rule_shift_color",
                    "correct": True,
                    "is_correct": True,
                    "target": "color_blue",
                    "rule": "COLOR",
                    "perseverative_choice": False,
                    "is_context_appropriate": True
                }
            }
            res = ingest_telemetry_batch(db, session_id, [hostile_event])
            self.assertEqual(res["ingested_count"], 1)

            # Diagnostic flag must be recorded
            flag = db.exec(
                select(DBDataQualityFlag).where(
                    DBDataQualityFlag.session_id == session_id,
                    DBDataQualityFlag.flag == "forbidden_client_field_detected"
                )
            ).first()
            self.assertIsNotNone(flag)
            for fld in ["condition_id", "correct", "is_correct", "target", "rule", "perseverative_choice", "is_context_appropriate"]:
                self.assertIn(fld, flag.detail)

            # Event stored in DB must NOT have any forbidden fields
            stored = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id, DBTelemetryEvent.seq == 1)).first()
            d = json.loads(stored.data_json)
            for fld in ["condition_id", "correct", "is_correct", "target", "rule", "perseverative_choice", "is_context_appropriate"]:
                self.assertNotIn(fld, d)
            self.assertIn("choice", d)
            self.assertIn("stimulus_id", d)

    def test_task_def_version_validation(self):
        """Missing or mismatched task_def_version records appropriate diagnostic flags."""
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            batch = [
                {"seq": 1, "segment_id": 1, "t_ms": 1000.0, "screen": "game", "mini_game": "F1", "action": "slider_input", "data": {"stimulus_id": "F1_T1"}},
                {"seq": 2, "segment_id": 1, "t_ms": 2000.0, "screen": "game", "mini_game": "F1", "action": "slider_input", "task_def_version": "2.0", "data": {"stimulus_id": "F1_T2"}}
            ]
            ingest_telemetry_batch(db, session_id, batch)

            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            flag_names = {fl.flag for fl in flags}
            self.assertIn("missing_task_def_version", flag_names)
            self.assertIn("invalid_task_def_version", flag_names)

            ev1 = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id, DBTelemetryEvent.seq == 1)).first()
            self.assertIsNone(ev1.task_def_version)
            ev2 = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id, DBTelemetryEvent.seq == 2)).first()
            self.assertEqual(ev2.task_def_version, "2.0")

    def test_unknown_client_fields_stripped_and_flagged(self):
        """Unknown client fields not in ALLOWED_EVENT_DATA_FIELDS are stripped and flagged."""
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            unrecognized_event = {
                "seq": 1,
                "segment_id": 1,
                "t_ms": 1000.0,
                "screen": "game",
                "mini_game": "F1",
                "action": "slider_input",
                "task_def_version": "1.0",
                "data": {
                    "stimulus_id": "F1_T1",
                    "slider_position_raw": 50,
                    "malicious_injection": "drop_tables",
                    "random_unsupported_key": 123
                }
            }
            res = ingest_telemetry_batch(db, session_id, [unrecognized_event])
            self.assertEqual(res["ingested_count"], 1)

            flag = db.exec(
                select(DBDataQualityFlag).where(
                    DBDataQualityFlag.session_id == session_id,
                    DBDataQualityFlag.flag == "unknown_client_field_detected"
                )
            ).first()
            self.assertIsNotNone(flag)
            self.assertIn("malicious_injection", flag.detail)
            self.assertIn("random_unsupported_key", flag.detail)

            stored = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id, DBTelemetryEvent.seq == 1)).first()
            d = json.loads(stored.data_json)
            self.assertNotIn("malicious_injection", d)
            self.assertNotIn("random_unsupported_key", d)
            self.assertIn("stimulus_id", d)
            self.assertIn("slider_position_raw", d)

    def test_pointer_stream_events_dropped_without_seq_gap_or_accounting(self):
        """Continuous pointer events are discarded before sequence and quota accounting."""
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            batch = [
                {"seq": 1, "segment_id": 1, "t_ms": 100.0, "screen": "game", "mini_game": "F1", "action": "trial_presented", "task_def_version": "1.0", "data": {"stimulus_id": "F1_T1"}},
                {"seq": 9991, "segment_id": 1, "t_ms": 150.0, "screen": "game", "mini_game": "F1", "action": "pointermove", "task_def_version": "1.0", "data": {"x": 10, "y": 20}},
                {"seq": 9992, "segment_id": 1, "t_ms": 160.0, "screen": "game", "mini_game": "F1", "action": "mousemove", "task_def_version": "1.0", "data": {"x": 12, "y": 22}},
                {"seq": 9993, "segment_id": 1, "t_ms": 170.0, "screen": "game", "mini_game": "F1", "action": "touchmove", "task_def_version": "1.0", "data": {"x": 14, "y": 24}},
                {"seq": 9994, "segment_id": 1, "t_ms": 180.0, "screen": "game", "mini_game": "F1", "action": "continuous_drag", "task_def_version": "1.0", "data": {"x": 16, "y": 26}},
                {"seq": 2, "segment_id": 1, "t_ms": 200.0, "screen": "game", "mini_game": "F1", "action": "slider_input", "task_def_version": "1.0", "data": {"stimulus_id": "F1_T1", "slider_position_raw": 50}}
            ]
            res = ingest_telemetry_batch(db, session_id, batch)
            self.assertEqual(res["ingested_count"], 2)

            events = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id)).all()
            self.assertEqual(len(events), 2)
            self.assertEqual([e.seq for e in events], [1, 2])

            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            flag_names = {fl.flag for fl in flags}
            self.assertNotIn("seq_gap", flag_names)
            self.assertNotIn("seq_conflict", flag_names)

if __name__ == "__main__":
    unittest.main()
