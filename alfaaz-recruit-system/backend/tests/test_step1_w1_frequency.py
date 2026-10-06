import unittest
import os
import sys
import json
from pathlib import Path

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, SQLModel, create_engine, select
from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag
from recruit_system.services.telemetry_engine import ingest_telemetry_batch
from recruit_system.services.task_definitions import get_task_definitions, get_stimulus_ground_truth
from recruit_system.services.feature_extractor import extract_session_features

class TestStep1W1Frequency(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = "test_w1_session_001"
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w1@example.com",
            full_name="Soundscape Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w1_task_definitions_structure(self):
        """Verify F1 (6 trials), F2 (4 trials), F3 (3 transitions) in V1 task definitions, and V2 (5, 3, 3)."""
        defs = get_task_definitions("1.0")
        games = defs.get("games", {})

        # F1: 6 trials, attunement_to_cues
        self.assertIn("F1", games)
        f1 = games["F1"]
        self.assertEqual(f1.get("total_trials"), 6)
        f1_trials = f1.get("trials", [])
        self.assertEqual(len(f1_trials), 6)
        f1_types = {t.get("condition_type") for t in f1_trials}
        self.assertIn("accommodate", f1_types)
        self.assertIn("maintain_objective", f1_types)
        self.assertIn("clarify", f1_types)

        # F2: 4 trials, cognitive_perspective_taking
        self.assertIn("F2", games)
        f2 = games["F2"]
        self.assertEqual(f2.get("total_trials"), 4)
        f2_trials = f2.get("trials", [])
        self.assertEqual(len(f2_trials), 4)
        f2_types = {t.get("condition_type") for t in f2_trials}
        self.assertIn("act", f2_types)
        self.assertIn("clarify", f2_types)
        self.assertIn("maintain", f2_types)

        # F3: 3 transitions, dynamic_context_updating
        self.assertIn("F3", games)
        f3 = games["F3"]
        self.assertEqual(f3.get("total_transitions", f3.get("total_trials")), 3)
        f3_trials = f3.get("transitions", f3.get("trials", []))
        self.assertEqual(len(f3_trials), 3)

        # V2: F1 (5 trials), F2 (3 trials), F3 (3 transitions)
        defs_v2 = get_task_definitions("2.0")
        games_v2 = defs_v2.get("games", {})
        self.assertEqual(games_v2["F1"].get("total_trials"), 5)
        self.assertEqual(len(games_v2["F1"].get("trials", [])), 5)
        self.assertEqual(games_v2["F2"].get("total_trials"), 3)
        self.assertEqual(len(games_v2["F2"].get("trials", [])), 3)

    def test_f1_raw_telemetry_ingestion(self):
        """Verify F1 6 trials emit raw telemetry without derived scores and ingest cleanly."""
        events = []
        seq = 1
        for i in range(6):
            stim_id = f"F1_T{i+1}"
            events.append({
                "seq": seq,
                "screen": "game",
                "game_world": "W1",
                "mini_game": "F1",
                "trial": i,
                "action": "slider_input",
                "task_def_version": "1.0",
                "input_type": "mouse",
                "data": {
                    "trial_index": i,
                    "stimulus_id": stim_id,
                    "slider_position_raw": 45 + (i * 2),
                    "input_modality": "mouse",
                    "task_def_version": "1.0"
                },
                "t_ms": float(1000 + i * 5000)
            })
            seq += 1
            events.append({
                "seq": seq,
                "screen": "game",
                "game_world": "W1",
                "mini_game": "F1",
                "trial": i,
                "action": "trial_submit",
                "task_def_version": "1.0",
                "input_type": "mouse",
                "data": {
                    "trial_index": i,
                    "stimulus_id": stim_id,
                    "action_id": "accommodate" if i % 2 == 0 else "maintain_objective",
                    "slider_position_raw": 50,
                    "input_modality": "mouse",
                    "task_def_version": "1.0"
                },
                "t_ms": float(1000 + i * 5000 + 4000)
            })
            seq += 1

        events.append({
            "seq": seq,
            "screen": "game",
            "game_world": "W1",
            "mini_game": "F1",
            "action": "minigame_end",
            "task_def_version": "1.0",
            "data": {
                "mini_game": "F1",
                "observations_count": 6
            },
            "t_ms": 35000.0
        })

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 13)

        # No forbidden field or invalid version flags
        flags = self.db.exec(
            select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == self.session_id)
        ).all()
        flag_names = {f.flag for f in flags}
        self.assertNotIn("forbidden_client_field_detected", flag_names)
        self.assertNotIn("missing_task_def_version", flag_names)
        self.assertNotIn("invalid_task_def_version", flag_names)

    def test_f2_raw_telemetry_ingestion(self):
        """Verify F2 4 trials emit raw telemetry and ingest cleanly."""
        events = []
        seq = 100
        for i in range(4):
            stim_id = f"F2_T{i+1}"
            events.append({
                "seq": seq,
                "screen": "game",
                "game_world": "W1",
                "mini_game": "F2",
                "trial": i,
                "action": "trial_submit",
                "task_def_version": "1.0",
                "input_type": "mouse",
                "data": {
                    "trial_index": i,
                    "stimulus_id": stim_id,
                    "action_id": ["act", "clarify", "maintain", "act"][i],
                    "input_modality": "mouse",
                    "task_def_version": "1.0"
                },
                "t_ms": float(36000 + i * 4000)
            })
            seq += 1

        events.append({
            "seq": seq,
            "screen": "game",
            "game_world": "W1",
            "mini_game": "F2",
            "action": "minigame_end",
            "task_def_version": "1.0",
            "data": {
                "mini_game": "F2",
                "observations_count": 4
            },
            "t_ms": 55000.0
        })

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 5)

    def test_f3_context_transitions_ingestion(self):
        """Verify F3 3 context transitions log transition events and trial submits."""
        events = []
        seq = 200
        venues = ["Stone Hall", "Carpeted Courtyard", "Open Colonnade"]
        for i in range(3):
            stim_id = f"F3_T{i+1}"
            events.append({
                "seq": seq,
                "screen": "game",
                "game_world": "W1",
                "mini_game": "F3",
                "trial": i,
                "action": "transition_presented",
                "task_def_version": "1.0",
                "input_type": "system",
                "data": {
                    "trial_index": i,
                    "stimulus_id": stim_id,
                    "venue": venues[i],
                    "task_def_version": "1.0"
                },
                "t_ms": float(60000 + i * 6000)
            })
            seq += 1
            events.append({
                "seq": seq,
                "screen": "game",
                "game_world": "W1",
                "mini_game": "F3",
                "trial": i,
                "action": "trial_submit",
                "task_def_version": "1.0",
                "input_type": "mouse",
                "data": {
                    "trial_index": i,
                    "stimulus_id": stim_id,
                    "action_id": "update_acoustic_balance",
                    "slider_position_raw": 30 + i * 15,
                    "input_modality": "mouse",
                    "task_def_version": "1.0"
                },
                "t_ms": float(60000 + i * 6000 + 4000)
            })
            seq += 1

        events.append({
            "seq": seq,
            "screen": "game",
            "game_world": "W1",
            "mini_game": "F3",
            "action": "minigame_end",
            "task_def_version": "1.0",
            "data": {
                "mini_game": "F3",
                "observations_count": 3
            },
            "t_ms": 80000.0
        })

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 7)

    def test_w1_extractors_remain_quarantined(self):
        """Verify F1, F2, F3 extractors remain quarantined under feature_not_implemented."""
        features = extract_session_features(self.db, self.session_id)
        w1_features = [f for f in features if f.mini_game in ["F1", "F2", "F3"]]
        
        # All W1 features must be invalid and flagged with feature_not_implemented
        for feat in w1_features:
            self.assertFalse(feat.valid, f"Feature {feat.feature_name} must have valid=False")
            self.assertIsNone(feat.value_raw, f"Feature {feat.feature_name} must have value_raw=None")
            flags = json.loads(feat.flags_json) if feat.flags_json else []
            self.assertIn("feature_not_implemented", flags)

if __name__ == "__main__":
    unittest.main()
