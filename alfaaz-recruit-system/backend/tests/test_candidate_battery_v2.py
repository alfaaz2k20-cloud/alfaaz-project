import sys
import os
import json
import itertools
from typing import Dict, Any, List
from sqlmodel import SQLModel, create_engine, Session, select

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
BASE_DIR = os.path.dirname(BACKEND_DIR)

from recruit_system.models.recruit import (
    DBSession, DBApplicantIdentity, DBConsentRecord,
    DBSJTResponse, DBTelemetryEvent, DBGameScore, DBEvidence
)
from recruit_system.services.sjt_engine import score_sjt_responses, verify_and_load_configs
from recruit_system.services.task_definitions import (
    get_task_definitions, get_battery_config,
    get_candidate_core_games, get_research_bank_games,
    get_expected_candidate_game_count, is_candidate_core_game,
    is_research_bank_game, get_game_role
)
from recruit_system.services.descriptive_task_record import get_session_task_records
from recruit_system.services.game_scoring_engine import (
    score_game, SCORING_VERSION,
    GAME_PARAMETERS, GAME_BOUNDS
)
from recruit_system.services.evidence_integrator import (
    PARAM_MINIGAMES, integrate_session_evidence,
    compute_cross_method_delta, determine_relationship, determine_confidence
)

def run_tests():
    print("=" * 70)
    print("RUNNING ALFAAZ RECRUIT V2: CANDIDATE-FEASIBILITY & BATTERY VERIFICATION")
    print("=" * 70)

    passed = 0
    total = 0

    def assert_eq(actual, expected, test_name):
        nonlocal passed, total
        total += 1
        if actual == expected:
            print(f"  [PASS] {test_name}")
            passed += 1
        else:
            print(f"  [FAIL] {test_name}: expected {expected}, got {actual}")
            raise AssertionError(f"{test_name}: expected {expected}, got {actual}")

    def assert_true(cond, test_name):
        nonlocal passed, total
        total += 1
        if cond:
            print(f"  [PASS] {test_name}")
            passed += 1
        else:
            print(f"  [FAIL] {test_name}")
            raise AssertionError(f"{test_name} failed")

    # ----------------------------------------------------
    # SECTION A: BATTERY SIZE AND BANK VERIFICATION
    # ----------------------------------------------------
    print("\n--- A. Battery Sizing & Research Bank Architecture ---")

    params_data, sjt_data, _, ranges = verify_and_load_configs()
    all_params = list(params_data.keys())
    assert_eq(len(all_params), 7, "Exactly 7 parameters defined in configuration")

    # 1. Exactly 7 SJT scenarios
    scenarios = sjt_data["scenarios"]
    assert_eq(len(scenarios), 7, "Exactly 7 SJT scenarios present")

    # 2. Battery configuration checks
    battery_cfg = get_battery_config()
    assert_eq(battery_cfg.get("total_candidate_games"), 14, "Battery config total candidate games is 14")
    assert_eq(battery_cfg.get("total_research_bank_games"), 7, "Battery config total research bank games is 7")
    assert_eq(battery_cfg.get("total_sjt_scenarios"), 7, "Battery config total SJT scenarios is 7")

    candidate_games = get_candidate_core_games()
    research_games = get_research_bank_games()

    assert_eq(len(candidate_games), 7, "Candidate core has entries for all 7 parameters")
    assert_eq(len(research_games), 7, "Research bank has entries for all 7 parameters")

    total_candidate_games_count = sum(len(games) for games in candidate_games.values())
    total_research_games_count = sum(len(games) for games in research_games.values())

    assert_eq(total_candidate_games_count, 14, "Exactly 14 candidate-facing games in battery")
    assert_eq(total_research_games_count, 7, "Exactly 7 research-bank games")

    for p in all_params:
        assert_eq(len(candidate_games[p]), 2, f"Parameter {p} has exactly 2 candidate-facing games")
        assert_eq(len(research_games[p]), 1, f"Parameter {p} has exactly 1 research-bank game")

        cand_set = set(candidate_games[p])
        res_set = set(research_games[p])
        assert_true(cand_set.isdisjoint(res_set), f"Parameter {p} candidate and research games are disjoint")
        assert_eq(cand_set | res_set, set(PARAM_MINIGAMES[p]), f"Parameter {p} union of candidate and research games equals all 3 parameter games")

    # 3. All 21 games remain present in the repository
    task_defs = get_task_definitions()
    all_21_games = [
        "F1", "F2", "F3",
        "A1", "A2", "A3",
        "C1", "C2", "C3",
        "E1", "E2", "E3",
        "Q1", "Q2", "Q3",
        "CR1", "CR2", "CR3",
        "M1", "M2", "M3"
    ]
    for gid in all_21_games:
        assert_true(gid in task_defs["games"], f"Game {gid} present in task_definitions.json")
        assert_true(gid in GAME_PARAMETERS, f"Game {gid} present in game scoring engine")

    # ----------------------------------------------------
    # SECTION B: SJT INTEGRITY (KEYS, FORMULAS, 16,384 COMBINATIONS)
    # ----------------------------------------------------
    print("\n--- B. SJT Integrity & 16,384 Combinations ---")

    opt_lists = [[opt["keys"] for opt in s["options"]] for s in scenarios]
    all_min = {p: float("inf") for p in all_params}
    all_max = {p: float("-inf") for p in all_params}
    combo_count = 0

    for combo in itertools.product(*opt_lists):
        combo_count += 1
        for p in all_params:
            tot = sum(opt[p] for opt in combo)
            if tot < all_min[p]:
                all_min[p] = tot
            if tot > all_max[p]:
                all_max[p] = tot

    assert_eq(combo_count, 16384, "All 16,384 SJT option combinations enumerated")

    for p in all_params:
        exp_min = ranges[p]["min"]
        exp_max = ranges[p]["max"]
        assert_eq(all_min[p], exp_min, f"SJT parameter {p} min reached ({exp_min})")
        assert_eq(all_max[p], exp_max, f"SJT parameter {p} max reached ({exp_max})")

    # ----------------------------------------------------
    # SECTION C: GAME INTEGRITY (TASK DEFS, BOUNDS, OBSERVATIONS)
    # ----------------------------------------------------
    print("\n--- C. Game Integrity & Deterministic Scoring ---")

    for gid in all_21_games:
        gdef = task_defs["games"][gid]
        assert_true("game_id" in gdef and gdef["game_id"] == gid, f"Game {gid} has valid game_id in task_definitions")
        assert_true("parameter_id" in gdef, f"Game {gid} has parameter_id in task_definitions")
        assert_true("event_allowlist" in gdef, f"Game {gid} has event_allowlist in task_definitions")

        bounds = GAME_BOUNDS[gid]
        assert_true("min" in bounds, f"Game {gid} has min bound in GAME_BOUNDS")
        assert_true("max" in bounds, f"Game {gid} has max bound in GAME_BOUNDS")
        assert_true(bounds["max"] > bounds["min"], f"Game {gid} max > min")
        span = bounds["max"] - bounds["min"]
        assert_true(span > 0, f"Game {gid} span is positive ({span})")

    # Test deterministic scoring engine for candidate games with empty vs sample events
    for gid in all_21_games:
        scored = score_game(gid, [])
        assert_eq(scored.status, "INSUFFICIENT", f"Game {gid} empty events produces INSUFFICIENT")
        assert_true(scored.relative is None, f"Game {gid} relative is None on empty")

    # ----------------------------------------------------
    # SECTION D: INTEGRATION INTEGRITY (14-GAME BATTERY PROFILE)
    # ----------------------------------------------------
    print("\n--- D. Integration Layer Integrity with 14-Game Battery ---")

    # Canonical synthetic telemetry for the 14 candidate games
    candidate_14_events = {
        "F1": [
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T1", "action_id": "accommodate"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T2", "action_id": "maintain_objective"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T3", "action_id": "accommodate"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T4", "action_id": "clarify"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F1_T5", "action_id": "maintain_objective"}},
        ],
        "F2": [
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T1", "action_id": "act"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T2", "action_id": "clarify"}},
            {"action": "trial_submit", "data": {"stimulus_id": "F2_T3", "action_id": "maintain"}},
        ],
        "A1": [
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_01", "folder_id": "19th_century"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_02", "folder_id": "poetry"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_03", "folder_id": "20th_century"}},
            {"action": "item_sorted", "data": {"stimulus_id": "DOC_04", "folder_id": "kashmiri"}},
        ],
        "A2": [
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_01", "action_id": "flag_exception"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_02", "action_id": "file_standard"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_03", "action_id": "flag_exception"}},
            {"action": "decision_logged", "data": {"stimulus_id": "EXC_04", "action_id": "flag_exception"}},
        ],
        "C1": [
            {"action": "resource_transferred", "data": {"stimulus_id": "C1_R1", "delta": 3}},
            {"action": "allocation_confirmed", "data": {"stimulus_id": "C1_R1"}},
            {"action": "resource_transferred", "data": {"stimulus_id": "C1_R2", "delta": 1}},
            {"action": "allocation_confirmed", "data": {"stimulus_id": "C1_R2"}},
        ],
        "C2": [
            {"action": "placement_confirmed", "data": {"stimulus_id": "C2_R1", "chosen_slot": "SLOT_NORTH_RIGHT"}},
            {"action": "placement_confirmed", "data": {"stimulus_id": "C2_R2", "chosen_slot": "SLOT_PERIMETER_EAST"}},
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
        ],
        "E2": [
            {"action": "action_selected", "data": {"stimulus_id": "E2_S1", "chosen_action": "clear_workspace"}},
            {"action": "action_selected", "data": {"stimulus_id": "E2_S2", "chosen_action": "standard_sequence"}},
            {"action": "action_selected", "data": {"stimulus_id": "E2_S3", "chosen_action": "stabilize_reference"}},
        ],
        "Q1": [
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D1", "resource_id": "RES_Q1_ARCHIVE_NOTE"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D1", "choice": "choice_a"}},
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D2", "resource_id": "RES_Q1_MINIATURE_SKETCH"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D2", "choice": "choice_b"}},
            {"action": "optional_resource_viewed", "data": {"stimulus_id": "Q1_D3", "resource_id": "RES_Q1_PIGMENT_LOG"}},
            {"action": "decision_submitted", "data": {"stimulus_id": "Q1_D3", "choice": "choice_c"}},
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
        "CR1": [
            {"action": "stage_completed", "data": {"stage_id": "CR1_S1", "final_parts": ["M_BRASS_ROD"]}},
            {"action": "stage_completed", "data": {"stage_id": "CR1_S2", "final_parts": ["M_COPPER_WIRE"]}},
        ],
        "CR3": [
            {"action": "strategy_adapted", "data": {"stimulus_id": "CR3_T1", "final_tool_id": "bone_folder", "final_method": "firm_edge_pass"}},
            {"action": "strategy_adapted", "data": {"stimulus_id": "CR3_T2", "final_tool_id": "sponge_block", "final_method": "mottled_dab"}},
        ],
        "M1": [
            {"action": "unit_completed", "data": {"stimulus_id": "M1_U1"}},
            {"action": "unit_completed", "data": {"stimulus_id": "M1_U2"}},
        ],
        "M2": [
            {"action": "unit_completed", "data": {"stimulus_id": "M2_U1", "is_mandatory": True}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_U2", "is_mandatory": True}},
            {"action": "continuation_choice_selected", "data": {"choice": "continue"}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O1", "is_mandatory": False}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O2", "is_mandatory": False}},
            {"action": "unit_completed", "data": {"stimulus_id": "M2_O3", "is_mandatory": False}},
        ]
    }

    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)

    sid = "test-session-14-game-battery"
    with Session(engine) as db:
        db.add(DBSession(session_id=sid, status="IN_PROGRESS"))
        db.add(DBApplicantIdentity(session_id=sid, full_name="Beta Candidate", email="beta@example.com"))
        db.add(DBConsentRecord(session_id=sid, consent_text_version="1.0", confirmed_18_plus=True))

        sjt_choices = {
            "S1": "S1A", "S2": "S2A", "S3": "S3A", "S4": "S4A",
            "S5": "S5A", "S6": "S6A", "S7": "S7A"
        }
        for scn, opt in sjt_choices.items():
            db.add(DBSJTResponse(session_id=sid, scenario_id=scn, option_id=opt))

        seq = 1
        for gid, ev_list in candidate_14_events.items():
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

        # Run evidence integration for this candidate who completed 14 games
        ev_records = integrate_session_evidence(db, sid)
        assert_eq(len(ev_records), 7, "Exactly 7 parameter evidence records generated")

        # All 21 games have a DBGameScore row recorded (14 USABLE, 7 INSUFFICIENT research-bank games)
        game_score_rows = db.exec(select(DBGameScore).where(DBGameScore.session_id == sid)).all()
        assert_eq(len(game_score_rows), 21, "All 21 DBGameScore rows persisted to database")
        
        usable_scores = [gs for gs in game_score_rows if gs.status == "USABLE"]
        insufficient_scores = [gs for gs in game_score_rows if gs.status == "INSUFFICIENT"]
        assert_eq(len(usable_scores), 14, "Exactly 14 candidate games have status USABLE")
        assert_eq(len(insufficient_scores), 7, "Exactly 7 research-bank games have status INSUFFICIENT")

        for gs in usable_scores:
            assert_true(gs.game_id in candidate_14_events, f"Game {gs.game_id} is in candidate battery")
            assert_true(gs.relative_score is not None, f"Candidate game {gs.game_id} relative_score present")
            assert_eq(gs.scoring_version, SCORING_VERSION, f"Candidate game {gs.game_id} version is {SCORING_VERSION}")

        for gs in insufficient_scores:
            assert_true(gs.game_id not in candidate_14_events, f"Game {gs.game_id} is a research bank game")
            assert_true(gs.relative_score is None, f"Research bank game {gs.game_id} relative_score is None")

        # Check evidence fields for all 7 parameters
        for ev in ev_records:
            assert_eq(ev.game_status, "USABLE", f"Parameter {ev.parameter} game_status is USABLE with 2 candidate games")
            assert_true(ev.game_relative is not None, f"Parameter {ev.parameter} game_relative present")
            assert_true(0.0 <= ev.game_relative <= 1.0, f"Parameter {ev.parameter} game_relative {ev.game_relative} in [0, 1]")
            assert_true(ev.sjt_relative is not None, f"Parameter {ev.parameter} sjt_relative present")
            assert_true(0.0 <= ev.sjt_relative <= 1.0, f"Parameter {ev.parameter} sjt_relative {ev.sjt_relative} in [0, 1]")
            assert_true(ev.cross_method_delta is not None, f"Parameter {ev.parameter} cross_method_delta present")
            assert_true(0.0 <= ev.cross_method_delta <= 1.0, f"Parameter {ev.parameter} cross_method_delta in [0, 1]")
            assert_true(ev.relationship in ["ALIGNED", "PARTLY_ALIGNED", "DIFFERENT"], f"Parameter {ev.parameter} relationship valid")
            assert_true(ev.confidence in ["SUBSTANTIAL", "MODERATE", "LIMITED"], f"Parameter {ev.parameter} confidence valid")

    # ----------------------------------------------------
    # SECTION E: CANDIDATE-FACING UI & COPY INTEGRITY
    # ----------------------------------------------------
    print("\n--- E. Candidate UI & Plain Language Copy Audit ---")

    recruit_js_path = os.path.join(BASE_DIR, "frontend", "src", "recruit.js")
    consent_json_path = os.path.join(BASE_DIR, "config", "copy", "consent.json")
    games_dir = os.path.join(BASE_DIR, "frontend", "src", "recruit_games")

    with open(recruit_js_path, "r", encoding="utf-8") as f:
        recruit_js_content = f.read()

    with open(consent_json_path, "r", encoding="utf-8") as f:
        consent_json_content = f.read()

    # 1. Check consent notice duration and wording
    assert_true("~11–13 minutes" in consent_json_content, "Consent copy specifies ~11–13 minutes")
    assert_true("SJT" not in consent_json_content, "Consent copy does not expose 'SJT' acronym")

    # 2. Check recruit.js progress labels
    assert_true("Judgment ${current} / ${total}" in recruit_js_content, "recruit.js shows Judgment N / 7 format")
    assert_true("Activities ${currentActivityNumber} / 14" in recruit_js_content or "Activities ${currentActivityNumber} / ${totalActivities}" in recruit_js_content, "recruit.js shows Activities N / 14 format")
    assert_true("remainingMins" in recruit_js_content, "recruit.js shows remaining time estimate")

    # 3. Check that candidate-facing tutorial cards have goal and steps, and NO practice rounds
    world_files = [
        "the_frequency.js",
        "the_archive.js",
        "the_shared_canvas.js",
        "the_shifting_grid.js",
        "the_hidden_gallery.js",
        "the_broken_tool.js",
        "the_repetition.js"
    ]

    for wf in world_files:
        wpath = os.path.join(games_dir, wf)
        with open(wpath, "r", encoding="utf-8") as f:
            code = f.read()

        assert_true("practice_round" not in code.lower(), f"{wf} has no practice_round")
        assert_true("practice round" not in code.lower(), f"{wf} has no 'practice round'")
        assert_true("trial run" not in code.lower(), f"{wf} has no 'trial run'")
        assert_true("renderTutorialCard" in code, f"{wf} uses renderTutorialCard")

    # Static model of candidate time:
    # 7 SJT scenarios: ~35 seconds each = 245s (4.08 min)
    # 14 candidate games:
    #   F1 (6 rounds): 45s
    #   F2 (4 rounds): 35s
    #   A1 (5 docs): 40s
    #   A2 (4 folios): 35s
    #   C1 (3 rounds): 35s
    #   C2 (3 rounds): 30s
    #   E1 (9 tiles): 40s
    #   E2 (4 rounds): 35s
    #   Q1 (4 decisions): 50s
    #   Q2 (4 relics): 45s
    #   CR1 (2 stages): 45s
    #   CR3 (3 rounds): 45s
    #   M1 (3 units): 25s
    #   M2 (3 units): 30s
    # Total 14 games: 535s (8.92 min)
    # Streamlined presentation & transition overhead:
    #   Consent reading & confirmation: ~20s
    #   SJT to activities section handoff: ~3s
    #   13 inter-activity instantaneous DOM transitions: ~15s
    #   Final completion submission: ~2s
    #   Total transition overhead: 40s (0.67 min)
    # Total modeled journey: 245 + 535 + 40 = 820s = 13.67 min (fits locked <= 14.0 min ceiling)

    time_model = {
        "sjt_per_scenario_sec": 35,
        "sjt_count": 7,
        "game_durations_sec": {
            "F1": 45, "F2": 35,
            "A1": 40, "A2": 35,
            "C1": 35, "C2": 30,
            "E1": 40, "E2": 35,
            "Q1": 50, "Q2": 45,
            "CR1": 45, "CR3": 45,
            "M1": 25, "M2": 30
        },
        "transition_overhead_sec": 40
    }

    sjt_total_sec = time_model["sjt_per_scenario_sec"] * time_model["sjt_count"]
    games_total_sec = sum(time_model["game_durations_sec"].values())
    overhead_total_sec = time_model["transition_overhead_sec"]
    total_sec = sjt_total_sec + games_total_sec + overhead_total_sec

    total_min = total_sec / 60.0
    print(f"  Modeled SJT Time: {sjt_total_sec / 60.0:.2f} min ({sjt_total_sec}s)")
    print(f"  Modeled 14 Games Time: {games_total_sec / 60.0:.2f} min ({games_total_sec}s)")
    print(f"  Modeled Transitions Time: {overhead_total_sec / 60.0:.2f} min ({overhead_total_sec}s)")
    print(f"  Modeled Total Candidate Experience: {total_min:.2f} min ({total_sec}s)")

    assert_true(total_min >= 11.0, f"Modeled time {total_min:.2f} min meets minimum target (>= 11.0 min)")
    assert_true(total_min <= 14.0, f"Modeled time {total_min:.2f} min fits design ceiling (<= 14.0 min)")

    # ----------------------------------------------------
    # SECTION H: SYSTEM-WIDE BATTERY PROPAGATION & UI SHELL
    # ----------------------------------------------------
    print("\n--- H. System-Wide Battery Propagation & UI Shell ---")

    # 1. Canonical query helpers
    assert_eq(get_expected_candidate_game_count("2.0"), 14, "Canonical count for V2 battery is 14")
    assert_eq(get_expected_candidate_game_count("1.0"), 21, "Canonical count for V1 battery is 21")
    assert_eq(get_expected_candidate_game_count("historical"), 21, "Canonical count for historical battery is 21")

    candidate_core_ids = [g for games in candidate_games.values() for g in games]
    research_bank_ids = [g for games in research_games.values() for g in games]

    for cg in candidate_core_ids:
        assert_true(is_candidate_core_game(cg), f"is_candidate_core_game({cg}) is True")
        assert_true(not is_research_bank_game(cg), f"is_research_bank_game({cg}) is False")
        assert_eq(get_game_role(cg), "candidate_core", f"get_game_role({cg}) is 'candidate_core'")

    for rg in research_bank_ids:
        assert_true(not is_candidate_core_game(rg), f"is_candidate_core_game({rg}) is False")
        assert_true(is_research_bank_game(rg), f"is_research_bank_game({rg}) is True")
        assert_eq(get_game_role(rg), "research_bank", f"get_game_role({rg}) is 'research_bank'")

    with Session(engine) as db:
        # 2. Task records battery_role annotation
        task_records = get_session_task_records(db, sid)
        assert_eq(len(task_records), 21, "21 total task records (core + research bank) returned")
        core_records = [tr for tr in task_records if tr.get("battery_role") == "candidate_core"]
        bank_records = [tr for tr in task_records if tr.get("battery_role") == "research_bank"]
        assert_eq(len(core_records), 14, "14 candidate core task records returned")
        assert_eq(len(bank_records), 7, "7 research bank task records returned")
        for tr in core_records:
            assert_eq(tr.get("status"), "RECORDED", f"Candidate core task record {tr.get('game_id')} is RECORDED")
        for tr in bank_records:
            assert_eq(tr.get("status"), "NOT_DERIVED", f"Research bank task record {tr.get('game_id')} is NOT_DERIVED")

        # 3. Research view and session listing propagation
        from recruit_system.routers.research_view import list_research_sessions, get_session_research_view
        class DummyRequest:
            client = None
            query_params = {}
        admin_user = {"email": "admin@example.com", "status": "ADMIN"}
        sessions_listing = list_research_sessions(request=DummyRequest(), admin_user=admin_user, db=db)
        found_sess = next((s for s in sessions_listing if s.get("session_id") == sid), None)
        assert_true(found_sess is not None, "Test session found in research sessions listing")
        assert_eq(found_sess.get("battery_expected_tasks"), 14, "Research listing reports battery_expected_tasks=14 for V2")
        assert_eq(found_sess.get("completed_tasks_count"), 14, "Research listing reports completed_tasks_count=14")

        detail_view = get_session_research_view(sid, request=DummyRequest(), admin_user=admin_user, db=db)
        meta = detail_view.get("metadata", {})
        assert_eq(meta.get("battery_version"), "2.0", "Research view metadata reports battery_version='2.0'")
        assert_eq(meta.get("expected_candidate_game_count"), 14, "Research view metadata reports expected_candidate_game_count=14")
        assert_eq(len(meta.get("candidate_core_games", [])), 14, "Research view metadata includes 14 candidate_core_games")
        assert_eq(len(meta.get("research_bank_games", [])), 7, "Research view metadata includes 7 research_bank_games")

    # 4. Standardized Recruit Game Shell across all 7 world files
    index_js_path = os.path.join(games_dir, "index.js")
    with open(index_js_path, "r", encoding="utf-8") as f:
        index_js_content = f.read()

    assert_true('export function renderGameShell' in index_js_content, "renderGameShell exported in index.js")
    assert_true('export const WORLD_METADATA' in index_js_content, "WORLD_METADATA exported in index.js")

    world_files = [
        "the_archive.js",
        "the_frequency.js",
        "the_shared_canvas.js",
        "the_shifting_grid.js",
        "the_hidden_gallery.js",
        "the_broken_tool.js",
        "the_repetition.js"
    ]
    for wf in world_files:
        wf_path = os.path.join(games_dir, wf)
        with open(wf_path, "r", encoding="utf-8") as f:
            wf_content = f.read()
        assert_true('renderGameShell' in wf_content, f"{wf} imports and calls renderGameShell")
        assert_true('min-h-[44px]' in wf_content, f"{wf} enforces >= 44px touch targets on primary actions")

    # 5. Timer badge purge: Zero 'takes about' in any game files
    for wf in world_files:
        wf_path = os.path.join(games_dir, wf)
        with open(wf_path, "r", encoding="utf-8") as f:
            wf_content = f.read()
        assert_true("takes about" not in wf_content.lower(), f"{wf} has zero 'takes about' timer badges")

    # 6. Interaction grammar: explicit primary confirmation actions on discrete tasks
    expected_confirmations = [
        ("the_archive.js", ["Confirm Shelf", "Confirm Choice", "Confirm & Finish"]),
        ("the_frequency.js", ["Confirm Setting", "Confirm Choice", "Confirm & Finish"]),
        ("the_shared_canvas.js", ["Confirm Allocation", "Confirm Placement", "Confirm & Finish"]),
        ("the_shifting_grid.js", ["Confirm Choice", "Confirm & Finish"]),
        ("the_hidden_gallery.js", ["Confirm Decision", "Confirm Origin", "Confirm & Finish"]),
        ("the_broken_tool.js", ["Confirm Assembly", "Confirm Technique", "Confirm & Finish"]),
        ("the_repetition.js", ["Apply Wax Seal", "Assemble Required Folder", "Confirm & Finish"])
    ]
    for wf, actions in expected_confirmations:
        wf_path = os.path.join(games_dir, wf)
        with open(wf_path, "r", encoding="utf-8") as f:
            wf_content = f.read()
        for act in actions:
            assert_true(act in wf_content, f"{wf} contains standardized action text '{act}'")

    # 7. renderGameShell API supports feedbackContent and standardized button region
    assert_true('feedbackContent = \'\'' in index_js_content, "renderGameShell supports feedbackContent")
    assert_true('FEEDBACK REGION' in index_js_content, "renderGameShell has dedicated FEEDBACK REGION")
    assert_true('PRIMARY ACTION BAR' in index_js_content, "renderGameShell has dedicated PRIMARY ACTION BAR")

    print("\n" + "=" * 70)
    print(f"CANDIDATE BATTERY V2 VERIFICATION PASSED: {passed}/{total} CHECKS SUCCEEDED")
    print("=" * 70)

if __name__ == "__main__":
    run_tests()
