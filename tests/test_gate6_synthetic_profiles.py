import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature
from app.services.feature_extractor import extract_session_features
from app.services.evidence_integrator import integrate_session_evidence
from sqlmodel import Session, create_engine, SQLModel

class TestGate6SyntheticProfiles(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def test_synthetic_conscientiousness_profiles(self):
        """Tests that accurate operator vs over-checker with poor accuracy produce distinct features."""
        with Session(self.engine) as db:
            # 1. Accurate careful operator
            sess_accurate = str(uuid.uuid4())
            db.add(DBSession(session_id=sess_accurate, status="GAMES"))
            events_acc = [
                DBTelemetryEvent(session_id=sess_accurate, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess_accurate, seq=2, segment_id=1, t_ms=2000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess_accurate, seq=3, segment_id=1, t_ms=5000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess_accurate, seq=4, segment_id=1, t_ms=8000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess_accurate, seq=5, segment_id=1, t_ms=11000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0}))
            ]
            db.add_all(events_acc)
            db.commit()

            f_acc = {f.feature_name: f.value_raw for f in extract_session_features(db, sess_accurate) if f.mini_game == "A1"}
            self.assertEqual(f_acc["classification_rule_adherence_rate"], 1.0)

            # 2. Over-checker with poor accuracy
            sess_poor = str(uuid.uuid4())
            db.add(DBSession(session_id=sess_poor, status="GAMES"))
            events_poor = [
                DBTelemetryEvent(session_id=sess_poor, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess_poor, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess_poor, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess_poor, seq=4, segment_id=1, t_ms=1000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 1000.0})),
                DBTelemetryEvent(session_id=sess_poor, seq=5, segment_id=1, t_ms=2000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 1000.0})),
                DBTelemetryEvent(session_id=sess_poor, seq=6, segment_id=1, t_ms=3000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1000.0})),
                DBTelemetryEvent(session_id=sess_poor, seq=7, segment_id=1, t_ms=4000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 1000.0}))
            ]
            db.add_all(events_poor)
            db.commit()

            f_poor = {f.feature_name: f.value_raw for f in extract_session_features(db, sess_poor) if f.mini_game == "A1"}
            self.assertEqual(f_poor["classification_rule_adherence_rate"], 0.25)
            self.assertGreater(f_poor["verification_duration_ratio"], f_acc["verification_duration_ratio"])

    def test_synthetic_motivation_profiles(self):
        """Tests that minimum stopper vs persistent voluntary worker produce distinct counts."""
        with Session(self.engine) as db:
            # Stopper
            sess_min = str(uuid.uuid4())
            db.add(DBSession(session_id=sess_min, status="GAMES"))
            db.add(DBTelemetryEvent(session_id=sess_min, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="M2", action="optional_session_concluded", data_json=json.dumps({"optional_completed": 0, "voluntary_time_ms": 0.0})))
            db.commit()

            f_min = {f.feature_name: f.value_raw for f in extract_session_features(db, sess_min) if f.mini_game == "M2"}
            self.assertEqual(f_min["optional_units_completed"], 3.0)

            # Persistent continuation
            sess_cont = str(uuid.uuid4())
            db.add(DBSession(session_id=sess_cont, status="GAMES"))
            db.add(DBTelemetryEvent(session_id=sess_cont, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="M2", action="optional_unit_saved", data_json=json.dumps({"dwell_ms": 4000.0})))
            db.commit()

            f_cont = {f.feature_name: f.value_raw for f in extract_session_features(db, sess_cont) if f.mini_game == "M2"}
            self.assertGreater(f_cont["optional_units_completed"], 0.0)

if __name__ == "__main__":
    unittest.main()
