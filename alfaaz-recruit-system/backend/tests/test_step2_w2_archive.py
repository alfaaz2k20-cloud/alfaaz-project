import unittest
import os
import sys
import json
import uuid
from pathlib import Path

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, SQLModel, create_engine, select
from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag
from recruit_system.services.telemetry_engine import ingest_telemetry_batch
from recruit_system.services.task_definitions import get_task_definitions, get_stimulus_ground_truth
from recruit_system.services.feature_extractor import extract_session_features

class TestStep2W2Archive(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w2@example.com",
            full_name="Archive Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w2_task_definitions_golden_fixture(self):
        """Verify task definitions for A1 (5 items in V1, 4 in V2), A2 (4 items: 3 exceptions + 1 control), A3 (5 QC records)."""
        defs = get_task_definitions("1.0")
        games = defs.get("games", {})

        # A1: 5 items in V1
        self.assertIn("A1", games)
        a1 = games["A1"]
        self.assertEqual(a1.get("total_trials"), 5)
        self.assertEqual(len(a1.get("trials", [])), 5)
        expected_a1_stims = [f"DOC_{i:02d}" for i in range(1, 6)]
        self.assertEqual([t["stimulus_id"] for t in a1["trials"]], expected_a1_stims)

        # V2: A1 (4 items)
        defs_v2 = get_task_definitions("2.0")
        games_v2 = defs_v2.get("games", {})
        self.assertEqual(games_v2["A1"].get("total_trials"), 4)
        self.assertEqual(len(games_v2["A1"].get("trials", [])), 4)

        # A2: 4 trials (3 true exceptions, 1 clean control)
        self.assertIn("A2", games)
        a2 = games["A2"]
        self.assertEqual(a2.get("total_trials"), 4)
        self.assertEqual(len(a2.get("trials", [])), 4)
        self.assertEqual(a2["trials"][0]["condition_type"], "true_exception")
        self.assertEqual(a2["trials"][1]["condition_type"], "clean_control")
        self.assertEqual(a2["trials"][2]["condition_type"], "true_exception")
        self.assertEqual(a2["trials"][3]["condition_type"], "true_exception")

        # A3: 5 records (3 error, 2 clean control)
        self.assertIn("A3", games)
        a3 = games["A3"]
        self.assertEqual(a3.get("total_trials"), 5)
        self.assertEqual(len(a3.get("trials", [])), 5)
        err_counts = sum(1 for t in a3["trials"] if t.get("has_error"))
        clean_counts = sum(1 for t in a3["trials"] if not t.get("has_error"))
        self.assertEqual(err_counts, 3)
        self.assertEqual(clean_counts, 2)

    def test_a1_server_ground_truth_scoring_without_client_correctness(self):
        """A1 raw telemetry has choice + stimulus_id; server evaluates correctness strictly via ground truth."""
        events = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=1, segment_id=1, t_ms=100.0,
                screen="game", mini_game="A1", action="guide_viewed", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_01", "task_def_version": "1.0"})
            ),
            # DOC_01: target is 19th_century (Candidate chooses 19th_century -> Correct)
            DBTelemetryEvent(
                session_id=self.session_id, seq=2, segment_id=1, t_ms=2000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_01", "choice": "19th_century", "dwell_ms": 1900.0})
            ),
            # DOC_02: target is poetry (Candidate chooses poetry -> Correct)
            DBTelemetryEvent(
                session_id=self.session_id, seq=3, segment_id=1, t_ms=4000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_02", "choice": "poetry", "dwell_ms": 2000.0})
            ),
            # DOC_03: target is 20th_century (Candidate chooses 19th_century -> Incorrect)
            DBTelemetryEvent(
                session_id=self.session_id, seq=4, segment_id=1, t_ms=6000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_03", "choice": "19th_century", "dwell_ms": 2000.0})
            ),
            # DOC_04: target is kashmiri (Candidate chooses kashmiri -> Correct)
            DBTelemetryEvent(
                session_id=self.session_id, seq=5, segment_id=1, t_ms=8000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_04", "choice": "kashmiri", "dwell_ms": 2000.0})
            ),
            # DOC_05: target is chronicle (Candidate chooses chronicle -> Correct)
            DBTelemetryEvent(
                session_id=self.session_id, seq=6, segment_id=1, t_ms=10000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_05", "choice": "chronicle", "dwell_ms": 2000.0})
            )
        ]
        self.db.add_all(events)
        self.db.commit()

        features = extract_session_features(self.db, self.session_id)
        a1_feats = {f.feature_name: f for f in features if f.mini_game == "A1"}

        self.assertIn("classification_rule_adherence_rate", a1_feats)
        # 4 out of 5 correct = 0.8
        self.assertEqual(a1_feats["classification_rule_adherence_rate"].value_raw, 0.8)
        self.assertTrue(a1_feats["classification_rule_adherence_rate"].valid)

    def test_a2_observation_gate_regression_n1_n2_n3(self):
        """A2 regression coverage: N=1 -> INSUFFICIENT, N=2 -> INSUFFICIENT, N=3 -> potentially valid."""
        # 1. Test N=1
        sess_n1 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess_n1, status="GAMES"))
        self.db.add(DBTelemetryEvent(
            session_id=sess_n1, seq=1, segment_id=1, t_ms=1000.0,
            screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
            data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
        ))
        self.db.commit()

        f_n1 = {f.feature_name: f for f in extract_session_features(self.db, sess_n1) if f.mini_game == "A2"}
        self.assertIn("exception_flagging_precision", f_n1)
        self.assertFalse(f_n1["exception_flagging_precision"].valid, "N=1 must not be valid")
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(f_n1["exception_flagging_precision"].flags_json))

        # 2. Test N=2
        sess_n2 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess_n2, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(
                session_id=sess_n2, seq=1, segment_id=1, t_ms=1000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=sess_n2, seq=2, segment_id=1, t_ms=2000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_02", "action_id": "file_standard"})
            )
        ])
        self.db.commit()

        f_n2 = {f.feature_name: f for f in extract_session_features(self.db, sess_n2) if f.mini_game == "A2"}
        self.assertIn("exception_flagging_precision", f_n2)
        self.assertFalse(f_n2["exception_flagging_precision"].valid, "N=2 must not be valid")
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(f_n2["exception_flagging_precision"].flags_json))

        # 3. Test N=3 genuine exceptions (EXC_01, EXC_02, EXC_03, EXC_04 -> 3 genuine + 1 control)
        sess_n3 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess_n3, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(
                session_id=sess_n3, seq=1, segment_id=1, t_ms=1000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=sess_n3, seq=2, segment_id=1, t_ms=2000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_02", "action_id": "file_standard"})
            ),
            DBTelemetryEvent(
                session_id=sess_n3, seq=3, segment_id=1, t_ms=3000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_03", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=sess_n3, seq=4, segment_id=1, t_ms=4000.0,
                screen="game", mini_game="A2", action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_04", "action_id": "flag_exception"})
            )
        ])
        self.db.commit()

        f_n3 = {f.feature_name: f for f in extract_session_features(self.db, sess_n3) if f.mini_game == "A2"}
        self.assertIn("exception_flagging_precision", f_n3)
        self.assertTrue(f_n3["exception_flagging_precision"].valid, "N=3 must be valid")
        self.assertEqual(f_n3["exception_flagging_precision"].value_raw, 1.0)
        self.assertEqual(json.loads(f_n3["exception_flagging_precision"].flags_json), [])

    def test_a2_exception_resolved_action_cannot_bypass_observation_gate(self):
        """Even if action is exception_resolved, N=1 must still be INSUFFICIENT."""
        sess = str(uuid.uuid4())
        self.db.add(DBSession(session_id=sess, status="GAMES"))
        self.db.add(DBTelemetryEvent(
            session_id=sess, seq=1, segment_id=1, t_ms=1000.0,
            screen="game", mini_game="A2", action="exception_resolved", task_def_version="1.0",
            data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
        ))
        self.db.commit()

        feats = {f.feature_name: f for f in extract_session_features(self.db, sess) if f.mini_game == "A2"}
        self.assertFalse(feats["exception_flagging_precision"].valid)
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(feats["exception_flagging_precision"].flags_json))

    def test_a3_raw_telemetry_and_quarantine_preservation(self):
        """A3 emits granular inspect/toggle/verify telemetry, client summaries are rejected, and server reconstructs state."""
        from recruit_system.services.task_definitions import reconstruct_a3_inspection_state

        # 1. Ingest primitive events: 5 inspected records, 3 toggled discrepancies, verification finalized
        primitive_events = []
        seq = 10
        # Candidate inspects all 5 records
        for i in range(1, 6):
            primitive_events.append({
                "seq": seq,
                "screen": "game",
                "mini_game": "A3",
                "action": "record_inspected",
                "task_def_version": "1.0",
                "data": {"trial_index": i - 1, "stimulus_id": f"REC_0{i}"},
                "t_ms": 10000.0 + i * 1000
            })
            seq += 1

        # Candidate flags discrepancy on REC_01, REC_03, REC_05 (true error records in task definitions)
        for i in [1, 3, 5]:
            primitive_events.append({
                "seq": seq,
                "screen": "game",
                "mini_game": "A3",
                "action": "discrepancy_toggled",
                "task_def_version": "1.0",
                "data": {"trial_index": i - 1, "stimulus_id": f"REC_0{i}", "flagged_state": True},
                "t_ms": 16000.0 + i * 500
            })
            seq += 1

        # Candidate finalizes verification without client-authored summaries
        primitive_events.append({
            "seq": seq,
            "screen": "game",
            "mini_game": "A3",
            "action": "verification_finalized",
            "task_def_version": "1.0",
            "data": {"action_id": "approve_ledger"},
            "t_ms": 25000.0
        })

        ingest_telemetry_batch(self.db, self.session_id, primitive_events)

        # 2. Server deterministic reconstruction from raw events
        stored_events = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "A3"
            )
        ).all()
        reconstruction = reconstruct_a3_inspection_state(stored_events)

        self.assertEqual(reconstruction["inspected_count"], 5)
        self.assertEqual(reconstruction["flagged_count"], 3)
        self.assertEqual(reconstruction["flagged_records"], ["REC_01", "REC_03", "REC_05"])
        self.assertEqual(reconstruction["detection_accuracy"], 1.0) # 3 true errors caught + 2 clean controls untouched = 5/5
        self.assertTrue(reconstruction["verification_finalized"])

        # 3. Test that client attempting to author summary fields is stripped and flagged
        client_summary_batch = [{
            "seq": 999,
            "screen": "game",
            "mini_game": "A3",
            "action": "verification_finalized",
            "task_def_version": "1.0",
            "data": {
                "inspected_count": 8,
                "flagged_count": 4,
                "flagged_records": ["REC_01", "REC_03", "REC_05", "REC_07"],
                "action_id": "approve_ledger"
            },
            "t_ms": 26000.0
        }]
        ingest_telemetry_batch(self.db, self.session_id, client_summary_batch)

        # Forbidden client field flag must be recorded
        flag = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == self.session_id,
                DBDataQualityFlag.flag == "forbidden_client_field_detected"
            )
        ).first()
        self.assertIsNotNone(flag)
        self.assertIn("inspected_count", flag.detail)
        self.assertIn("flagged_count", flag.detail)
        self.assertIn("flagged_records", flag.detail)

        # Stripped event payload in DB must not contain summary fields
        ev999 = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.seq == 999
            )
        ).first()
        d999 = json.loads(ev999.data_json)
        self.assertNotIn("inspected_count", d999)
        self.assertNotIn("flagged_count", d999)
        self.assertNotIn("flagged_records", d999)

        # 4. Extractor remains quarantined under feature_not_implemented
        features = extract_session_features(self.db, self.session_id)
        a3_feats = [f for f in features if f.mini_game == "A3"]

        self.assertEqual(len(a3_feats), 2)
        for f in a3_feats:
            self.assertFalse(f.valid)
            self.assertIsNone(f.value_raw)
            flags = json.loads(f.flags_json)
            self.assertIn("feature_not_implemented", flags)

    def test_sequence_gap_and_missing_task_def_version(self):
        """Test telemetry validation for sequence gap and missing version."""
        # Seq gap: jumps from 1 to 5
        evs = [
            {"seq": 1, "screen": "game", "mini_game": "A1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 5, "screen": "game", "mini_game": "A1", "action": "test", "task_def_version": "1.0", "t_ms": 200.0}
        ]
        ingest_telemetry_batch(self.db, self.session_id, evs)
        flags = self.db.exec(
            select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == self.session_id)
        ).all()
        flag_names = {f.flag for f in flags}
        self.assertIn("seq_gap", flag_names)

    def test_interruption_event(self):
        """Verify reload/interruption event ingestion."""
        evs = [
            {"seq": 100, "screen": "game", "mini_game": "A1", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "page_reload"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_deterministic_recomputation(self):
        """Ensure feature extraction is byte-for-byte deterministic across recomputes."""
        events = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=50, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="A1", action="item_sorted", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "DOC_01", "choice": "19th_century", "dwell_ms": 1500.0})
            )
        ]
        self.db.add_all(events)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
