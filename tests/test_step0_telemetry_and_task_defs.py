import unittest
import hashlib
import os
import sys
from pathlib import Path

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, SQLModel, create_engine, select
from app.models.recruit import DBSession, DBTelemetryEvent, DBDataQualityFlag
from app.services.telemetry_engine import ingest_telemetry_batch
from app.services.task_definitions import get_stimulus_ground_truth, get_task_definitions

class TestStep0TelemetryAndTaskDefs(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session = DBSession(
            session_id="test_session_step0",
            email="test@example.com",
            full_name="Step 0 Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_sjt_cryptographic_integrity(self):
        expected_hash = "c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d"
        root_path = Path(__file__).resolve().parent.parent
        p1 = root_path / "config" / "sjt_items.json"
        p2 = root_path / "backend" / "config" / "sjt_items.json"

        self.assertTrue(p1.exists(), "config/sjt_items.json must exist")
        self.assertTrue(p2.exists(), "backend/config/sjt_items.json must exist")

        h1 = hashlib.sha256(p1.read_bytes()).hexdigest()
        h2 = hashlib.sha256(p2.read_bytes()).hexdigest()

        self.assertEqual(h1, expected_hash)
        self.assertEqual(h2, expected_hash)

    def test_task_definitions_byte_parity(self):
        root_path = Path(__file__).resolve().parent.parent
        p1 = root_path / "config" / "task_definitions.json"
        p2 = root_path / "backend" / "config" / "task_definitions.json"

        self.assertTrue(p1.exists(), "config/task_definitions.json must exist")
        self.assertTrue(p2.exists(), "backend/config/task_definitions.json must exist")

        b1 = p1.read_bytes()
        b2 = p2.read_bytes()

        self.assertEqual(b1, b2, "config/task_definitions.json and backend/config/task_definitions.json must be byte-identical")

    def test_task_definitions_lookup(self):
        defs = get_task_definitions()
        self.assertEqual(defs.get("task_def_version"), "1.0")
        
        # Test lookup for valid stimulus
        stim = get_stimulus_ground_truth("F1", "F1_T1", version="1.0")
        self.assertIsNotNone(stim)
        self.assertEqual(stim.get("stimulus_id"), "F1_T1")
        self.assertIn("condition_type", stim)

        # Invalid stimulus or game
        self.assertIsNone(get_stimulus_ground_truth("F1", "non_existent"))
        self.assertIsNone(get_stimulus_ground_truth("InvalidGame", "trial_1"))

    def test_telemetry_early_pointer_discard(self):
        # 105 events total: 10 mousemove, 95 click
        events = []
        seq = 1
        for i in range(10):
            events.append({
                "seq": 9999 + i,
                "action": "mousemove",
                "screen": "game",
                "mini_game": "F1",
                "task_def_version": "1.0",
                "t_ms": float(i)
            })
        for i in range(95):
            events.append({
                "seq": seq,
                "action": "slider_change",
                "screen": "game",
                "mini_game": "F1",
                "task_def_version": "1.0",
                "t_ms": float(100 + i)
            })
            seq += 1

        # Ingestion must NOT raise ValueError("Batch exceeds maximum size of 100 events")
        # because the 10 mousemove events are discarded before batch size evaluation.
        result = ingest_telemetry_batch(self.db, "test_session_step0", events)
        self.assertEqual(result["ingested_count"], 95)
        self.assertEqual(result["total_session_events"], 95)

        # Discarded pointer events should NOT be present in DB
        db_events = self.db.exec(
            select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == "test_session_step0")
        ).all()
        self.assertEqual(len(db_events), 95)
        actions = {e.action for e in db_events}
        self.assertNotIn("mousemove", actions)

    def test_telemetry_task_def_version_validation(self):
        # Missing task_def_version on candidate game screen
        ev_missing = [{
            "seq": 1,
            "action": "trial_submit",
            "screen": "game",
            "mini_game": "F1",
            "t_ms": 100.0
        }]
        ingest_telemetry_batch(self.db, "test_session_step0", ev_missing)
        flags = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == "test_session_step0",
                DBDataQualityFlag.flag == "missing_task_def_version"
            )
        ).all()
        self.assertTrue(len(flags) >= 1)

        # Invalid task_def_version
        ev_invalid = [{
            "seq": 2,
            "action": "trial_submit",
            "screen": "game",
            "mini_game": "F1",
            "task_def_version": "9.9",
            "t_ms": 200.0
        }]
        ingest_telemetry_batch(self.db, "test_session_step0", ev_invalid)
        flags_inv = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == "test_session_step0",
                DBDataQualityFlag.flag == "invalid_task_def_version"
            )
        ).all()
        self.assertTrue(len(flags_inv) >= 1)

    def test_forbidden_client_field_sanitization(self):
        ev = [{
            "seq": 1,
            "action": "choice_made",
            "screen": "game",
            "mini_game": "E1",
            "task_def_version": "1.0",
            "data": {
                "is_correct": True,
                "condition_id": "rule_a",
                "perseverative_choice": False,
                "raw_selection": 3
            },
            "state": {
                "perseverative_error": True,
                "trial_num": 5
            },
            "t_ms": 150.0
        }]
        ingest_telemetry_batch(self.db, "test_session_step0", ev)

        # Flag must be recorded
        flag = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == "test_session_step0",
                DBDataQualityFlag.flag == "forbidden_client_field_detected"
            )
        ).first()
        self.assertIsNotNone(flag)
        self.assertIn("condition_id", flag.detail)
        self.assertIn("is_correct", flag.detail)
        self.assertIn("perseverative_choice", flag.detail)
        self.assertIn("perseverative_error", flag.detail)

        # DB event payload must be stripped of forbidden fields
        saved_ev = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == "test_session_step0",
                DBTelemetryEvent.seq == 1
            )
        ).first()
        self.assertIsNotNone(saved_ev)
        import json
        saved_data = json.loads(saved_ev.data_json)
        saved_state = json.loads(saved_ev.state_json)

        self.assertNotIn("is_correct", saved_data)
        self.assertNotIn("condition_id", saved_data)
        self.assertNotIn("perseverative_choice", saved_data)
        self.assertEqual(saved_data.get("raw_selection"), 3)

        self.assertNotIn("perseverative_error", saved_state)
        self.assertEqual(saved_state.get("trial_num"), 5)

if __name__ == "__main__":
    unittest.main()
