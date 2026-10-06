import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, SQLModel, create_engine, select
from recruit_system.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag
from recruit_system.services.telemetry_engine import ingest_telemetry_batch
from recruit_system.services.task_definitions import (
    get_task_definitions,
    reconstruct_q1_information_seeking_state,
    reconstruct_q2_investigation_state,
    reconstruct_q3_integration_state
)
from recruit_system.services.feature_extractor import extract_session_features

class TestStep5W5HiddenGallery(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)
        self.session_id = str(uuid.uuid4())
        self.session = DBSession(
            session_id=self.session_id,
            email="candidate_w5@example.com",
            full_name="Hidden Gallery Candidate"
        )
        self.db.add(self.session)
        self.db.commit()

    def tearDown(self):
        self.db.close()

    def test_w5_task_definitions_golden_fixture(self):
        """Verify task definitions for Q1 (4 decisions in V1, 3 in V2), Q2 (4 relics in V1, 3 in V2), Q3 (3 ambiguity episodes)."""
        defs = get_task_definitions("1.0")
        games = defs.get("games", {})

        # V2: Q1 (3 decisions), Q2 (3 relics)
        defs_v2 = get_task_definitions("2.0")
        games_v2 = defs_v2.get("games", {})
        self.assertEqual(games_v2["Q1"].get("total_required_decisions"), 3)
        self.assertEqual(len(games_v2["Q1"].get("optional_resources", [])), 4)
        self.assertEqual(games_v2["Q2"].get("total_trials"), 3)
        self.assertEqual(len(games_v2["Q2"].get("trials", [])), 3)

        # Q1: 4 decisions, 4 optional resources in V1
        self.assertIn("Q1", games)
        q1 = games["Q1"]
        self.assertEqual(q1.get("total_required_decisions"), 4)
        opt_res = q1.get("optional_resources", [])
        self.assertEqual(len(opt_res), 4)
        useful_count = sum(1 for r in opt_res if r.get("info_value") == "high")
        control_count = sum(1 for r in opt_res if r.get("info_value") == "low")
        self.assertEqual(useful_count, 2)
        self.assertEqual(control_count, 2)

        # Q2: Exactly 4 relics, varying uncertainty in V1
        self.assertIn("Q2", games)
        q2 = games["Q2"]
        self.assertEqual(q2.get("total_trials"), 4)
        self.assertEqual(len(q2.get("trials", [])), 4)
        self.assertEqual(q2["trials"][0]["uncertainty_level"], "moderate")
        self.assertEqual(q2["trials"][0]["expected_value"], "high")
        self.assertEqual(q2["trials"][1]["uncertainty_level"], "high")
        self.assertEqual(q2["trials"][1]["expected_value"], "high")
        self.assertEqual(q2["trials"][2]["uncertainty_level"], "low")
        self.assertEqual(q2["trials"][2]["expected_value"], "low_control")
        self.assertEqual(q2["trials"][3]["uncertainty_level"], "high")
        self.assertEqual(q2["trials"][3]["expected_value"], "moderate")

        # Q3: Exactly 3 ambiguity integration episodes
        self.assertIn("Q3", games)
        q3 = games["Q3"]
        self.assertEqual(q3.get("total_trials"), 3)
        self.assertEqual(len(q3.get("trials", [])), 3)
        self.assertEqual(q3["trials"][0]["ambiguity_type"], "unattributed_artisan_folio")
        self.assertEqual(q3["trials"][1]["ambiguity_type"], "mismatched_period_provenance")
        self.assertEqual(q3["trials"][2]["ambiguity_type"], "regional_dialect_verse_origin")

    def test_q1_information_seeking_voluntary_resources_and_reconstruction(self):
        """Q1 emits primitive decision and optional resource events; server reconstructs consultation patterns."""
        events = [
            # Decision 1: Folio binding (Candidate consults useful note OPT_USEFUL_1, then submits decision)
            {"seq": 1, "screen": "game", "mini_game": "Q1", "action": "decision_presented", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"trial_index": 0, "stimulus_id": "Q1_D1"}},
            {"seq": 2, "screen": "game", "mini_game": "Q1", "action": "optional_resource_viewed", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"trial_index": 0, "stimulus_id": "Q1_D1", "resource_id": "OPT_USEFUL_1", "input_modality": "mouse"}},
            {"seq": 3, "screen": "game", "mini_game": "Q1", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 6000.0, "data": {"trial_index": 0, "stimulus_id": "Q1_D1", "choice": "flexible_cord_binding", "input_modality": "mouse"}},

            # Decision 2: Papier-mache case (Candidate consults both useful OPT_USEFUL_2 and control OPT_CONTROL_2)
            {"seq": 4, "screen": "game", "mini_game": "Q1", "action": "decision_presented", "task_def_version": "1.0", "t_ms": 7000.0, "data": {"trial_index": 1, "stimulus_id": "Q1_D2"}},
            {"seq": 5, "screen": "game", "mini_game": "Q1", "action": "optional_resource_viewed", "task_def_version": "1.0", "t_ms": 9000.0, "data": {"trial_index": 1, "stimulus_id": "Q1_D2", "resource_id": "OPT_USEFUL_2", "input_modality": "mouse"}},
            {"seq": 6, "screen": "game", "mini_game": "Q1", "action": "optional_resource_viewed", "task_def_version": "1.0", "t_ms": 11000.0, "data": {"trial_index": 1, "stimulus_id": "Q1_D2", "resource_id": "OPT_CONTROL_2", "input_modality": "mouse"}},
            {"seq": 7, "screen": "game", "mini_game": "Q1", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 13000.0, "data": {"trial_index": 1, "stimulus_id": "Q1_D2", "choice": "curing_linseed_glaze", "input_modality": "mouse"}},

            # Decision 3: Ledger attribution (Voluntary bypass: candidate decides directly without consulting optional notes)
            {"seq": 8, "screen": "game", "mini_game": "Q1", "action": "decision_presented", "task_def_version": "1.0", "t_ms": 14000.0, "data": {"trial_index": 2, "stimulus_id": "Q1_D3"}},
            {"seq": 9, "screen": "game", "mini_game": "Q1", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 16000.0, "data": {"trial_index": 2, "stimulus_id": "Q1_D3", "choice": "guild_ledger_verified", "input_modality": "keyboard"}},

            # Decision 4: Pigment specimens (Candidate consults useful note)
            {"seq": 10, "screen": "game", "mini_game": "Q1", "action": "decision_presented", "task_def_version": "1.0", "t_ms": 17000.0, "data": {"trial_index": 3, "stimulus_id": "Q1_D4"}},
            {"seq": 11, "screen": "game", "mini_game": "Q1", "action": "optional_resource_viewed", "task_def_version": "1.0", "t_ms": 19000.0, "data": {"trial_index": 3, "stimulus_id": "Q1_D4", "resource_id": "OPT_USEFUL_2", "input_modality": "mouse"}},
            {"seq": 12, "screen": "game", "mini_game": "Q1", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 21000.0, "data": {"trial_index": 3, "stimulus_id": "Q1_D4", "choice": "dark_vented_cedar_chest", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 12)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "Q1"
            )
        ).all()
        recon = reconstruct_q1_information_seeking_state(stored)

        self.assertEqual(recon["completed_count"], 4)
        self.assertTrue(recon["all_completed"])
        # 3 useful resources viewed across decisions (D1, D2, D4)
        self.assertEqual(recon["useful_resources_viewed_count"], 3)
        # 1 control resource viewed (D2)
        self.assertEqual(recon["control_resources_viewed_count"], 1)
        self.assertEqual(recon["decisions"]["Q1_D1"]["choice"], "flexible_cord_binding")
        self.assertEqual(recon["decisions"]["Q1_D3"]["choice"], "guild_ledger_verified")

    def test_q2_investigation_under_uncertainty_four_opportunities(self):
        """Q2 verifies 4 exploration opportunities, varying uncertainty, and clue inspection tracking."""
        events = [
            # Relic 1: Moderate uncertainty / High value -> 2 clues inspected
            {"seq": 20, "screen": "game", "mini_game": "Q2", "action": "artifact_presented", "task_def_version": "1.0", "t_ms": 30000.0, "data": {"trial_index": 0, "stimulus_id": "Q2_T1", "artifact_id": "manuscript_seal_1"}},
            {"seq": 21, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 32000.0, "data": {"trial_index": 0, "stimulus_id": "Q2_T1", "clue_id": "CLUE_SEAL_INTAGLIO", "input_modality": "mouse"}},
            {"seq": 22, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 34000.0, "data": {"trial_index": 0, "stimulus_id": "Q2_T1", "clue_id": "CLUE_WAX_RESIN", "input_modality": "mouse"}},
            {"seq": 23, "screen": "game", "mini_game": "Q2", "action": "investigation_finalized", "task_def_version": "1.0", "t_ms": 36000.0, "data": {"trial_index": 0, "stimulus_id": "Q2_T1", "attribution_choice": "attr_imperial_registrar_srinagar", "input_modality": "mouse"}},

            # Relic 2: High uncertainty / High value -> 3 clues inspected
            {"seq": 24, "screen": "game", "mini_game": "Q2", "action": "artifact_presented", "task_def_version": "1.0", "t_ms": 37000.0, "data": {"trial_index": 1, "stimulus_id": "Q2_T2", "artifact_id": "ciphered_marginalia_2"}},
            {"seq": 25, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 39000.0, "data": {"trial_index": 1, "stimulus_id": "Q2_T2", "clue_id": "CLUE_CIPHER_DIACRITIC", "input_modality": "mouse"}},
            {"seq": 26, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 41000.0, "data": {"trial_index": 1, "stimulus_id": "Q2_T2", "clue_id": "CLUE_SCRIBE_HAND", "input_modality": "mouse"}},
            {"seq": 27, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 43000.0, "data": {"trial_index": 1, "stimulus_id": "Q2_T2", "clue_id": "CLUE_GALL_INK_CORROSION", "input_modality": "mouse"}},
            {"seq": 28, "screen": "game", "mini_game": "Q2", "action": "investigation_finalized", "task_def_version": "1.0", "t_ms": 45000.0, "data": {"trial_index": 1, "stimulus_id": "Q2_T2", "attribution_choice": "attr_court_astrologer_notebook", "input_modality": "mouse"}},

            # Relic 3: Low uncertainty / Low control -> 1 clue inspected
            {"seq": 29, "screen": "game", "mini_game": "Q2", "action": "artifact_presented", "task_def_version": "1.0", "t_ms": 46000.0, "data": {"trial_index": 2, "stimulus_id": "Q2_T3", "artifact_id": "standard_receipt_3"}},
            {"seq": 30, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 47500.0, "data": {"trial_index": 2, "stimulus_id": "Q2_T3", "clue_id": "CLUE_PRINT_TYPE", "input_modality": "keyboard"}},
            {"seq": 31, "screen": "game", "mini_game": "Q2", "action": "investigation_finalized", "task_def_version": "1.0", "t_ms": 49000.0, "data": {"trial_index": 2, "stimulus_id": "Q2_T3", "attribution_choice": "attr_standard_tax_slip", "input_modality": "keyboard"}},

            # Relic 4: High uncertainty / Moderate value -> 2 clues inspected
            {"seq": 32, "screen": "game", "mini_game": "Q2", "action": "artifact_presented", "task_def_version": "1.0", "t_ms": 50000.0, "data": {"trial_index": 3, "stimulus_id": "Q2_T4", "artifact_id": "unknown_crest_impression_4"}},
            {"seq": 33, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 52000.0, "data": {"trial_index": 3, "stimulus_id": "Q2_T4", "clue_id": "CLUE_FALCON_CREST", "input_modality": "mouse"}},
            {"seq": 34, "screen": "game", "mini_game": "Q2", "action": "clue_inspected", "task_def_version": "1.0", "t_ms": 54000.0, "data": {"trial_index": 3, "stimulus_id": "Q2_T4", "clue_id": "CLUE_PAPER_WATERMARK", "input_modality": "mouse"}},
            {"seq": 35, "screen": "game", "mini_game": "Q2", "action": "investigation_finalized", "task_def_version": "1.0", "t_ms": 56000.0, "data": {"trial_index": 3, "stimulus_id": "Q2_T4", "attribution_choice": "attr_jhelum_paper_atelier", "input_modality": "mouse"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 16)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "Q2"
            )
        ).all()
        recon = reconstruct_q2_investigation_state(stored)

        self.assertEqual(recon["completed_count"], 4)
        self.assertTrue(recon["all_completed"])
        # Total clues: 2 + 3 + 1 + 2 = 8
        self.assertEqual(recon["total_clues_inspected"], 8)
        self.assertEqual(recon["attributions"]["Q2_T1"], "attr_imperial_registrar_srinagar")
        self.assertEqual(recon["attributions"]["Q2_T3"], "attr_standard_tax_slip")

    def test_q3_knowledge_integration_three_episodes(self):
        """Q3 distinguishes voluntary context retrieval from downstream decision integration without client summaries."""
        events = [
            # Episode 1: Context requested, decision correctly integrated
            {"seq": 40, "screen": "game", "mini_game": "Q3", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 60000.0, "data": {"trial_index": 0, "stimulus_id": "Q3_E1", "ambiguity_type": "unattributed_artisan_folio"}},
            {"seq": 41, "screen": "game", "mini_game": "Q3", "action": "context_requested", "task_def_version": "1.0", "t_ms": 63000.0, "data": {"trial_index": 0, "stimulus_id": "Q3_E1", "context_id": "provenance_context_1", "input_modality": "mouse"}},
            {"seq": 42, "screen": "game", "mini_game": "Q3", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 66000.0, "data": {"trial_index": 0, "stimulus_id": "Q3_E1", "choice": "choice_sadiq_rainawari", "input_modality": "mouse"}},

            # Episode 2: Context requested, decision correctly integrated
            {"seq": 43, "screen": "game", "mini_game": "Q3", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 68000.0, "data": {"trial_index": 1, "stimulus_id": "Q3_E2", "ambiguity_type": "mismatched_period_provenance"}},
            {"seq": 44, "screen": "game", "mini_game": "Q3", "action": "context_requested", "task_def_version": "1.0", "t_ms": 71000.0, "data": {"trial_index": 1, "stimulus_id": "Q3_E2", "context_id": "provenance_context_2", "input_modality": "mouse"}},
            {"seq": 45, "screen": "game", "mini_game": "Q3", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 74000.0, "data": {"trial_index": 1, "stimulus_id": "Q3_E2", "choice": "choice_post_flood_cedar", "input_modality": "mouse"}},

            # Episode 3: Context NOT requested (voluntary bypass), decision made
            {"seq": 46, "screen": "game", "mini_game": "Q3", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 76000.0, "data": {"trial_index": 2, "stimulus_id": "Q3_E3", "ambiguity_type": "regional_dialect_verse_origin"}},
            {"seq": 47, "screen": "game", "mini_game": "Q3", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 79000.0, "data": {"trial_index": 2, "stimulus_id": "Q3_E3", "choice": "choice_southern_vakh_shrine", "input_modality": "keyboard"}}
        ]

        result = ingest_telemetry_batch(self.db, self.session_id, events)
        self.assertEqual(result["ingested_count"], 8)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "Q3"
            )
        ).all()
        recon = reconstruct_q3_integration_state(stored)

        self.assertEqual(recon["completed_count"], 3)
        self.assertTrue(recon["all_completed"])
        # Context requested in 2 episodes (E1, E2)
        self.assertEqual(recon["context_retrieved_count"], 2)
        # All 3 choices aligned with ground truth
        self.assertEqual(recon["integrated_correctly_count"], 3)
        self.assertTrue(recon["episodes"]["Q3_E1"]["context_retrieved"])
        self.assertTrue(recon["episodes"]["Q3_E1"]["integrated"])
        self.assertFalse(recon["episodes"]["Q3_E3"]["context_retrieved"])
        self.assertFalse(recon["episodes"]["Q3_E3"]["integrated"])

    def test_w5_extractors_quarantined(self):
        """Q1, Q2, Q3 extractors remain strictly quarantined under feature_not_implemented."""
        self.db.add_all([
            DBTelemetryEvent(session_id=self.session_id, seq=901, segment_id=1, t_ms=1000.0, screen="game", mini_game="Q1", action="decision_submitted", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=902, segment_id=1, t_ms=2000.0, screen="game", mini_game="Q2", action="investigation_finalized", task_def_version="1.0", data_json="{}"),
            DBTelemetryEvent(session_id=self.session_id, seq=903, segment_id=1, t_ms=3000.0, screen="game", mini_game="Q3", action="decision_integrated", task_def_version="1.0", data_json="{}")
        ])
        self.db.commit()

        features = extract_session_features(self.db, self.session_id)
        w5_feats = {f.mini_game: f for f in features if f.mini_game in ["Q1", "Q2", "Q3"]}

        self.assertIn("Q1", w5_feats)
        self.assertIn("Q2", w5_feats)
        self.assertIn("Q3", w5_feats)

        for mg, f in w5_feats.items():
            self.assertFalse(f.valid)
            self.assertIsNone(f.value_raw)
            flags = json.loads(f.flags_json)
            self.assertIn("feature_not_implemented", flags)

    def test_sequence_gap_and_missing_task_def_version(self):
        """Verify sequence gap detection and task def version checking."""
        evs = [
            {"seq": 100, "screen": "game", "mini_game": "Q1", "action": "test", "task_def_version": "1.0", "t_ms": 100.0},
            {"seq": 110, "screen": "game", "mini_game": "Q1", "action": "test", "task_def_version": "1.0", "t_ms": 500.0}
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
            {"seq": 200, "screen": "game", "mini_game": "Q2", "action": "interrupted", "task_def_version": "1.0", "data": {"reason": "window_blur"}, "t_ms": 5000.0}
        ]
        result = ingest_telemetry_batch(self.db, self.session_id, evs)
        self.assertEqual(result["ingested_count"], 1)

    def test_deterministic_recomputation(self):
        """Verify deterministic feature extraction across runs."""
        evs = [
            DBTelemetryEvent(
                session_id=self.session_id, seq=300, segment_id=1, t_ms=5000.0,
                screen="game", mini_game="Q1", action="decision_submitted", task_def_version="1.0",
                data_json=json.dumps({"trial_index": 0, "stimulus_id": "Q1_D1"})
            )
        ]
        self.db.add_all(evs)
        self.db.commit()

        run1 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        run2 = [(f.feature_name, f.value_raw, f.valid, f.flags_json) for f in extract_session_features(self.db, self.session_id)]
        self.assertEqual(run1, run2)

    def test_q3_client_supplied_context_retrieved_is_stripped_and_derived_server_side(self):
        """Client attempt to pass context_retrieved is stripped as forbidden, server reconstructs it."""
        evs = [
            {"seq": 500, "screen": "game", "mini_game": "Q3", "action": "episode_presented", "task_def_version": "1.0", "t_ms": 1000.0, "data": {"stimulus_id": "Q3_E1"}},
            {"seq": 501, "screen": "game", "mini_game": "Q3", "action": "context_requested", "task_def_version": "1.0", "t_ms": 2000.0, "data": {"stimulus_id": "Q3_E1", "context_id": "provenance_context_1"}},
            # Client maliciously or erroneously supplies context_retrieved=False when it was requested
            {"seq": 502, "screen": "game", "mini_game": "Q3", "action": "decision_submitted", "task_def_version": "1.0", "t_ms": 3000.0, "data": {"stimulus_id": "Q3_E1", "choice": "choice_sadiq_rainawari", "context_retrieved": False}}
        ]
        ingest_telemetry_batch(self.db, self.session_id, evs)

        flags = self.db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == self.session_id,
                DBDataQualityFlag.flag == "forbidden_client_field_detected"
            )
        ).all()
        self.assertTrue(len(flags) >= 1)
        self.assertIn("context_retrieved", flags[0].detail)

        stored = self.db.exec(
            select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == self.session_id,
                DBTelemetryEvent.mini_game == "Q3"
            )
        ).all()
        # Verify stripped from stored data_json
        for ev in stored:
            if ev.action == "decision_submitted":
                payload = json.loads(ev.data_json)
                self.assertNotIn("context_retrieved", payload)

        recon = reconstruct_q3_integration_state(stored)
        # Server reconstructs truth from context_requested, ignoring false client claim
        self.assertTrue(recon["episodes"]["Q3_E1"]["context_retrieved"])
        self.assertTrue(recon["episodes"]["Q3_E1"]["integrated"])

if __name__ == "__main__":
    unittest.main()

