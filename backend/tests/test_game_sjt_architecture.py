import sys
import os
import json
from datetime import datetime, timezone
from sqlmodel import Session, SQLModel, create_engine, select

# Add backend directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.models.recruit import (
    DBSession, DBSJTResponse, DBTelemetryEvent, DBEvidence,
    DBGameScore, DBDataQualityFlag, DBApplicantIdentity, DBConsentRecord
)
from app.services.sjt_engine import (
    score_sjt_responses, verify_and_load_configs, compute_keys_fingerprint,
    resolve_config_path
)
from app.services.game_scoring_engine import (
    score_game, score_session_games, GAME_PARAMETERS, GAME_BOUNDS,
    SCORING_VERSION, TASK_DEF_VERSION
)
from app.services.evidence_integrator import (
    integrate_session_evidence, compute_cross_method_delta,
    determine_relationship, determine_confidence, PARAM_MINIGAMES
)
from app.routers.research_view import get_session_research_view

PASSED_CHECKS = 0
FAILED_CHECKS = 0


def assert_true(cond: bool, msg: str):
    global PASSED_CHECKS, FAILED_CHECKS
    if cond:
        PASSED_CHECKS += 1
        print(f"  [PASS] {msg}")
    else:
        FAILED_CHECKS += 1
        print(f"  [FAIL] {msg}")


def assert_eq(actual: Any, expected: Any, msg: str):
    assert_true(actual == expected, f"{msg} (expected {expected}, got {actual})")


def assert_almost_eq(actual: float, expected: float, msg: str, tol: float = 1e-5):
    diff = abs(actual - expected)
    assert_true(diff <= tol, f"{msg} (expected ~{expected}, got {actual}, diff {diff})")


def run_tests():
    print("============================================================")
    print("RUNNING ALFAAZ RECRUIT GAME-SJT MEASUREMENT ARCHITECTURE SUITE")
    print("============================================================\n")

    # ------------------------------------------------------------------
    # 1. SJT Integrity & Owner Locked Hash
    # ------------------------------------------------------------------
    print("--- 1. SJT Integrity & Owner-Locked State ---")
    params_data, sjt_data, config_hash, ranges = verify_and_load_configs()
    assert_eq(len(ranges), 7, "7 parameters present in theoretical ranges")
    assert_eq(len(sjt_data["scenarios"]), 7, "7 scenarios in SJT items")
    
    with open(resolve_config_path("locked_hashes.json"), "r", encoding="utf-8") as f:
        locked = json.load(f)
    fp = compute_keys_fingerprint(sjt_data)
    assert_eq(fp, locked["sjt_keys_fingerprint"], "Owner-locked SJT fingerprint matches repository exactly")

    # ------------------------------------------------------------------
    # 2. All 21 Games Deterministic Scoring
    # ------------------------------------------------------------------
    print("\n--- 2. Deterministic Scoring for All 21 Games ---")
    assert_eq(len(GAME_PARAMETERS), 21, "Exactly 21 games mapped to parameters")
    assert_eq(len(GAME_BOUNDS), 21, "Exactly 21 games have theoretical bounds")

    # Synthetic event builders for each game
    synthetic_events = {
        "F1": [
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T1", "action_id": "accommodate"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T2", "action_id": "maintain_objective"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T3", "action_id": "accommodate"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T4", "action_id": "clarify"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T5", "action_id": "maintain_objective"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T6", "action_id": "accommodate"}},
        ],
        "F2": [
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T1", "action_id": "act"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T2", "action_id": "clarify"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T3", "action_id": "maintain"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T4", "action_id": "act"}},
        ],
        "F3": [
            {"action": "transition_presented", "data": {"stimulus_id": "F3_T1"}},
            {"action": "baseline_response_selected", "data": {"stimulus_id": "F3_T1", "choice_id": "support_volume"}},
            {"action": "context_shifted", "data": {"stimulus_id": "F3_T1"}},
            {"action": "updated_response_selected", "data": {"stimulus_id": "F3_T1", "choice_id": "attenuate_reverb"}},
            {"action": "transition_completed", "data": {"stimulus_id": "F3_T1"}},

            {"action": "transition_presented", "data": {"stimulus_id": "F3_T2"}},
            {"action": "baseline_response_selected", "data": {"stimulus_id": "F3_T2", "choice_id": "preserve_natural_intimacy"}},
            {"action": "context_shifted", "data": {"stimulus_id": "F3_T2"}},
            {"action": "updated_response_selected", "data": {"stimulus_id": "F3_T2", "choice_id": "boost_intelligibility"}},
            {"action": "transition_completed", "data": {"stimulus_id": "F3_T2"}},

            {"action": "transition_presented", "data": {"stimulus_id": "F3_T3"}},
            {"action": "baseline_response_selected", "data": {"stimulus_id": "F3_T3", "choice_id": "sustain_cadence"}},
            {"action": "context_shifted", "data": {"stimulus_id": "F3_T3"}},
            {"action": "updated_response_selected", "data": {"stimulus_id": "F3_T3", "choice_id": "open_reciprocal_space"}},
            {"action": "transition_completed", "data": {"stimulus_id": "F3_T3"}},
        ],
        "A1": [
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_01", "folder_id": "19th_century"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_02", "folder_id": "poetry"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_03", "folder_id": "20th_century"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_04", "folder_id": "kashmiri"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_05", "folder_id": "chronicle"}},
        ],
        "A2": [
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_01", "action_id": "flag_exception"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_02", "action_id": "file_standard"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_03", "action_id": "flag_exception"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_04", "action_id": "flag_exception"}},
        ],
        "A3": [
            {"action": "record_inspected", "data": {"stimulus_id": "REC_01"}},
            {"action": "discrepancy_toggled", "data": {"stimulus_id": "REC_01", "flagged_state": True}},
            {"action": "record_inspected", "data": {"stimulus_id": "REC_02"}},
            {"action": "record_inspected", "data": {"stimulus_id": "REC_03"}},
            {"action": "discrepancy_toggled", "data": {"stimulus_id": "REC_03", "flagged_state": True}},
            {"action": "record_inspected", "data": {"stimulus_id": "REC_04"}},
            {"action": "record_inspected", "data": {"stimulus_id": "REC_05"}},
            {"action": "discrepancy_toggled", "data": {"stimulus_id": "REC_05", "flagged_state": True}},
            {"action": "verification_finalized", "data": {}},
        ],
        "C1": [
            {"action": "resource_transferred", "data": {"stimulus_id": "C1_R1", "delta": 3}},
            {"action": "allocation_confirmed", "data": {"stimulus_id": "C1_R1"}},
            {"action": "resource_transferred", "data": {"stimulus_id": "C1_R2", "delta": 1}},
            {"action": "allocation_confirmed", "data": {"stimulus_id": "C1_R2"}},
            {"action": "resource_transferred", "data": {"stimulus_id": "C1_R3", "delta": 0}},
            {"action": "allocation_confirmed", "data": {"stimulus_id": "C1_R3"}},
        ],
        "C2": [
            {"action": "placement_confirmed", "data": {"stimulus_id": "C2_R1", "chosen_slot": "SLOT_NORTH_RIGHT"}},
            {"action": "placement_confirmed", "data": {"stimulus_id": "C2_R2", "chosen_slot": "SLOT_PERIMETER_EAST"}},
            {"action": "placement_confirmed", "data": {"stimulus_id": "C2_R3", "chosen_slot": "SLOT_UPPER_GALLERY"}},
        ],
        "C3": [
            {"action": "repair_presented", "data": {"stimulus_id": "C3_R1"}},
            {"action": "breakdown_identified", "data": {"stimulus_id": "C3_R1", "fault_id": "dark_circuit"}},
            {"action": "repair_action_performed", "data": {"stimulus_id": "C3_R1", "repair_action_id": "adjust_conduit"}},
            {"action": "repaired_action_executed", "data": {"stimulus_id": "C3_R1", "execution_action_id": "restore_power"}},

            {"action": "repair_presented", "data": {"stimulus_id": "C3_R2"}},
            {"action": "breakdown_identified", "data": {"stimulus_id": "C3_R2", "fault_id": "cable_jam"}},
            {"action": "repair_action_performed", "data": {"stimulus_id": "C3_R2", "repair_action_id": "reseat_cable"}},
            {"action": "repaired_action_executed", "data": {"stimulus_id": "C3_R2", "execution_action_id": "align_panel"}},

            {"action": "repair_presented", "data": {"stimulus_id": "C3_R3"}},
            {"action": "breakdown_identified", "data": {"stimulus_id": "C3_R3", "fault_id": "shadow_corridor"}},
            {"action": "repair_action_performed", "data": {"stimulus_id": "C3_R3", "repair_action_id": "shift_lantern"}},
            {"action": "repaired_action_executed", "data": {"stimulus_id": "C3_R3", "execution_action_id": "illuminate_path"}},
        ],
        "E1": [
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T1"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T1", "choice": "container_1"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T2"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T2", "choice": "container_2"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T3"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T3", "choice": "container_1"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T4"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T4", "choice": "container_2"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T5"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T5", "choice": "container_2"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T6"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T6", "choice": "container_1"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T7"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T7", "choice": "container_1"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T8"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T8", "choice": "container_2"}},
            {"action": "trial_presented", "data": {"stimulus_id": "E1_T9"}},
            {"action": "tile_sorted", "data": {"stimulus_id": "E1_T9", "choice": "container_1"}},
        ],
        "E2": [
            {"action": "action_selected", "data": {"stimulus_id": "E2_S1", "chosen_action": "clear_workspace"}},
            {"action": "action_selected", "data": {"stimulus_id": "E2_S2", "chosen_action": "standard_sequence"}},
            {"action": "action_selected", "data": {"stimulus_id": "E2_S3", "chosen_action": "stabilize_reference"}},
            {"action": "action_selected", "data": {"stimulus_id": "E2_S4", "chosen_action": "reposition_tray"}},
        ],
        "E3": [
            {"action": "composition_confirmed", "data": {"stimulus_id": "E3_C1", "chosen_action": "standard_layout"}},
            {"action": "composition_confirmed", "data": {"stimulus_id": "E3_C2", "chosen_action": "tonal_adaptation"}},
            {"action": "composition_confirmed", "data": {"stimulus_id": "E3_C3", "chosen_action": "compact_adaptation"}},
        ],
        "Q1": [
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D1", "resource_id": "RES_Q1_ARCHIVE_NOTE"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D1", "choice": "choice_a"}},
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D2", "resource_id": "RES_Q1_MINIATURE_SKETCH"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D2", "choice": "choice_b"}},
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D3", "resource_id": "RES_Q1_PIGMENT_LOG"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D3", "choice": "choice_c"}},
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D4", "resource_id": "RES_Q1_CURATOR_MARGINALIA"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D4", "choice": "choice_d"}},
        ],
        "Q2": [
            {"action": "clue_inspected", "data": {"stimulus_id": "artifact_1", "clue_id": "clue_seal"}},
            {"action": "investigation_finalized", "data": {"stimulus_id": "artifact_1", "attribution_choice": "workshop_a"}},
            {"action": "clue_inspected", "data": {"stimulus_id": "artifact_2", "clue_id": "clue_watermark"}},
            {"action": "investigation_finalized", "data": {"stimulus_id": "artifact_2", "attribution_choice": "workshop_b"}},
            {"action": "clue_inspected", "data": {"stimulus_id": "artifact_3", "clue_id": "clue_pigment"}},
            {"action": "investigation_finalized", "data": {"stimulus_id": "artifact_3", "attribution_choice": "workshop_c"}},
            {"action": "clue_inspected", "data": {"stimulus_id": "artifact_4", "clue_id": "clue_binding"}},
            {"action": "investigation_finalized", "data": {"stimulus_id": "artifact_4", "attribution_choice": "workshop_d"}},
        ],
        "Q3": [
            {"action": "context_requested", "data": {"stimulus_id": "Q3_E1"}},
            {"action": "decision_integrated", "data": {"stimulus_id": "Q3_E1", "choice": "choice_sadiq_rainawari"}},
            {"action": "context_requested", "data": {"stimulus_id": "Q3_E2"}},
            {"action": "decision_integrated", "data": {"stimulus_id": "Q3_E2", "choice": "choice_post_flood_cedar"}},
            {"action": "context_requested", "data": {"stimulus_id": "Q3_E3"}},
            {"action": "decision_integrated", "data": {"stimulus_id": "Q3_E3", "choice": "choice_southern_vakh_shrine"}},
        ],
        "CR1": [
            {"action": "stage_completed", "data": {"stage_id": "CR1_S1", "final_parts": ["M_BRASS_ROD"]}},
            {"action": "stage_completed", "data": {"stage_id": "CR1_S2", "final_parts": ["M_COPPER_WIRE"]}},
        ],
        "CR2": [
            {"action": "initial_strategy_selected", "data": {"episode_id": "CR2_E1", "strategy_id": "dense_cluster"}},
            {"action": "constraint_shifted", "data": {"episode_id": "CR2_E1"}},
            {"action": "strategy_revised", "data": {"episode_id": "CR2_E1", "revised_strategy_id": "split_flow"}},

            {"action": "initial_strategy_selected", "data": {"episode_id": "CR2_E2", "strategy_id": "center_hub"}},
            {"action": "constraint_shifted", "data": {"episode_id": "CR2_E2"}},
            {"action": "strategy_revised", "data": {"episode_id": "CR2_E2", "revised_strategy_id": "perimeter_flow"}},

            {"action": "initial_strategy_selected", "data": {"episode_id": "CR2_E3", "strategy_id": "radial_spread"}},
            {"action": "constraint_shifted", "data": {"episode_id": "CR2_E3"}},
            {"action": "strategy_revised", "data": {"episode_id": "CR2_E3", "revised_strategy_id": "linear_flow"}},
        ],
        "CR3": [
            {"action": "strategy_adapted", "data": {"stimulus_id": "CR3_T1", "final_tool_id": "bone_folder", "final_method": "firm_edge_pass"}},
            {"action": "strategy_adapted", "data": {"stimulus_id": "CR3_T2", "final_tool_id": "sponge_block", "final_method": "mottled_dab"}},
            {"action": "strategy_adapted", "data": {"stimulus_id": "CR3_T3", "final_tool_id": "agate_stone", "final_method": "friction_free_rub"}},
        ],
        "M1": [
            {"action": "unit_completed", "data": {"stimulus_id": "M1_U1"}},
            {"action": "unit_completed", "data": {"stimulus_id": "M1_U2"}},
            {"action": "unit_completed", "data": {"stimulus_id": "M1_U3"}},
        ],
        "M2": [
            {"action": "unit_completed", "data": {"stimulus_id": "M2_U1", "is_mandatory": True}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_U2", "is_mandatory": True}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_U3", "is_mandatory": True}},
            {"action": "continuation_choice_selected", "data": {"choice": "continue"}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O1", "is_mandatory": False}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O2", "is_mandatory": False}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O3", "is_mandatory": False}},
        ],
        "M3": [
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U1", "unit_index": 0}},
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U2", "unit_index": 1}},
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U3", "unit_index": 2}},
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U4", "unit_index": 3}},
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U5", "unit_index": 4}},
            {"action": "unit_completed", "data": {"stimulus_id": "M3_U6", "unit_index": 5}},
            {"action": "conclude_selected", "data": {"unit_index": 5}},
        ]
    }

    # Verify that all 21 games score to 1.0 on optimal input
    for gid in sorted(GAME_PARAMETERS.keys()):
        evs = synthetic_events[gid]
        scored = score_game(gid, evs)
        assert_eq(scored.status, "USABLE", f"{gid} status is USABLE on complete input")
        assert_almost_eq(scored.relative, 1.0, f"{gid} max relative score reaches 1.0 on optimal behavior")
        assert_eq(scored.min, float(GAME_BOUNDS[gid]["min"]), f"{gid} min bound matches")
        assert_eq(scored.max, float(GAME_BOUNDS[gid]["max"]), f"{gid} max bound matches")
        assert_eq(scored.raw, float(GAME_BOUNDS[gid]["max"]), f"{gid} raw score reaches theoretical max")

    # Verify score change when behavior changes
    f1_suboptimal = [
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T1", "action_id": "maintain_objective"}}, # Incorrect (exp accommodate)
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T2", "action_id": "maintain_objective"}}, # Correct (exp maintain_objective)
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T3", "action_id": "clarify"}},            # Incorrect (exp accommodate)
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T4", "action_id": "clarify"}},            # Correct (exp clarify)
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T5", "action_id": "accommodate"}},        # Incorrect (exp maintain_objective)
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T6", "action_id": "accommodate"}},        # Correct (exp accommodate)
    ]
    scored_f1_sub = score_game("F1", f1_suboptimal)
    assert_eq(scored_f1_sub.raw, 3.0, "F1 suboptimal behavior yields exactly 3 points")
    assert_almost_eq(scored_f1_sub.relative, 0.5, "F1 suboptimal relative score is 0.5")

    # Verify irrelevant telemetry does not alter score
    f1_noisy = list(f1_suboptimal) + [
        {"action": "slider_input", "data": {"slider_position_raw": 80}},
        {"action": "slider_input", "data": {"slider_position_raw": 20}},
        {"action": "unrelated_noise", "data": {"some_field": "val"}},
    ]
    scored_f1_noisy = score_game("F1", f1_noisy)
    assert_eq(scored_f1_noisy.raw, 3.0, "F1 score unaffected by irrelevant telemetry")
    assert_almost_eq(scored_f1_noisy.relative, 0.5, "F1 relative score unaffected by irrelevant telemetry")

    # ------------------------------------------------------------------
    # 3. Missingness & Quality States
    # ------------------------------------------------------------------
    print("\n--- 3. Missingness & Integrity States ---")
    scored_skipped = score_game("F1", [])
    assert_eq(scored_skipped.status, "INSUFFICIENT", "Empty events -> INSUFFICIENT")
    assert_true(scored_skipped.relative is None, "INSUFFICIENT game relative score is None")

    scored_partial = score_game("F1", [
        {"action": "trial_submit", "data": {"stimulus_id": "F1_T1", "action_id": "accommodate"}}
    ])
    assert_eq(scored_partial.status, "INSUFFICIENT", "Under minimum observations (<3) -> INSUFFICIENT")

    scored_corrupt = score_game(
        "F1",
        synthetic_events["F1"],
        quality_flags=[{"flag": "seq_conflict", "scope": "session"}]
    )
    assert_eq(scored_corrupt.status, "INVALID", "Integrity seq_conflict -> INVALID")
    assert_true(scored_corrupt.relative is None, "INVALID game relative score is None")

    # ------------------------------------------------------------------
    # 4. Continuous Cross-Method Delta & Relationship
    # ------------------------------------------------------------------
    print("\n--- 4. Continuous Cross-Method Delta & Relationship ---")
    d_zero = compute_cross_method_delta(0.75, 0.75)
    assert_almost_eq(d_zero, 0.0, "Zero Delta when SJT == Game")
    assert_eq(determine_relationship(d_zero, True, "USABLE"), "ALIGNED", "Delta 0.0 -> ALIGNED")

    d_aligned = compute_cross_method_delta(0.80, 0.70)
    assert_almost_eq(d_aligned, 0.10, "Delta 0.10 exact difference")
    assert_eq(determine_relationship(d_aligned, True, "USABLE"), "ALIGNED", "Delta 0.10 <= 0.15 -> ALIGNED")

    d_partly = compute_cross_method_delta(0.70, 0.48)
    assert_almost_eq(d_partly, 0.22, "Delta 0.22 exact difference")
    assert_eq(determine_relationship(d_partly, True, "USABLE"), "PARTLY_ALIGNED", "0.15 < Delta 0.22 <= 0.30 -> PARTLY_ALIGNED")

    d_diff = compute_cross_method_delta(0.90, 0.35)
    assert_almost_eq(d_diff, 0.55, "Delta 0.55 exact difference")
    assert_eq(determine_relationship(d_diff, True, "USABLE"), "DIFFERENT", "Delta 0.55 > 0.30 -> DIFFERENT")

    assert_eq(determine_relationship(None, False, "USABLE"), "NOT_AVAILABLE", "SJT missing -> NOT_AVAILABLE")
    assert_eq(determine_relationship(None, True, "INSUFFICIENT"), "NOT_ENOUGH_EVIDENCE", "Game insufficient -> NOT_ENOUGH_EVIDENCE")

    # ------------------------------------------------------------------
    # 5. Monotonic Confidence Invariant
    # ------------------------------------------------------------------
    print("\n--- 5. Confidence Monotonicity Invariant ---")
    # For identical high-quality evidence (3 usable games, CONSISTENT, clean):
    c_low_delta = determine_confidence(has_sjt=True, n_usable_games=3, consistency="CONSISTENT", delta=0.08, has_critical_flag=False)
    c_med_delta = determine_confidence(has_sjt=True, n_usable_games=3, consistency="CONSISTENT", delta=0.22, has_critical_flag=False)
    c_high_delta = determine_confidence(has_sjt=True, n_usable_games=3, consistency="CONSISTENT", delta=0.45, has_critical_flag=False)

    assert_eq(c_low_delta, "SUBSTANTIAL", "Low Delta (<=0.15) with 3 consistent games -> SUBSTANTIAL")
    assert_eq(c_med_delta, "MODERATE", "Medium Delta (0.15-0.30) capped at MODERATE")
    assert_eq(c_high_delta, "LIMITED", "Large Delta (>0.30) forced to LIMITED")

    # Monotonicity test across numeric spectrum
    deltas = [0.00, 0.05, 0.10, 0.15, 0.16, 0.20, 0.25, 0.30, 0.31, 0.40, 0.60, 0.90, 1.00]
    rank_map = {"LIMITED": 0, "MODERATE": 1, "SUBSTANTIAL": 2}

    prev_rank = 3
    for d in deltas:
        conf = determine_confidence(has_sjt=True, n_usable_games=3, consistency="CONSISTENT", delta=d, has_critical_flag=False)
        r = rank_map[conf]
        assert_true(r <= prev_rank, f"Monotonicity holds at delta={d}: rank {r} <= prev {prev_rank}")
        prev_rank = r

    # Critical flag forces LIMITED
    c_crit = determine_confidence(has_sjt=True, n_usable_games=3, consistency="CONSISTENT", delta=0.05, has_critical_flag=True)
    assert_eq(c_crit, "LIMITED", "Critical flag forces LIMITED regardless of low Delta")

    # ------------------------------------------------------------------
    # 6. End-to-End Session Integration & Persistence
    # ------------------------------------------------------------------
    print("\n--- 6. End-to-End Integration & Persistence ---")
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)

    sid = "test-session-e2e-game-sjt"
    with Session(engine) as db:
        # Create session, identity, consent
        db.add(DBSession(session_id=sid, status="IN_PROGRESS"))
        db.add(DBApplicantIdentity(session_id=sid, full_name="Alice Candidate", email="alice@example.com"))
        db.add(DBConsentRecord(session_id=sid, consent_text_version="1.0", confirmed_18_plus=True))

        # Add 7 SJT responses
        sjt_choices = {
            "S1": "S1A",
            "S2": "S2A",
            "S3": "S3A",
            "S4": "S4A",
            "S5": "S5A",
            "S6": "S6A",
            "S7": "S7A",
        }
        for scn, opt in sjt_choices.items():
            db.add(DBSJTResponse(session_id=sid, scenario_id=scn, option_id=opt))

        # Add all 21 games synthetic events
        seq = 1
        for gid, ev_list in synthetic_events.items():
            for ev in ev_list:
                db.add(DBTelemetryEvent(
                    session_id=sid,
                    seq=seq,
                    segment_id=1,
                    t_ms=float(seq * 500),
                    screen="recruit_game",
                    mini_game=gid,
                    action=ev["action"],
                    data_json=json.dumps(ev["data"])
                ))
                seq += 1

        db.commit()

        # Run evidence integration
        ev_records = integrate_session_evidence(db, sid)
        assert_eq(len(ev_records), 7, "Exactly 7 parameter evidence records generated")

        # Verify DBGameScore records were created
        game_score_rows = db.exec(select(DBGameScore).where(DBGameScore.session_id == sid)).all()
        assert_eq(len(game_score_rows), 21, "All 21 DBGameScore rows persisted to database")
        for gs in game_score_rows:
            assert_eq(gs.status, "USABLE", f"DBGameScore {gs.game_id} status is USABLE")
            assert_true(gs.relative_score is not None, f"DBGameScore {gs.game_id} relative_score present")
            assert_eq(gs.scoring_version, SCORING_VERSION, f"DBGameScore {gs.game_id} version is {SCORING_VERSION}")

        # Check evidence fields
        for ev in ev_records:
            assert_eq(ev.game_status, "USABLE", f"{ev.parameter} game_status is USABLE")
            assert_true(ev.game_relative is not None, f"{ev.parameter} game_relative is present")
            assert_true(ev.sjt_relative is not None, f"{ev.parameter} sjt_relative is present")
            assert_true(ev.cross_method_delta is not None, f"{ev.parameter} cross_method_delta is present")
            assert_true(0.0 <= ev.cross_method_delta <= 1.0, f"{ev.parameter} delta in [0.0, 1.0]")
            assert_true(ev.relationship in ["ALIGNED", "PARTLY_ALIGNED", "DIFFERENT"], f"{ev.parameter} relationship valid")
            assert_true(ev.confidence in ["LIMITED", "MODERATE", "SUBSTANTIAL"], f"{ev.parameter} confidence valid")
            assert_eq(ev.profile_completeness, "COMPLETE", "All 7 parameters usable -> COMPLETE profile")

            # Check Ridge regression deactivated
            assert_true(ev.predicted_sjt_relative is None, f"{ev.parameter} predicted_sjt_relative is None")
            assert_eq(ev.model_version, "historical_deactivated", f"{ev.parameter} model_version marked historical_deactivated")
            assert_eq(ev.prediction_status, "DEACTIVATED_IN_FAVOR_OF_GAME_SJT", f"{ev.parameter} prediction_status deactivated")

        # Test Dossier API response
        class DummyRequest:
            client = None
            query_params = {}

        admin_user = {"email": "admin@alfaaz.test", "role": "admin"}
        dossier = get_session_research_view(sid, request=DummyRequest(), admin_user=admin_user, db=db)
        assert_true("dimensions" in dossier, "Dossier contains dimensions")
        assert_eq(len(dossier["dimensions"]), 7, "Dossier dimensions count is 7")
        assert_eq(dossier["profile_summary"]["model_id"], SCORING_VERSION, f"Profile summary model_id is {SCORING_VERSION}")
        assert_eq(dossier["psychometric_status"]["regression"], "DEACTIVATED", "Psychometric status regression is DEACTIVATED")

        for d in dossier["dimensions"]:
            assert_true(d["game_relative"] is not None, f"Dossier dimension {d['parameter']} has game_relative")
            assert_true(d["cross_method_delta"] is not None, f"Dossier dimension {d['parameter']} has cross_method_delta")
            assert_eq(d["games"]["status"], "USABLE", f"Dossier dimension {d['parameter']} games status is USABLE")

    # ------------------------------------------------------------------
    # 7. Determinism Check (Same Fixture Twice -> Identical Output)
    # ------------------------------------------------------------------
    print("\n--- 7. Determinism Invariant (Identical Input -> Identical Output) ---")
    with Session(engine) as db:
        run1 = score_session_games(db, sid)
        run2 = score_session_games(db, sid)
        for gid in GAME_PARAMETERS.keys():
            assert_eq(run1[gid].raw, run2[gid].raw, f"{gid} determinism check: raw scores match")
            assert_eq(run1[gid].relative, run2[gid].relative, f"{gid} determinism check: relative scores match")
            assert_eq(run1[gid].status, run2[gid].status, f"{gid} determinism check: status matches")

    print(f"\n============================================================")
    print(f"RESULTS: {PASSED_CHECKS} PASSED, {FAILED_CHECKS} FAILED")
    print(f"============================================================")
    return FAILED_CHECKS == 0


if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
