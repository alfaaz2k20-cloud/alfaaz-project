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
    reconstruct_cr1_construction_state,
    reconstruct_cr2_reframing_state,
    reconstruct_cr3_affordance_state
)
from app.services.feature_extractor import extract_session_features

class TestStep6W6BrokenTool(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w6@example.com",
            full_name="Broken Tool Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w6_task_definitions_golden_fixture(self):
        """Verify task definitions for CR1 (2 stages), CR2 (3 episodes), CR3 (3 affordance trials)."""
        defs = get_task_definitions()
        games = defs.get("games", {})

        # CR1: 2 construction stages
        self.assertIn("CR1", games)
        cr1 = games["CR1"]
        self.assertEqual(cr1.get("total_stages"), 2)
        stages = cr1.get("stages", [])
        self.assertEqual(len(stages), 2)
        self.assertEqual(stages[0]["stage_id"], "CR1_S1")
        self.assertEqual(stages[0]["constraint"], "missing_crossbar_shuttle")
        self.assertEqual(stages[0]["valid_solution_count"], 3)
        self.assertEqual(stages[1]["stage_id"], "CR1_S2")
        self.assertEqual(stages[1]["constraint"], "tension_wire_unanchored")
        self.assertEqual(stages[1]["valid_solution_count"], 3)

        # CR2: 3 spatial reframing episodes
        self.assertIn("CR2", games)
        cr2 = games["CR2"]
        self.assertEqual(cr2.get("total_episodes"), 3)
        episodes = cr2.get("episodes", [])
        self.assertEqual(len(episodes), 3)
        self.assertEqual(episodes[0]["episode_id"], "CR2_E1")
        self.assertEqual(episodes[0]["constraint_change"], "central_pillar_blocks_corridor")
        self.assertEqual(episodes[0]["target_reframing"], "split_flow")
        self.assertEqual(episodes[1]["episode_id"], "CR2_E2")
        self.assertEqual(episodes[1]["constraint_change"], "emergency_exit_clearance_widened")
        self.assertEqual(episodes[1]["target_reframing"], "perimeter_flow")
        self.assertEqual(episodes[2]["episode_id"], "CR2_E3")
        self.assertEqual(episodes[2]["constraint_change"], "low_ceiling_arch_support")
        self.assertEqual(episodes[2]["target_reframing"], "linear_flow")

        # CR3: 3 affordance synthesis trials
        self.assertIn("CR3", games)
        cr3 = games["CR3"]
        self.assertEqual(cr3.get("total_trials"), 3)
        trials = cr3.get("trials", [])
        self.assertEqual(len(trials), 3)
        self.assertEqual(trials[0]["stimulus_id"], "CR3_T1")
        self.assertEqual(trials[0]["target_motif"], "burnished_crease")
        self.assertEqual(trials[1]["stimulus_id"], "CR3_T2")
        self.assertEqual(trials[1]["target_motif"], "fine_stipple")
        self.assertEqual(trials[2]["stimulus_id"], "CR3_T3")
        self.assertEqual(trials[2]["target_motif"], "gold_leaf_seal")

    def test_cr1_construction_two_stages(self):
        """CR1 reconstructs 2 stages, multiple valid solutions, and test events."""
        events = [
            # Stage 1: Part toggle -> test -> completed with valid Solution A (Bamboo + Cord)
            {"seq": 1, "screen": "game", "mini_game": "CR1", "action": "stage_presented", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"stage_id": "CR1_S1", "trial_index": 0, "constraint": "missing_crossbar_shuttle"}},
            {"seq": 2, "screen": "game", "mini_game": "CR1", "action": "part_toggled", "task_def_version": "1.0", "t_ms": 2000.0, "data": {"stage_id": "CR1_S1", "trial_index": 0, "part_id": "M_SPLIT_BAMBOO", "selected_parts": ["M_SPLIT_BAMBOO"], "input_modality": "mouse"}},
            {"seq": 3, "screen": "game", "mini_game": "CR1", "action": "part_toggled", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"stage_id": "CR1_S1", "trial_index": 0, "part_id": "M_WAXED_CORD", "selected_parts": ["M_SPLIT_BAMBOO", "M_WAXED_CORD"], "input_modality": "mouse"}},
            {"seq": 4, "screen": "game", "mini_game": "CR1", "action": "assembly_tested", "task_def_version": "1.0", "t_ms": 4000.0, "data": {"stage_id": "CR1_S1", "trial_index": 0, "parts": ["M_SPLIT_BAMBOO", "M_WAXED_CORD"], "input_modality": "mouse"}},
            {"seq": 5, "screen": "game", "mini_game": "CR1", "action": "stage_completed", "task_def_version": "1.0", "t_ms": 5000.0, "data": {"stage_id": "CR1_S1", "trial_index": 0, "final_parts": ["M_SPLIT_BAMBOO", "M_WAXED_CORD"], "input_modality": "mouse"}},

            # Stage 2: Direct valid completion with Solution B (Annealed Copper Wire)
            {"seq": 6, "screen": "game", "mini_game": "CR1", "action": "stage_presented", "task_def_version": "1.0", "t_ms": 6000.0, "data": {"stage_id": "CR1_S2", "trial_index": 1, "constraint": "tension_wire_unanchored"}},
            {"seq": 7, "screen": "game", "mini_game": "CR1", "action": "part_toggled", "task_def_version": "1.0", "t_ms": 7000.0, "data": {"stage_id": "CR1_S2", "trial_index": 1, "part_id": "M_COPPER_WIRE", "selected_parts": ["M_COPPER_WIRE"], "input_modality": "keyboard"}},
            {"seq": 8, "screen": "game", "mini_game": "CR1", "action": "stage_completed", "task_def_version": "1.0", "t_ms": 8000.0, "data": {"stage_id": "CR1_S2", "trial_index": 1, "final_parts": ["M_COPPER_WIRE"], "input_modality": "keyboard"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 8)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "CR1"
            )
        ).all()
        recon = reconstruct_cr1_construction_state(stored)

        self.assertEqual(recon["completed_count"], 2)
        self.assertTrue(recon["all_completed"])
        self.assertEqual(recon["valid_solution_count"], 2)
        self.assertTrue(recon["stages"]["CR1_S1"]["is_valid"])
        self.assertEqual(recon["stages"]["CR1_S1"]["test_count_prior_to_completion"], 1)
        self.assertTrue(recon["stages"]["CR1_S2"]["is_valid"])
        self.assertEqual(recon["stages"]["CR1_S2"]["test_count_prior_to_completion"], 0)

    def test_cr2_spatial_reframing_three_episodes(self):
        """CR2 captures strategy before and after architectural constraint shifts across 3 episodes."""
        events = [
            # Episode 1: Initial Central Avenue -> Shift -> Revised to Split Flow (Aligned, Revised)
            {"seq": 10, "screen": "game", "mini_game": "CR2", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 10000.0, "data": {"episode_id": "CR2_E1", "trial_index": 0, "initial_context": "Grand hall central transit"}},
            {"seq": 11, "screen": "game", "mini_game": "CR2", "action": "initial_strategy_selected", "task_def_version": "1.0", "t_ms": 12000.0, "data": {"episode_id": "CR2_E1", "trial_index": 0, "strategy_id": "S_CENTRAL_AVENUE", "input_modality": "mouse"}},
            {"seq": 12, "screen": "game", "mini_game": "CR2", "action": "constraint_shifted", "task_def_version": "1.0", "t_ms": 14000.0, "data": {"episode_id": "CR2_E1", "trial_index": 0, "constraint_change": "central_pillar_blocks_corridor"}},
            {"seq": 13, "screen": "game", "mini_game": "CR2", "action": "strategy_revised", "task_def_version": "1.0", "t_ms": 16000.0, "data": {"episode_id": "CR2_E1", "trial_index": 0, "initial_strategy_id": "S_CENTRAL_AVENUE", "revised_strategy_id": "split_flow", "input_modality": "mouse"}},

            # Episode 2: Initial Paired Plinths -> Shift -> Revised to Perimeter Flow (Aligned, Revised)
            {"seq": 14, "screen": "game", "mini_game": "CR2", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 18000.0, "data": {"episode_id": "CR2_E2", "trial_index": 1, "initial_context": "West cloister modular layout"}},
            {"seq": 15, "screen": "game", "mini_game": "CR2", "action": "initial_strategy_selected", "task_def_version": "1.0", "t_ms": 20000.0, "data": {"episode_id": "CR2_E2", "trial_index": 1, "strategy_id": "S_PAIRED_PLINTHS", "input_modality": "mouse"}},
            {"seq": 16, "screen": "game", "mini_game": "CR2", "action": "constraint_shifted", "task_def_version": "1.0", "t_ms": 22000.0, "data": {"episode_id": "CR2_E2", "trial_index": 1, "constraint_change": "emergency_exit_clearance_widened"}},
            {"seq": 17, "screen": "game", "mini_game": "CR2", "action": "strategy_revised", "task_def_version": "1.0", "t_ms": 24000.0, "data": {"episode_id": "CR2_E2", "trial_index": 1, "initial_strategy_id": "S_PAIRED_PLINTHS", "revised_strategy_id": "perimeter_flow", "input_modality": "mouse"}},

            # Episode 3: Initial Tall Stelae -> Shift -> Retained Staggered Alcoves (Unaligned, Revised)
            {"seq": 18, "screen": "game", "mini_game": "CR2", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 26000.0, "data": {"episode_id": "CR2_E3", "trial_index": 2, "initial_context": "North transept banner displays"}},
            {"seq": 19, "screen": "game", "mini_game": "CR2", "action": "initial_strategy_selected", "task_def_version": "1.0", "t_ms": 28000.0, "data": {"episode_id": "CR2_E3", "trial_index": 2, "strategy_id": "S_TALL_STELAE", "input_modality": "keyboard"}},
            {"seq": 20, "screen": "game", "mini_game": "CR2", "action": "constraint_shifted", "task_def_version": "1.0", "t_ms": 30000.0, "data": {"episode_id": "CR2_E3", "trial_index": 2, "constraint_change": "low_ceiling_arch_support"}},
            {"seq": 21, "screen": "game", "mini_game": "CR2", "action": "strategy_revised", "task_def_version": "1.0", "t_ms": 32000.0, "data": {"episode_id": "CR2_E3", "trial_index": 2, "initial_strategy_id": "S_TALL_STELAE", "revised_strategy_id": "staggered_alcoves", "input_modality": "keyboard"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 12)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "CR2"
            )
        ).all()
        recon = reconstruct_cr2_reframing_state(stored)

        self.assertEqual(recon["completed_count"], 3)
        self.assertTrue(recon["all_completed"])
        # All 3 were revised from their initial strategy
        self.assertEqual(recon["strategy_revised_count"], 3)
        # 2 were target-aligned (E1 split_flow, E2 perimeter_flow)
        self.assertEqual(recon["target_aligned_count"], 2)
        self.assertTrue(recon["episodes"]["CR2_E1"]["is_aligned"])
        self.assertTrue(recon["episodes"]["CR2_E2"]["is_aligned"])
        self.assertFalse(recon["episodes"]["CR2_E3"]["is_aligned"])

    def test_cr3_affordance_synthesis_three_trials(self):
        """CR3 captures tool selection, action application, feedback observation, and strategy adaptation."""
        events = [
            # Trial 1: Tool selected -> action applied -> feedback observed -> strategy adapted (Aligned)
            {"seq": 30, "screen": "game", "mini_game": "CR3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 40000.0, "data": {"stimulus_id": "CR3_T1", "trial_index": 0, "target_motif": "burnished_crease"}},
            {"seq": 31, "screen": "game", "mini_game": "CR3", "action": "tool_selected", "task_def_version": "1.0", "t_ms": 42000.0, "data": {"stimulus_id": "CR3_T1", "trial_index": 0, "tool_id": "bone_folder", "input_modality": "mouse"}},
            {"seq": 32, "screen": "game", "mini_game": "CR3", "action": "action_applied", "task_def_version": "1.0", "t_ms": 44000.0, "data": {"stimulus_id": "CR3_T1", "trial_index": 0, "tool_id": "bone_folder", "action_method": "firm_edge_pass", "input_modality": "mouse"}},
            {"seq": 33, "screen": "game", "mini_game": "CR3", "action": "feedback_observed", "task_def_version": "1.0", "t_ms": 46000.0, "data": {"stimulus_id": "CR3_T1", "trial_index": 0, "tool_id": "bone_folder", "action_method": "firm_edge_pass", "outcome_feedback": "Clean crisp crease formed"}},
            {"seq": 34, "screen": "game", "mini_game": "CR3", "action": "strategy_adapted", "task_def_version": "1.0", "t_ms": 48000.0, "data": {"stimulus_id": "CR3_T1", "trial_index": 0, "final_tool_id": "bone_folder", "final_method": "firm_edge_pass", "input_modality": "mouse"}},

            # Trial 2: Sponge block + mottled dab (Aligned)
            {"seq": 35, "screen": "game", "mini_game": "CR3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 50000.0, "data": {"stimulus_id": "CR3_T2", "trial_index": 1, "target_motif": "fine_stipple"}},
            {"seq": 36, "screen": "game", "mini_game": "CR3", "action": "tool_selected", "task_def_version": "1.0", "t_ms": 52000.0, "data": {"stimulus_id": "CR3_T2", "trial_index": 1, "tool_id": "sponge_block", "input_modality": "mouse"}},
            {"seq": 37, "screen": "game", "mini_game": "CR3", "action": "action_applied", "task_def_version": "1.0", "t_ms": 54000.0, "data": {"stimulus_id": "CR3_T2", "trial_index": 1, "tool_id": "sponge_block", "action_method": "mottled_dab", "input_modality": "mouse"}},
            {"seq": 38, "screen": "game", "mini_game": "CR3", "action": "strategy_adapted", "task_def_version": "1.0", "t_ms": 56000.0, "data": {"stimulus_id": "CR3_T2", "trial_index": 1, "final_tool_id": "sponge_block", "final_method": "mottled_dab", "input_modality": "mouse"}},

            # Trial 3: Agate stone + friction_free_rub (Aligned)
            {"seq": 39, "screen": "game", "mini_game": "CR3", "action": "trial_presented", "task_def_version": "1.0", "t_ms": 58000.0, "data": {"stimulus_id": "CR3_T3", "trial_index": 2, "target_motif": "gold_leaf_seal"}},
            {"seq": 40, "screen": "game", "mini_game": "CR3", "action": "strategy_adapted", "task_def_version": "1.0", "t_ms": 60000.0, "data": {"stimulus_id": "CR3_T3", "trial_index": 2, "final_tool_id": "agate_stone", "final_method": "friction_free_rub", "input_modality": "keyboard"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 11)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "CR3"
            )
        ).all()
        recon = reconstruct_cr3_affordance_state(stored)

        self.assertEqual(recon["completed_count"], 3)
        self.assertTrue(recon["all_completed"])
        self.assertEqual(recon["aligned_count"], 3)
        self.assertTrue(recon["trials"]["CR3_T1"]["is_fully_aligned"])
        self.assertEqual(recon["trials"]["CR3_T1"]["feedback_observed_count"], 1)
        self.assertTrue(recon["trials"]["CR3_T2"]["is_fully_aligned"])
        self.assertTrue(recon["trials"]["CR3_T3"]["is_fully_aligned"])

    def test_w6_extractors_quarantined(self):
        """CR1, CR2, CR3 extractors remain strictly quarantined under feature_not_implemented."""
        self.db.add_all([
            DBTelemetryEvent(session_id=self.session_id, seq=801, segment_id=1, t_ms=1000.0, screen="game", mini_game="CR1", action="stage_completed", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=802, segment_id=1, t_ms=2000.0, screen="game", mini_game="CR2", action="strategy_revised", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=803, segment_id=1, t_ms=3000.0, screen="game", mini_game="CR3", action="strategy_adapted", task_def_version="1.0", data_json="{}")
        ])
        self.db.commit()

        features = extract_session_features(self.db, self.session_id)
        w6_feats = {f.mini_game: f for f in features if f.mini_game in ["CR1", "CR2", "CR3"]}

        self.assertIn("CR1", w6_feats)
        self.assertIn("CR2", w6_feats)
        self.assertIn("CR3", w6_feats)

        for mg, f in w6_feats.items():
            self.assertFalse(f.valid)
            self.assertIsNone(f.value_raw)
            flags = json.loads(f.flags_json)
            self.assertIn("feature_not_implemented", flags)

    def test_sequence_gap_and_missing_task_def_version(self):
        """Verify sequence gap detection in World 6 telemetry."""
        evs = [
            {"seq": 100, "screen": "game", "mini_game": "CR1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 115, "screen": "game", "mini_game": "CR1", "action": "test", "task_def_version": "1.0", "t_ms": 500.0}
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
            {"seq": 200, "screen": "game", "mini_game": "CR2", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "window_blur"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_missing_event_resilience(self):
        """Reconstructors handle partial/missing events gracefully without errors."""
        events = [
            {"seq": 301, "screen": "game", "mini_game": "CR1", "action": "stage_completed", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"stage_id": "CR1_S1", "final_parts": ["M_SPLIT_BAMBOO"]}},
            {"seq": 302, "screen": "game", "mini_game": "CR2", "action": "strategy_revised", "task_def_version": "1.0", "t_ms": 2000.0, "data": {"episode_id": "CR2_E1", "revised_strategy_id": "split_flow"}},
            {"seq": 303, "screen": "game", "mini_game": "CR3", "action": "strategy_adapted", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"stimulus_id": "CR3_T1", "final_tool_id": "bone_folder", "final_method": "firm_edge_pass"}}
        ]
        ingest_telemetry_batch(self.db, self.session_id, events)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == self.session_id)
        ).all()

        recon1 = reconstruct_cr1_construction_state(stored)
        self.assertEqual(recon1["completed_count"], 1)
        self.assertFalse(recon1["all_completed"])

        recon2 = reconstruct_cr2_reframing_state(stored)
        self.assertEqual(recon2["completed_count"], 1)
        self.assertFalse(recon2["all_completed"])

        recon3 = reconstruct_cr3_affordance_state(stored)
        self.assertEqual(recon3["completed_count"], 1)
        self.assertFalse(recon3["all_completed"])

    def test_deterministic_recomputation(self):
        """Verify deterministic feature extraction across multiple invocations."""
        evs = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=400, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="CR1", action="stage_completed", task_def_version="1.0",
                data_json=json.dumps({"stage_id": "CR1_S1", "final_parts": ["M_BRASS_ROD"]})
            )
        ]
        self.db.add_all(evs)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

if __name__ == "__main__":
    unittest.main()
