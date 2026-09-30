import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature
from app.services.feature_extractor import extract_session_features
from sqlmodel import Session, create_engine, SQLModel, select

class TestGate3World2Archive(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def test_a1_classification_extraction(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="GAMES"))

            # Simulate 6 document filing events (5 correct, 1 incorrect)
            events = [
                DBTelemetryEvent(session_id=session_id, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=session_id, seq=2, segment_id=1, t_ms=1000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 2000.0})),
                DBTelemetryEvent(session_id=session_id, seq=3, segment_id=1, t_ms=3000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=4, segment_id=1, t_ms=4500.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1800.0})),
                DBTelemetryEvent(session_id=session_id, seq=5, segment_id=1, t_ms=6300.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1200.0})),
                DBTelemetryEvent(session_id=session_id, seq=6, segment_id=1, t_ms=7500.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 2500.0})),
                DBTelemetryEvent(session_id=session_id, seq=7, segment_id=1, t_ms=10000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 2000.0}))
            ]
            db.add_all(events)
            db.commit()

            features = extract_session_features(db, session_id)
            a1_feats = {f.feature_name: f for f in features if f.mini_game == "A1"}

            self.assertIn("classification_rule_adherence_rate", a1_feats)
            self.assertEqual(a1_feats["classification_rule_adherence_rate"].value_raw, round(5/6, 4))
            self.assertTrue(a1_feats["classification_rule_adherence_rate"].valid)

    def test_a2_insufficient_observations_handling(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="GAMES"))

            # Only 2 decisions logged (min_observations is 3)
            events = [
                DBTelemetryEvent(session_id=session_id, seq=1, segment_id=1, t_ms=500.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=session_id, seq=2, segment_id=1, t_ms=1500.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True}))
            ]
            db.add_all(events)
            db.commit()

            features = extract_session_features(db, session_id)
            a2_feats = {f.feature_name: f for f in features if f.mini_game == "A2"}

            self.assertIn("exception_flagging_precision", a2_feats)
            self.assertFalse(a2_feats["exception_flagging_precision"].valid)
            self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(a2_feats["exception_flagging_precision"].flags_json))

    def test_recomputation_determinism(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="GAMES"))

            events = [
                DBTelemetryEvent(session_id=session_id, seq=1, segment_id=1, t_ms=500.0, screen="game", mini_game="A3", action="ledger_finalized", data_json=json.dumps({"sensitivity": 1.0, "false_alarm_rate": 0.0}))
            ]
            db.add_all(events)
            db.commit()

            # Run 1
            f1 = extract_session_features(db, session_id)
            v1 = [(f.feature_name, f.value_raw) for f in f1]

            # Run 2 (Recompute)
            f2 = extract_session_features(db, session_id)
            v2 = [(f.feature_name, f.value_raw) for f in f2]

            self.assertEqual(v1, v2)

if __name__ == "__main__":
    unittest.main()
