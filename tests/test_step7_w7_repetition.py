import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, SQLModel, create_engine, select
from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag
from app.services.telemetry_engine import ingest_telemetry_batch
from app.services.task_definitions import (
    get_task_definitions,
    reconstruct_m1_diligence_state,
    reconstruct_m2_continuation_state,
    reconstruct_m3_persistence_state
)
from app.services.feature_extractor import extract_session_features

class TestStep7W7Repetition(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w7@example.com",
            full_name="Repetition Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w7_task_definitions_golden_fixture(self):
        """Verify task definitions for M1 (3 mandatory), M2 (2 mandatory + 3 optional), M3 (3 mandatory + 3 voluntary)."""
        defs = get_task_definitions()
        games = defs.get("games", {})

        # M1: Baseline Diligence
        self.assertIn("M1", games)
        m1 = games["M1"]
        self.assertEqual(m1.get("mandatory_units"), 3)
        self.assertEqual(m1.get("optional_units"), 0)
        self.assertEqual(len(m1.get("trials", [])), 3)

        # M2: Voluntary Continuation
        self.assertIn("M2", games)
        m2 = games["M2"]
        self.assertEqual(m2.get("mandatory_units"), 3)
        self.assertEqual(m2.get("max_optional_units"), 3)
        self.assertEqual(len(m2.get("mandatory_trials", [])), 3)
        self.assertEqual(len(m2.get("optional_trials", [])), 3)

        # M3: Persistence Under Reduced Feedback
        self.assertIn("M3", games)
        m3 = games["M3"]
        self.assertEqual(m3.get("mandatory_units"), 3)
        self.assertEqual(m3.get("max_voluntary_units"), 3)
        self.assertEqual(m3.get("feedback_saliency"), "minimal")
        self.assertTrue(m3.get("explicit_permission_to_stop"))
        self.assertEqual(len(m3.get("trials", [])), 6)

    def test_m1_diligence_three_mandatory_units(self):
        """M1 reconstructs 3 mandatory units; completion satisfies baseline diligence."""
        events = [
            {"seq": 1, "screen": "game", "mini_game": "M1", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"stimulus_id": "M1_U1", "unit_index": 0, "is_mandatory": True}},
            {"seq": 2, "screen": "game", "mini_game": "M1", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 2000.0, "data": {"stimulus_id": "M1_U1", "unit_index": 0, "action_type": "press_wax_seal", "input_modality": "mouse"}},
            {"seq": 3, "screen": "game", "mini_game": "M1", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"stimulus_id": "M1_U1", "unit_index": 0}},

            {"seq": 4, "screen": "game", "mini_game": "M1", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 4000.0, "data": {"stimulus_id": "M1_U2", "unit_index": 1, "is_mandatory": True}},
            {"seq": 5, "screen": "game", "mini_game": "M1", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 5000.0, "data": {"stimulus_id": "M1_U2", "unit_index": 1, "action_type": "press_wax_seal", "input_modality": "mouse"}},
            {"seq": 6, "screen": "game", "mini_game": "M1", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 6000.0, "data": {"stimulus_id": "M1_U2", "unit_index": 1}},

            {"seq": 7, "screen": "game", "mini_game": "M1", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 7000.0, "data": {"stimulus_id": "M1_U3", "unit_index": 2, "is_mandatory": True}},
            {"seq": 8, "screen": "game", "mini_game": "M1", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 8000.0, "data": {"stimulus_id": "M1_U3", "unit_index": 2, "action_type": "press_wax_seal", "input_modality": "mouse"}},
            {"seq": 9, "screen": "game", "mini_game": "M1", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 9000.0, "data": {"stimulus_id": "M1_U3", "unit_index": 2}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 9)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "M1"
            )
        ).all()
        recon = reconstruct_m1_diligence_state(stored)

        self.assertEqual(recon["completed_count"], 3)
        self.assertTrue(recon["mandatory_satisfied"])
        self.assertTrue(recon["all_completed"])
        self.assertEqual(recon["completed_unit_ids"], ["M1_U1", "M1_U2", "M1_U3"])

    def test_m2_continuation_stopped_at_minimum(self):
        """M2 candidate completes 3 mandatory units and explicitly concludes; stopping at minimum is neutral."""
        events = [
            # Mandatory Unit 1
            {"seq": 10, "screen": "game", "mini_game": "M2", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 10000.0, "data": {"stimulus_id": "M2_M1", "unit_index": 0, "is_mandatory": True}},
            {"seq": 11, "screen": "game", "mini_game": "M2", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 11000.0, "data": {"stimulus_id": "M2_M1", "unit_index": 0, "action_type": "assemble_sleeve", "input_modality": "mouse"}},
            {"seq": 12, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 12000.0, "data": {"stimulus_id": "M2_M1", "unit_index": 0, "is_mandatory": True}},

            # Mandatory Unit 2
            {"seq": 13, "screen": "game", "mini_game": "M2", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 13000.0, "data": {"stimulus_id": "M2_M2", "unit_index": 1, "is_mandatory": True}},
            {"seq": 14, "screen": "game", "mini_game": "M2", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 14000.0, "data": {"stimulus_id": "M2_M2", "unit_index": 1, "action_type": "assemble_sleeve", "input_modality": "mouse"}},
            {"seq": 15, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 15000.0, "data": {"stimulus_id": "M2_M2", "unit_index": 1, "is_mandatory": True}},

            # Mandatory Unit 3
            {"seq": 151, "screen": "game", "mini_game": "M2", "action": "unit_presented", "task_def_version": "1.0", "t_ms": 15100.0, "data": {"stimulus_id": "M2_M3", "unit_index": 2, "is_mandatory": True}},
            {"seq": 152, "screen": "game", "mini_game": "M2", "action": "unit_action_performed", "task_def_version": "1.0", "t_ms": 15200.0, "data": {"stimulus_id": "M2_M3", "unit_index": 2, "action_type": "assemble_sleeve", "input_modality": "mouse"}},
            {"seq": 153, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 15300.0, "data": {"stimulus_id": "M2_M3", "unit_index": 2, "is_mandatory": True}},

            # Choice presented -> Conclude Selected (Neutral Stop)
            {"seq": 16, "screen": "game", "mini_game": "M2", "action": "choice_presented", "task_def_version": "1.0", "t_ms": 16000.0, "data": {"trial_index": 3, "mandatory_completed_count": 3}},
            {"seq": 17, "screen": "game", "mini_game": "M2", "action": "continuation_choice_selected", "task_def_version": "1.0", "t_ms": 17000.0, "data": {"choice": "conclude", "optional_index": 0, "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 11)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "M2"
            )
        ).all()
        recon = reconstruct_m2_continuation_state(stored)

        self.assertEqual(recon["mandatory_completed_count"], 3)
        self.assertTrue(recon["mandatory_satisfied"])
        self.assertEqual(recon["optional_completed_count"], 0)
        self.assertTrue(recon["stopped_at_minimum"])
        self.assertEqual(recon["final_choice"], "conclude")

    def test_m2_continuation_voluntary_extra_sleeves(self):
        """M2 candidate chooses to continue and prepares voluntary sleeves."""
        events = [
            # Mandatory Units 1, 2, 3
            {"seq": 20, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 20000.0, "data": {"stimulus_id": "M2_M1", "unit_index": 0, "is_mandatory": True}},
            {"seq": 21, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 21000.0, "data": {"stimulus_id": "M2_M2", "unit_index": 1, "is_mandatory": True}},
            {"seq": 211, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 21500.0, "data": {"stimulus_id": "M2_M3", "unit_index": 2, "is_mandatory": True}},

            # Choice 1: Continue
            {"seq": 22, "screen": "game", "mini_game": "M2", "action": "continuation_choice_selected", "task_def_version": "1.0", "t_ms": 22000.0, "data": {"choice": "continue", "optional_index": 0, "input_modality": "mouse"}},
            # Optional Unit 1
            {"seq": 23, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 23000.0, "data": {"stimulus_id": "M2_O1", "unit_index": 3, "is_mandatory": False}},

            # Choice 2: Continue
            {"seq": 24, "screen": "game", "mini_game": "M2", "action": "continuation_choice_selected", "task_def_version": "1.0", "t_ms": 24000.0, "data": {"choice": "continue", "optional_index": 1, "input_modality": "mouse"}},
            # Optional Unit 2
            {"seq": 25, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 25000.0, "data": {"stimulus_id": "M2_O2", "unit_index": 4, "is_mandatory": False}},

            # Choice 3: Conclude
            {"seq": 26, "screen": "game", "mini_game": "M2", "action": "continuation_choice_selected", "task_def_version": "1.0", "t_ms": 26000.0, "data": {"choice": "conclude", "optional_index": 2, "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 8)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "M2"
            )
        ).all()
        recon = reconstruct_m2_continuation_state(stored)

        self.assertEqual(recon["mandatory_completed_count"], 3)
        self.assertEqual(recon["optional_completed_count"], 2)
        self.assertEqual(recon["total_units_completed"], 5)
        self.assertFalse(recon["stopped_at_minimum"])
        self.assertEqual(recon["final_choice"], "conclude")

    def test_m3_persistence_stopped_at_minimum(self):
        """M3 candidate verifies 3 mandatory rows and concludes via explicit stop option; stopping at minimum is neutral."""
        events = [
            {"seq": 30, "screen": "game", "mini_game": "M3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 30000.0, "data": {"stimulus_id": "M3_U1", "unit_index": 0, "is_mandatory": True}},
            {"seq": 31, "screen": "game", "mini_game": "M3", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 31000.0, "data": {"stimulus_id": "M3_U1", "unit_index": 0}},

            {"seq": 32, "screen": "game", "mini_game": "M3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 32000.0, "data": {"stimulus_id": "M3_U2", "unit_index": 1, "is_mandatory": True}},
            {"seq": 33, "screen": "game", "mini_game": "M3", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 33000.0, "data": {"stimulus_id": "M3_U2", "unit_index": 1}},

            {"seq": 34, "screen": "game", "mini_game": "M3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 34000.0, "data": {"stimulus_id": "M3_U3", "unit_index": 2, "is_mandatory": True}},
            {"seq": 35, "screen": "game", "mini_game": "M3", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 35000.0, "data": {"stimulus_id": "M3_U3", "unit_index": 2}},

            # Conclude selected after mandatory minimum 3
            {"seq": 36, "screen": "game", "mini_game": "M3", "action": "conclude_selected", "task_def_version": "1.0", "t_ms": 36000.0, "data": {"stimulus_id": "M3_U4", "unit_index": 3, "total_units_completed": 3, "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 7)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "M3"
            )
        ).all()
        recon = reconstruct_m3_persistence_state(stored)

        self.assertEqual(recon["mandatory_completed_count"], 3)
        self.assertTrue(recon["mandatory_satisfied"])
        self.assertEqual(recon["voluntary_completed_count"], 0)
        self.assertEqual(recon["total_units_completed"], 3)
        self.assertTrue(recon["stopped_at_minimum"])
        self.assertTrue(recon["concluded"])
        self.assertFalse(recon["right_censored"])

    def test_m3_persistence_voluntary_continuation_right_censored(self):
        """M3 candidate voluntarily continues across all 6 units up to right-censoring ceiling."""
        events = []
        for i in range(6):
            s_id = f"M3_U{i+1}"
            events.append({"seq": 40 + i*2, "screen": "game", "mini_game": "M3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 40000.0 + i*2000, "data": {"stimulus_id": s_id, "unit_index": i, "is_mandatory": i < 3}})
            events.append({"seq": 41 + i*2, "screen": "game", "mini_game": "M3", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 41000.0 + i*2000, "data": {"stimulus_id": s_id, "unit_index": i}})

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 12)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "M3"
            )
        ).all()
        recon = reconstruct_m3_persistence_state(stored)

        self.assertEqual(recon["mandatory_completed_count"], 3)
        self.assertEqual(recon["voluntary_completed_count"], 3)
        self.assertEqual(recon["total_units_completed"], 6)
        self.assertTrue(recon["right_censored"])
        self.assertFalse(recon["stopped_at_minimum"])

    def test_w7_extractors_quarantined(self):
        """M1, M2, M3 extractors remain strictly quarantined under feature_not_implemented."""
        self.db.add_all([
            DBTelemetryEvent(session_id=self.session_id, seq=701, segment_id=1, t_ms=1000.0, screen="game", mini_game="M1", action="unit_completed", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=702, segment_id=1, t_ms=2000.0, screen="game", mini_game="M2", action="unit_completed", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=703, segment_id=1, t_ms=3000.0, screen="game", mini_game="M3", action="unit_completed", task_def_version="1.0", data_json="{}")
        ])
        self.db.commit()

        features = extract_session_features(self.db, self.session_id)
        w7_feats = {f.mini_game: f for f in features if f.mini_game in ["M1", "M2", "M3"]}

        self.assertIn("M1", w7_feats)
        self.assertIn("M2", w7_feats)
        self.assertIn("M3", w7_feats)

        for mg, f in w7_feats.items():
            self.assertFalse(f.valid)
            self.assertIsNone(f.value_raw)
            flags = json.loads(f.flags_json)
            self.assertIn("feature_not_implemented", flags)

    def test_sequence_gap_and_missing_task_def_version(self):
        """Verify sequence gap detection in World 7 telemetry."""
        evs = [
            {"seq": 100, "screen": "game", "mini_game": "M1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 120, "screen": "game", "mini_game": "M1", "action": "test", "task_def_version": "1.0", "t_ms": 500.0}
        ]
        ingest_telemetry_batch(self.db, self.session_id, evs)
        flags = self.db.exec(
            select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == self.session_id)
        ).all()
        flag_names = {f.flag for f in flags}
        self.assertIn("seq_gap", flag_names)

    def test_interruption_event(self):
        """Verify interruption / reload event ingestion."""
        evs = [
            {"seq": 200, "screen": "game", "mini_game": "M2", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "window_blur"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_missing_event_resilience(self):
        """Reconstructors handle partial/missing events gracefully without errors."""
        events = [
            {"seq": 301, "screen": "game", "mini_game": "M1", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"stimulus_id": "M1_U1"}},
            {"seq": 302, "screen": "game", "mini_game": "M2", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 2000.0, "data": {"stimulus_id": "M2_M1", "is_mandatory": True}},
            {"seq": 303, "screen": "game", "mini_game": "M3", "action": "unit_completed", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"stimulus_id": "M3_U1", "unit_index": 0}}
        ]
        ingest_telemetry_batch(self.db, self.session_id, events)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id
            )
        ).all()

        recon1 = reconstruct_m1_diligence_state(stored)
        self.assertEqual(recon1["completed_count"], 1)
        self.assertFalse(recon1["mandatory_satisfied"])

        recon2 = reconstruct_m2_continuation_state(stored)
        self.assertEqual(recon2["mandatory_completed_count"], 1)
        self.assertFalse(recon2["mandatory_satisfied"])

        recon3 = reconstruct_m3_persistence_state(stored)
        self.assertEqual(recon3["mandatory_completed_count"], 1)
        self.assertFalse(recon3["mandatory_satisfied"])

    def test_deterministic_recomputation(self):
        """Verify deterministic feature extraction across multiple invocations."""
        evs = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=400, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="M1", action="unit_completed", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "M1_U1"})
            )
        ]
        self.db.add_all(evs)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
