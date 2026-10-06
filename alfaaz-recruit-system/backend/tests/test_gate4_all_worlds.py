import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBFeature
from recruit_system.services.feature_extractor import extract_session_features
from sqlmodel import Session, create_engine, SQLModel, select

class TestGate4AllWorlds(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)

    def test_all_worlds_feature_extraction(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="GAMES"))

            # Simulate events across all 7 worlds
            events = [
                # W1: F1, F2, F3
                DBTelemetryEvent(session_id=session_id, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="F1", action="minigame_end", data_json=json.dumps({"latency_ms": 1100.0})),
                DBTelemetryEvent(session_id=session_id, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="F2", action="ambiguity_choice_made", data_json=json.dumps({"choice": "clarify"})),
                DBTelemetryEvent(session_id=session_id, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="F3", action="acoustic_recalibration_applied"),
                # W2: A1, A2, A3
                DBTelemetryEvent(session_id=session_id, seq=4, segment_id=1, t_ms=400.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=5, segment_id=1, t_ms=500.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=6, segment_id=1, t_ms=600.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=7, segment_id=1, t_ms=700.0, screen="game", mini_game="A1", action="document_filed", data_json=json.dumps({"is_correct": True, "dwell_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=8, segment_id=1, t_ms=800.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=session_id, seq=9, segment_id=1, t_ms=900.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=session_id, seq=10, segment_id=1, t_ms=1000.0, screen="game", mini_game="A2", action="decision_logged", data_json=json.dumps({"is_correct": True})),
                DBTelemetryEvent(session_id=session_id, seq=11, segment_id=1, t_ms=1100.0, screen="game", mini_game="A3", action="ledger_finalized", data_json=json.dumps({"sensitivity": 1.0, "false_alarm_rate": 0.0})),
                # W3: C1, C2, C3
                DBTelemetryEvent(session_id=session_id, seq=12, segment_id=1, t_ms=1200.0, screen="game", mini_game="C1", action="resource_transfer_confirmed", data_json=json.dumps({"shared_amount": 4})),
                DBTelemetryEvent(session_id=session_id, seq=13, segment_id=1, t_ms=1300.0, screen="game", mini_game="C2", action="coordinated_stroke_applied"),
                DBTelemetryEvent(session_id=session_id, seq=14, segment_id=1, t_ms=1400.0, screen="game", mini_game="C3", action="repair_strategy_selected", data_json=json.dumps({"strategy": "harmonize"})),
                # W4: E1, E2, E3
                DBTelemetryEvent(session_id=session_id, seq=15, segment_id=1, t_ms=1500.0, screen="game", mini_game="E1", action="quadrant_selected", data_json=json.dumps({"perseverative": False})),
                DBTelemetryEvent(session_id=session_id, seq=16, segment_id=1, t_ms=1600.0, screen="game", mini_game="E2", action="advance_node"),
                DBTelemetryEvent(session_id=session_id, seq=17, segment_id=1, t_ms=1700.0, screen="game", mini_game="E3", action="density_phase_completed"),
                # W5: Q1, Q2, Q3
                DBTelemetryEvent(session_id=session_id, seq=18, segment_id=1, t_ms=1800.0, screen="game", mini_game="Q1", action="gallery_exited", data_json=json.dumps({"total_explored": 2})),
                DBTelemetryEvent(session_id=session_id, seq=19, segment_id=1, t_ms=1900.0, screen="game", mini_game="Q2", action="anomaly_layer_unlocked"),
                DBTelemetryEvent(session_id=session_id, seq=20, segment_id=1, t_ms=2000.0, screen="game", mini_game="Q3", action="synthesis_completed"),
                # W6: CR1, CR2, CR3
                DBTelemetryEvent(session_id=session_id, seq=21, segment_id=1, t_ms=2100.0, screen="game", mini_game="CR1", action="structure_tested"),
                DBTelemetryEvent(session_id=session_id, seq=22, segment_id=1, t_ms=2200.0, screen="game", mini_game="CR2", action="creative_pivot_succeeded"),
                DBTelemetryEvent(session_id=session_id, seq=23, segment_id=1, t_ms=2300.0, screen="game", mini_game="CR3", action="unconventional_tool_selected"),
                # W7: M1, M2, M3
                DBTelemetryEvent(session_id=session_id, seq=24, segment_id=1, t_ms=2400.0, screen="game", mini_game="M1", action="mandatory_unit_completed", data_json=json.dumps({"duration_ms": 1500.0})),
                DBTelemetryEvent(session_id=session_id, seq=25, segment_id=1, t_ms=2500.0, screen="game", mini_game="M2", action="optional_unit_saved", data_json=json.dumps({"dwell_ms": 2000.0})),
                DBTelemetryEvent(session_id=session_id, seq=26, segment_id=1, t_ms=2600.0, screen="game", mini_game="M3", action="reduced_reward_synced")
            ]
            db.add_all(events)
            db.commit()

            features = extract_session_features(db, session_id)
            mg_extracted = set(f.mini_game for f in features)

            expected_mgs = {"F1", "F2", "F3", "A1", "A2", "A3", "C1", "C2", "C3", "E1", "E2", "E3", "Q1", "Q2", "Q3", "CR1", "CR2", "CR3", "M1", "M2", "M3"}
            self.assertEqual(mg_extracted, expected_mgs)

if __name__ == "__main__":
    unittest.main()
