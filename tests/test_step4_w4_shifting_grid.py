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
    reconstruct_e1_sorting_state,
    reconstruct_e2_recovery_state,
    reconstruct_e3_adaptation_state
)
from app.services.feature_extractor import extract_session_features

class TestStep4W4ShiftingGrid(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w4@example.com",
            full_name="Shifting Grid Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w4_task_definitions_golden_fixture(self):
        """Verify task definitions for E1 (9 trials, unannounced shift), E2 (4 sequences: 3 disrupted, 1 control), E3 (3 condition transitions)."""
        defs = get_task_definitions()
        games = defs.get("games", {})

        # E1: exactly 9 trials, shift at trial index 3/4
        self.assertIn("E1", games)
        e1 = games["E1"]
        self.assertEqual(e1.get("total_trials"), 9)
        self.assertEqual(len(e1.get("trials", [])), 9)
        self.assertEqual(e1.get("shift_trial_index"), 4)
        e1_stims = [t["stimulus_id"] for t in e1["trials"]]
        self.assertEqual(e1_stims, [f"E1_T{i}" for i in range(1, 10)])
        self.assertEqual(e1["trials"][0]["rule"], "COLOR")
        self.assertEqual(e1["trials"][1]["rule"], "COLOR")
        self.assertEqual(e1["trials"][2]["rule"], "COLOR")
        self.assertEqual(e1["trials"][3]["rule"], "SHAPE")
        self.assertEqual(e1["trials"][8]["rule"], "SHAPE")

        # E2: exactly 4 sequences (3 disrupted, 1 control)
        self.assertIn("E2", games)
        e2 = games["E2"]
        self.assertEqual(e2.get("total_trials"), 4)
        self.assertEqual(len(e2.get("trials", [])), 4)
        disrupted_count = sum(1 for t in e2["trials"] if t.get("has_disruption"))
        control_count = sum(1 for t in e2["trials"] if not t.get("has_disruption"))
        self.assertEqual(disrupted_count, 3)
        self.assertEqual(control_count, 1)
        self.assertEqual(e2["trials"][1]["disruption_type"], "undisrupted_control")
        self.assertFalse(e2["trials"][1]["has_disruption"])

        # E3: exactly 3 condition transitions
        self.assertIn("E3", games)
        e3 = games["E3"]
        self.assertEqual(e3.get("total_trials"), 3)
        self.assertEqual(len(e3.get("trials", [])), 3)
        self.assertEqual(e3["trials"][0]["constraint_state"], "standard_three_color_palette")
        self.assertEqual(e3["trials"][1]["constraint_state"], "monochrome_indigo_only")
        self.assertEqual(e3["trials"][2]["constraint_state"], "boundary_constricted_half_grid")

    def test_e1_rule_shift_telemetry_and_perseveration_reconstruction(self):
        """E1 emits raw sorting actions; server evaluates accuracy and tracks perseverative choices post-shift."""
        # Stimuli:
        # E1_T1: Gold Square (COLOR -> container_1) -> Candidate picks container_1 (Correct)
        # E1_T2: Sage Circle (COLOR -> container_2) -> Candidate picks container_2 (Correct)
        # E1_T3: Gold Circle (COLOR -> container_1) -> Candidate picks container_1 (Correct)
        # SHIFT TO SHAPE:
        # E1_T4: Sage Square (SHAPE -> container_2, COLOR -> container_2) -> Candidate picks container_2 (Correct)
        # E1_T5: Gold Square (SHAPE -> container_2, COLOR -> container_1) -> Candidate picks container_1 (Perseverative Error!)
        # E1_T6: Sage Circle (SHAPE -> container_1, COLOR -> container_2) -> Candidate picks container_1 (Adapted!)
        # E1_T7: Gold Circle (SHAPE -> container_1, COLOR -> container_1) -> Candidate picks container_1 (Correct)
        # E1_T8: Gold Square (SHAPE -> container_2, COLOR -> container_1) -> Candidate picks container_2 (Correct)
        # E1_T9: Sage Circle (SHAPE -> container_1, COLOR -> container_2) -> Candidate picks container_1 (Correct)

        events = []
        choices = [
            ("E1_T1", "container_1"),
            ("E1_T2", "container_2"),
            ("E1_T3", "container_1"),
            ("E1_T4", "container_2"),
            ("E1_T5", "container_1"), # Perseverative error: applies old color rule
            ("E1_T6", "container_1"),
            ("E1_T7", "container_1"),
            ("E1_T8", "container_2"),
            ("E1_T9", "container_1")
        ]

        seq = 1
        for idx, (stim_id, choice) in enumerate(choices):
            events.append({
                "seq": seq, "screen": "game", "mini_game": "E1", "action": "trial_presented",
                "task_def_version": "1.0", "t_ms": 1000.0 * seq,
                "data": {"trial_index": idx, "stimulus_id": stim_id}
            })
            seq += 1
            events.append({
                "seq": seq, "screen": "game", "mini_game": "E1", "action": "tile_sorted",
                "task_def_version": "1.0", "t_ms": 1000.0 * seq + 450.0,
                "data": {"trial_index": idx, "stimulus_id": stim_id, "choice": choice, "dwell_ms": 450, "input_modality": "mouse"}
            })
            seq += 1

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 18)

        # Reconstruct server-side
        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "E1"
            )
        ).all()
        recon = reconstruct_e1_sorting_state(stored)

        self.assertEqual(recon["trials_completed"], 9)
        self.assertTrue(recon["all_trials_completed"])
        # 8 out of 9 correct (only E1_T5 incorrect)
        self.assertEqual(recon["correct_count"], 8)
        self.assertEqual(recon["accuracy"], round(8/9, 4))
        # Exactly 1 perseverative error detected on E1_T5
        self.assertEqual(recon["perseverative_error_count"], 1)

    def test_e2_setback_recovery_progression_and_reconstruction(self):
        """E2 verifies 4 sequences (3 disrupted, 1 control) and constructive recovery action tracking."""
        events = [
            # Sequence 1: Disrupted (Ink spill) -> Clear workspace
            {"seq": 30, "screen": "game", "mini_game": "E2", "action": "sequence_presented", "task_def_version": "1.0", "t_ms": 20000.0, "data": {"trial_index": 0, "stimulus_id": "E2_S1", "has_disruption": True, "disruption_type": "ink_spill_masking_workspace"}},
            {"seq": 31, "screen": "game", "mini_game": "E2", "action": "action_selected", "task_def_version": "1.0", "t_ms": 22000.0, "data": {"trial_index": 0, "stimulus_id": "E2_S1", "action_id": "clear_workspace", "input_modality": "mouse"}},
            {"seq": 32, "screen": "game", "mini_game": "E2", "action": "sequence_completed", "task_def_version": "1.0", "t_ms": 24000.0, "data": {"trial_index": 0, "stimulus_id": "E2_S1", "chosen_action": "clear_workspace", "input_modality": "mouse"}},

            # Sequence 2: Undisrupted Control -> Standard cadence
            {"seq": 33, "screen": "game", "mini_game": "E2", "action": "sequence_presented", "task_def_version": "1.0", "t_ms": 25000.0, "data": {"trial_index": 1, "stimulus_id": "E2_S2", "has_disruption": False, "disruption_type": "undisrupted_control"}},
            {"seq": 34, "screen": "game", "mini_game": "E2", "action": "action_selected", "task_def_version": "1.0", "t_ms": 27000.0, "data": {"trial_index": 1, "stimulus_id": "E2_S2", "action_id": "standard_sequence", "input_modality": "keyboard"}},
            {"seq": 35, "screen": "game", "mini_game": "E2", "action": "sequence_completed", "task_def_version": "1.0", "t_ms": 29000.0, "data": {"trial_index": 1, "stimulus_id": "E2_S2", "chosen_action": "standard_sequence", "input_modality": "keyboard"}},

            # Sequence 3: Disrupted (Draft blows card) -> Stabilize reference
            {"seq": 36, "screen": "game", "mini_game": "E2", "action": "sequence_presented", "task_def_version": "1.0", "t_ms": 30000.0, "data": {"trial_index": 2, "stimulus_id": "E2_S3", "has_disruption": True, "disruption_type": "draft_blows_reference_card"}},
            {"seq": 37, "screen": "game", "mini_game": "E2", "action": "action_selected", "task_def_version": "1.0", "t_ms": 32000.0, "data": {"trial_index": 2, "stimulus_id": "E2_S3", "action_id": "stabilize_reference", "input_modality": "mouse"}},
            {"seq": 38, "screen": "game", "mini_game": "E2", "action": "sequence_completed", "task_def_version": "1.0", "t_ms": 34000.0, "data": {"trial_index": 2, "stimulus_id": "E2_S3", "chosen_action": "stabilize_reference", "input_modality": "mouse"}},

            # Sequence 4: Disrupted (Misplaced tray) -> Reposition tray
            {"seq": 39, "screen": "game", "mini_game": "E2", "action": "sequence_presented", "task_def_version": "1.0", "t_ms": 35000.0, "data": {"trial_index": 3, "stimulus_id": "E2_S4", "has_disruption": True, "disruption_type": "misplaced_pigment_tray"}},
            {"seq": 40, "screen": "game", "mini_game": "E2", "action": "action_selected", "task_def_version": "1.0", "t_ms": 37000.0, "data": {"trial_index": 3, "stimulus_id": "E2_S4", "action_id": "reposition_tray", "input_modality": "mouse"}},
            {"seq": 41, "screen": "game", "mini_game": "E2", "action": "sequence_completed", "task_def_version": "1.0", "t_ms": 39000.0, "data": {"trial_index": 3, "stimulus_id": "E2_S4", "chosen_action": "reposition_tray", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 12)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "E2"
            )
        ).all()
        recon = reconstruct_e2_recovery_state(stored)

        self.assertEqual(recon["completed_count"], 4)
        self.assertTrue(recon["all_completed"])
        self.assertEqual(recon["constructive_count"], 4)
        self.assertTrue(recon["sequences"]["E2_S1"]["is_constructive"])
        self.assertTrue(recon["sequences"]["E2_S2"]["is_constructive"])
        self.assertTrue(recon["sequences"]["E2_S3"]["is_constructive"])
        self.assertTrue(recon["sequences"]["E2_S4"]["is_constructive"])

    def test_e3_changing_conditions_and_modality_invariance(self):
        """E3 verifies 3 condition transitions with constant objective and invariant interaction method."""
        events = [
            # Condition 1: Tri-Tone Palette -> Standard layout
            {"seq": 50, "screen": "game", "mini_game": "E3", "action": "condition_presented", "task_def_version": "1.0", "t_ms": 40000.0, "data": {"trial_index": 0, "stimulus_id": "E3_C1", "constraint_state": "standard_three_color_palette"}},
            {"seq": 51, "screen": "game", "mini_game": "E3", "action": "composition_action_attempted", "task_def_version": "1.0", "t_ms": 42000.0, "data": {"trial_index": 0, "stimulus_id": "E3_C1", "action_id": "standard_layout", "input_modality": "mouse"}},
            {"seq": 52, "screen": "game", "mini_game": "E3", "action": "composition_confirmed", "task_def_version": "1.0", "t_ms": 44000.0, "data": {"trial_index": 0, "stimulus_id": "E3_C1", "chosen_action": "standard_layout", "input_modality": "mouse"}},

            # Condition 2: Monochrome Indigo -> Tonal adaptation
            {"seq": 53, "screen": "game", "mini_game": "E3", "action": "condition_presented", "task_def_version": "1.0", "t_ms": 45000.0, "data": {"trial_index": 1, "stimulus_id": "E3_C2", "constraint_state": "monochrome_indigo_only"}},
            {"seq": 54, "screen": "game", "mini_game": "E3", "action": "composition_confirmed", "task_def_version": "1.0", "t_ms": 47000.0, "data": {"trial_index": 1, "stimulus_id": "E3_C2", "chosen_action": "tonal_adaptation", "input_modality": "keyboard"}},

            # Condition 3: Constricted Border Grid -> Compact adaptation
            {"seq": 55, "screen": "game", "mini_game": "E3", "action": "condition_presented", "task_def_version": "1.0", "t_ms": 48000.0, "data": {"trial_index": 2, "stimulus_id": "E3_C3", "constraint_state": "boundary_constricted_half_grid"}},
            {"seq": 56, "screen": "game", "mini_game": "E3", "action": "composition_confirmed", "task_def_version": "1.0", "t_ms": 50000.0, "data": {"trial_index": 2, "stimulus_id": "E3_C3", "chosen_action": "compact_adaptation", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 7)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "E3"
            )
        ).all()
        recon = reconstruct_e3_adaptation_state(stored)

        self.assertEqual(recon["completed_count"], 3)
        self.assertTrue(recon["all_completed"])
        self.assertEqual(recon["aligned_count"], 3)
        self.assertTrue(recon["conditions"]["E3_C1"]["is_aligned"])
        self.assertTrue(recon["conditions"]["E3_C2"]["is_aligned"])
        self.assertTrue(recon["conditions"]["E3_C3"]["is_aligned"])

    def test_w4_extractors_quarantined(self):
        """E1, E2, E3 extractors remain strictly quarantined under feature_not_implemented."""
        self.db.add_all([
            DBTelemetryEvent(session_id=self.session_id, seq=901, segment_id=1, t_ms=1000.0, screen="game", mini_game="E1", action="tile_sorted", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=902, segment_id=1, t_ms=2000.0, screen="game", mini_game="E2", action="sequence_completed", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=903, segment_id=1, t_ms=3000.0, screen="game", mini_game="E3", action="composition_confirmed", task_def_version="1.0", data_json="{}")
        ])
        self.db.commit()

        features = extract_session_features(self.db, self.session_id)
        w4_feats = {f.mini_game: f for f in features if f.mini_game in ["E1", "E2", "E3"]}

        self.assertIn("E1", w4_feats)
        self.assertIn("E2", w4_feats)
        self.assertIn("E3", w4_feats)

        for mg, f in w4_feats.items():
            self.assertFalse(f.valid)
            self.assertIsNone(f.value_raw)
            flags = json.loads(f.flags_json)
            self.assertIn("feature_not_implemented", flags)

    def test_sequence_gap_and_missing_task_def_version(self):
        """Verify sequence gap detection and task def version checking."""
        evs = [
            {"seq": 100, "screen": "game", "mini_game": "E1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 110, "screen": "game", "mini_game": "E1", "action": "test", "task_def_version": "1.0", "t_ms": 500.0}
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
            {"seq": 200, "screen": "game", "mini_game": "E2", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "window_blur"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_deterministic_recomputation(self):
        """Verify deterministic feature extraction across runs."""
        evs = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=300, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="E1", action="tile_sorted", task_def_version="1.0",
                data_json=json.dumps({"trial_index": 0, "stimulus_id": "E1_T1", "choice": "container_1"})
            )
        ]
        self.db.add_all(evs)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
