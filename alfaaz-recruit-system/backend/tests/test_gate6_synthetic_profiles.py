import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBFeature
from recruit_system.services.feature_extractor import extract_session_features
from recruit_system.services.evidence_integrator import integrate_session_evidence
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
        """Tests that quarantined M2 extractor returns None value_raw and feature_not_implemented flag."""
        with Session(self.engine) as db:
            # Stopper
            sess_min = str(uuid.uuid4())
            db.add(DBSession(session_id=sess_min, status="GAMES"))
            db.add(DBTelemetryEvent(session_id=sess_min, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="M2", action="optional_session_concluded", data_json=json.dumps({"optional_completed": 0, "voluntary_time_ms": 0.0})))
            db.commit()

            features = extract_session_features(db, sess_min)
            m2_features = [f for f in features if f.mini_game == "M2"]
            self.assertEqual(len(m2_features), 1)
            self.assertIsNone(m2_features[0].value_raw)
            self.assertFalse(m2_features[0].valid)
            self.assertIn("feature_not_implemented", m2_features[0].flags_json)

    def test_a1_sensitivity_and_noise_invariance(self):
        """Tests that A1 feature values differ in expected direction for contrasting streams, and are invariant to noise."""
        with Session(self.engine) as db:
            # Stream 1: High rule adherence (4/4 correct)
            sess1 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess1, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess1, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess1, seq=2, segment_id=1, t_ms=2000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess1, seq=3, segment_id=1, t_ms=5000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess1, seq=4, segment_id=1, t_ms=8000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess1, seq=5, segment_id=1, t_ms=11000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0}))
            ])

            # Stream 2: Low rule adherence (1/4 correct)
            sess2 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess2, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess2, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess2, seq=2, segment_id=1, t_ms=2000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess2, seq=3, segment_id=1, t_ms=5000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess2, seq=4, segment_id=1, t_ms=8000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": False, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess2, seq=5, segment_id=1, t_ms=11000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0}))
            ])

            # Stream 3: Stream 1 + irrelevant noise events (mouse_moved, window_blurred, sound_muted)
            sess3 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess3, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess3, seq=1, segment_id=1, t_ms=50.0, screen="game", mini_game="A1", action="mouse_moved", data_json=json.dumps({"x": 100, "y": 200})),
                DBTelemetryEvent(session_id=sess3, seq=2, segment_id=1, t_ms=100.0, screen="game", mini_game="A1", action="rule_guide_viewed"),
                DBTelemetryEvent(session_id=sess3, seq=3, segment_id=1, t_ms=500.0, screen="game", mini_game="A1", action="sound_muted"),
                DBTelemetryEvent(session_id=sess3, seq=4, segment_id=1, t_ms=2000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess3, seq=5, segment_id=1, t_ms=3000.0, screen="game", mini_game="A1", action="mouse_moved", data_json=json.dumps({"x": 150, "y": 250})),
                DBTelemetryEvent(session_id=sess3, seq=6, segment_id=1, t_ms=5000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess3, seq=7, segment_id=1, t_ms=6000.0, screen="game", mini_game="A1", action="window_blurred"),
                DBTelemetryEvent(session_id=sess3, seq=8, segment_id=1, t_ms=8000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0})),
                DBTelemetryEvent(session_id=sess3, seq=9, segment_id=1, t_ms=11000.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 3000.0}))
            ])
            db.commit()

            f1 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess1) if f.mini_game == "A1"}
            f2 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess2) if f.mini_game == "A1"}
            f3 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess3) if f.mini_game == "A1"}

            # Sensitivity: different relevant inputs yield different outputs in expected direction
            self.assertNotEqual(f1["classification_rule_adherence_rate"], f2["classification_rule_adherence_rate"])
            self.assertGreater(f1["classification_rule_adherence_rate"], f2["classification_rule_adherence_rate"])

            # Noise invariance: irrelevant events do not alter feature values
            self.assertEqual(f1["classification_rule_adherence_rate"], f3["classification_rule_adherence_rate"])
            self.assertEqual(f1["verification_duration_ratio"], f3["verification_duration_ratio"])

    def test_a2_sensitivity_and_noise_invariance(self):
        """Tests that A2 precision differs in expected direction for contrasting streams, and is invariant to noise."""
        with Session(self.engine) as db:
            # Stream 1: High precision (3/3 correct)
            sess1 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess1, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess1, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=sess1, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=sess1, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True}))
            ])

            # Stream 2: Low precision (1/3 correct)
            sess2 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess2, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess2, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=sess2, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": False})),
                DBTelemetryEvent(session_id=sess2, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": False}))
            ])

            # Stream 3: Stream 1 + irrelevant noise events
            sess3 = str(uuid.uuid4())
            db.add(DBSession(session_id=sess3, status="GAMES"))
            db.add_all([
                DBTelemetryEvent(session_id=sess3, seq=1, segment_id=1, t_ms=50.0, screen="game", mini_game="A2", action="mouse_moved", data_json=json.dumps({"x": 10, "y": 20})),
                DBTelemetryEvent(session_id=sess3, seq=2, segment_id=1, t_ms=100.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=sess3, seq=3, segment_id=1, t_ms=150.0, screen="game", mini_game="A2", action="tab_focused"),
                DBTelemetryEvent(session_id=sess3, seq=4, segment_id=1, t_ms=200.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=sess3, seq=5, segment_id=1, t_ms=250.0, screen="game", mini_game="A2", action="scroll_event"),
                DBTelemetryEvent(session_id=sess3, seq=6, segment_id=1, t_ms=300.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True}))
            ])
            db.commit()

            f1 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess1) if f.mini_game == "A2"}
            f2 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess2) if f.mini_game == "A2"}
            f3 = {f.feature_name: f.value_raw for f in extract_session_features(db, sess3) if f.mini_game == "A2"}

            # Sensitivity: different relevant inputs yield different outputs in expected direction
            self.assertNotEqual(f1["exception_flagging_precision"], f2["exception_flagging_precision"])
            self.assertGreater(f1["exception_flagging_precision"], f2["exception_flagging_precision"])

            # Noise invariance: irrelevant events do not alter feature values
            self.assertEqual(f1["exception_flagging_precision"], f3["exception_flagging_precision"])

if __name__ == "__main__":
    unittest.main()
