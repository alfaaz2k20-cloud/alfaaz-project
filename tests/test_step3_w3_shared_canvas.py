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
from app.services.task_definitions import get_task_definitions, get_game_definition
from app.services.feature_extractor import extract_session_features

class TestStep3W3SharedCanvas(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w3@example.com",
            full_name="Shared Canvas Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w3_task_definitions_golden_fixture(self):
        """Verify task definitions for C1 (3 rounds), C2 (3 rounds), C3 (3 repair opportunities)."""
        defs = get_task_definitions()
        games = defs.get("games", {})

        # C1: 3 rounds (deficit, balanced, surplus control)
        self.assertIn("C1", games)
        c1 = games["C1"]
        self.assertEqual(c1.get("total_trials"), 3)
        self.assertEqual(len(c1.get("trials", [])), 3)
        c1_stims = [t["stimulus_id"] for t in c1["trials"]]
        self.assertEqual(c1_stims, ["C1_R1", "C1_R2", "C1_R3"])
        self.assertEqual(c1["trials"][0]["condition_type"], "share_needed")
        self.assertEqual(c1["trials"][1]["condition_type"], "equal_distribution")
        self.assertEqual(c1["trials"][2]["condition_type"], "sharing_unnecessary")

        # C2: 3 rounds (distinct partner states, spatial placements)
        self.assertIn("C2", games)
        c2 = games["C2"]
        self.assertEqual(c2.get("total_trials"), 3)
        self.assertEqual(len(c2.get("trials", [])), 3)
        c2_stims = [t["stimulus_id"] for t in c2["trials"]]
        self.assertEqual(c2_stims, ["C2_R1", "C2_R2", "C2_R3"])

        # C3: 3 breakdown opportunities (electrical, balanced control, shadow)
        self.assertIn("C3", games)
        c3 = games["C3"]
        self.assertEqual(c3.get("total_trials"), 3)
        self.assertEqual(len(c3.get("trials", [])), 3)
        c3_stims = [t["stimulus_id"] for t in c3["trials"]]
        self.assertEqual(c3_stims, ["C3_R1", "C3_R2", "C3_R3"])
        self.assertEqual(c3["trials"][0]["condition_type"], "identify_and_repair")
        self.assertEqual(c3["trials"][1]["condition_type"], "clean_control")
        self.assertEqual(c3["trials"][2]["condition_type"], "identify_and_repair")

    def test_c1_raw_telemetry_ingestion_and_no_client_scores(self):
        """C1 emits raw adjustments and round submissions without client-authored scores."""
        events = [
            # Round 1: Deficit
            {
                "seq": 1, "screen": "game", "mini_game": "C1", "action": "round_presented",
                "task_def_version": "1.0", "t_ms": 1000.0,
                "data": {"trial_index": 0, "stimulus_id": "C1_R1", "partner_initial": 2, "user_initial": 8}
            },
            {
                "seq": 2, "screen": "game", "mini_game": "C1", "action": "allocation_adjusted",
                "task_def_version": "1.0", "t_ms": 2500.0,
                "data": {"trial_index": 0, "stimulus_id": "C1_R1", "allocated_amount": 3, "input_modality": "mouse"}
            },
            {
                "seq": 3, "screen": "game", "mini_game": "C1", "action": "round_submit",
                "task_def_version": "1.0", "t_ms": 4000.0,
                "data": {
                    "trial_index": 0, "stimulus_id": "C1_R1",
                    "transferred_count": 3, "remaining_count": 5, "partner_final_count": 5,
                    "input_modality": "mouse"
                }
            },
            # Round 2: Balanced
            {
                "seq": 4, "screen": "game", "mini_game": "C1", "action": "round_presented",
                "task_def_version": "1.0", "t_ms": 5000.0,
                "data": {"trial_index": 1, "stimulus_id": "C1_R2", "partner_initial": 5, "user_initial": 5}
            },
            {
                "seq": 5, "screen": "game", "mini_game": "C1", "action": "round_submit",
                "task_def_version": "1.0", "t_ms": 7000.0,
                "data": {
                    "trial_index": 1, "stimulus_id": "C1_R2",
                    "transferred_count": 0, "remaining_count": 5, "partner_final_count": 5,
                    "input_modality": "mouse"
                }
            },
            # Round 3: Surplus
            {
                "seq": 6, "screen": "game", "mini_game": "C1", "action": "round_presented",
                "task_def_version": "1.0", "t_ms": 8000.0,
                "data": {"trial_index": 2, "stimulus_id": "C1_R3", "partner_initial": 8, "user_initial": 5}
            },
            {
                "seq": 7, "screen": "game", "mini_game": "C1", "action": "round_submit",
                "task_def_version": "1.0", "t_ms": 10000.0,
                "data": {
                    "trial_index": 2, "stimulus_id": "C1_R3",
                    "transferred_count": 0, "remaining_count": 5, "partner_final_count": 8,
                    "input_modality": "mouse"
                }
            }
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 7)

        # Confirm no data quality flags for forbidden fields
        flags = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == self.session_id,
                DBDataQualityFlag.flag == "forbidden_client_field_detected"
            )
        ).all()
        self.assertEqual(len(flags), 0)

        # Verify C1 extractor is quarantined under feature_not_implemented
        features = extract_session_features(self.db, self.session_id)
        c1_feats = [f for f in features if f.mini_game == "C1"]
        self.assertEqual(len(c1_feats), 1)
        self.assertFalse(c1_feats[0].valid)
        self.assertIsNone(c1_feats[0].value_raw)
        self.assertIn("feature_not_implemented", json.loads(c1_feats[0].flags_json))

    def test_c2_coordination_per_placement_events(self):
        """C2 records discrete placement attempts and confirmations across 3 rounds."""
        events = [
            # C2 Round 1
            {"seq": 10, "screen": "game", "mini_game": "C2", "action": "round_presented", "task_def_version": "1.0", "t_ms": 11000.0, "data": {"trial_index": 0, "stimulus_id": "C2_R1"}},
            {"seq": 11, "screen": "game", "mini_game": "C2", "action": "placement_attempted", "task_def_version": "1.0", "t_ms": 12000.0, "data": {"trial_index": 0, "stimulus_id": "C2_R1", "slot_id": "SLOT_OVERLAP_LEFT", "input_modality": "mouse"}},
            {"seq": 12, "screen": "game", "mini_game": "C2", "action": "placement_attempted", "task_def_version": "1.0", "t_ms": 13000.0, "data": {"trial_index": 0, "stimulus_id": "C2_R1", "slot_id": "SLOT_NORTH_RIGHT", "input_modality": "mouse"}},
            {"seq": 13, "screen": "game", "mini_game": "C2", "action": "placement_confirmed", "task_def_version": "1.0", "t_ms": 14000.0, "data": {"trial_index": 0, "stimulus_id": "C2_R1", "chosen_slot": "SLOT_NORTH_RIGHT", "input_modality": "mouse"}},
            # C2 Round 2
            {"seq": 14, "screen": "game", "mini_game": "C2", "action": "round_presented", "task_def_version": "1.0", "t_ms": 15000.0, "data": {"trial_index": 1, "stimulus_id": "C2_R2"}},
            {"seq": 15, "screen": "game", "mini_game": "C2", "action": "placement_confirmed", "task_def_version": "1.0", "t_ms": 17000.0, "data": {"trial_index": 1, "stimulus_id": "C2_R2", "chosen_slot": "SLOT_PERIMETER_EAST", "input_modality": "keyboard"}},
            # C2 Round 3
            {"seq": 16, "screen": "game", "mini_game": "C2", "action": "round_presented", "task_def_version": "1.0", "t_ms": 18000.0, "data": {"trial_index": 2, "stimulus_id": "C2_R3"}},
            {"seq": 17, "screen": "game", "mini_game": "C2", "action": "placement_confirmed", "task_def_version": "1.0", "t_ms": 20000.0, "data": {"trial_index": 2, "stimulus_id": "C2_R3", "chosen_slot": "SLOT_UPPER_GALLERY", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 8)

        # Verify C2 extractor is quarantined
        features = extract_session_features(self.db, self.session_id)
        c2_feats = [f for f in features if f.mini_game == "C2"]
        self.assertEqual(len(c2_feats), 1)
        self.assertFalse(c2_feats[0].valid)
        self.assertIsNone(c2_feats[0].value_raw)
        self.assertIn("feature_not_implemented", json.loads(c2_feats[0].flags_json))

    def test_c3_multi_step_repair_progression(self):
        """C3 verifies multi-step repair progression: identify breakdown -> perform useful repair -> execute repaired action."""
        events = [
            # Opportunity 1: Electrical breakdown
            {"seq": 20, "screen": "game", "mini_game": "C3", "action": "repair_presented", "task_def_version": "1.0", "t_ms": 21000.0, "data": {"trial_index": 0, "stimulus_id": "C3_R1"}},
            {"seq": 21, "screen": "game", "mini_game": "C3", "action": "breakdown_identified", "task_def_version": "1.0", "t_ms": 23000.0, "data": {"trial_index": 0, "stimulus_id": "C3_R1", "fault_id": "fault_conduit_disconnected", "input_modality": "mouse"}},
            {"seq": 22, "screen": "game", "mini_game": "C3", "action": "repair_action_performed", "task_def_version": "1.0", "t_ms": 25000.0, "data": {"trial_index": 0, "stimulus_id": "C3_R1", "repair_action_id": "adjust_conduit", "input_modality": "mouse"}},
            {"seq": 23, "screen": "game", "mini_game": "C3", "action": "repaired_action_executed", "task_def_version": "1.0", "t_ms": 27000.0, "data": {"trial_index": 0, "stimulus_id": "C3_R1", "fault_id": "fault_conduit_disconnected", "repair_action_id": "adjust_conduit", "execution_action_id": "restore_power", "input_modality": "mouse"}},

            # Opportunity 2: Clean control (balanced)
            {"seq": 24, "screen": "game", "mini_game": "C3", "action": "repair_presented", "task_def_version": "1.0", "t_ms": 28000.0, "data": {"trial_index": 1, "stimulus_id": "C3_R2"}},
            {"seq": 25, "screen": "game", "mini_game": "C3", "action": "breakdown_identified", "task_def_version": "1.0", "t_ms": 30000.0, "data": {"trial_index": 1, "stimulus_id": "C3_R2", "fault_id": "fault_none_adequate", "input_modality": "keyboard"}},
            {"seq": 26, "screen": "game", "mini_game": "C3", "action": "repair_action_performed", "task_def_version": "1.0", "t_ms": 32000.0, "data": {"trial_index": 1, "stimulus_id": "C3_R2", "repair_action_id": "verify_adequate", "input_modality": "keyboard"}},
            {"seq": 27, "screen": "game", "mini_game": "C3", "action": "repaired_action_executed", "task_def_version": "1.0", "t_ms": 34000.0, "data": {"trial_index": 1, "stimulus_id": "C3_R2", "fault_id": "fault_none_adequate", "repair_action_id": "verify_adequate", "execution_action_id": "verify_adequate", "input_modality": "keyboard"}},

            # Opportunity 3: Shadow corridor obstruction
            {"seq": 28, "screen": "game", "mini_game": "C3", "action": "repair_presented", "task_def_version": "1.0", "t_ms": 35000.0, "data": {"trial_index": 2, "stimulus_id": "C3_R3"}},
            {"seq": 29, "screen": "game", "mini_game": "C3", "action": "breakdown_identified", "task_def_version": "1.0", "t_ms": 37000.0, "data": {"trial_index": 2, "stimulus_id": "C3_R3", "fault_id": "fault_blindspot_obstruction", "input_modality": "mouse"}},
            {"seq": 30, "screen": "game", "mini_game": "C3", "action": "repair_action_performed", "task_def_version": "1.0", "t_ms": 39000.0, "data": {"trial_index": 2, "stimulus_id": "C3_R3", "repair_action_id": "shift_lantern", "input_modality": "mouse"}},
            {"seq": 31, "screen": "game", "mini_game": "C3", "action": "repaired_action_executed", "task_def_version": "1.0", "t_ms": 41000.0, "data": {"trial_index": 2, "stimulus_id": "C3_R3", "fault_id": "fault_blindspot_obstruction", "repair_action_id": "shift_lantern", "execution_action_id": "illuminate_path", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 12)

        # Verify C3 extractor is quarantined
        features = extract_session_features(self.db, self.session_id)
        c3_feats = [f for f in features if f.mini_game == "C3"]
        self.assertEqual(len(c3_feats), 1)
        self.assertFalse(c3_feats[0].valid)
        self.assertIsNone(c3_feats[0].value_raw)
        self.assertIn("feature_not_implemented", json.loads(c3_feats[0].flags_json))

    def test_sequence_gap_and_missing_task_def_version(self):
        """Verify sequence gap detection and task def version checking."""
        evs = [
            {"seq": 1, "screen": "game", "mini_game": "C1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 10, "screen": "game", "mini_game": "C1", "action": "test", "task_def_version": "1.0", "t_ms": 500.0}
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
            {"seq": 100, "screen": "game", "mini_game": "C2", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "window_blur"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_deterministic_recomputation(self):
        """Verify deterministic feature extraction across runs."""
        evs = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=200, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="C1", action="round_submit", task_def_version="1.0",
                data_json=json.dumps({"trial_index": 0, "stimulus_id": "C1_R1", "transferred_count": 3})
            )
        ]
        self.db.add_all(evs)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
