import json
from dataclasses import dataclass, asdict
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timezone
from sqlmodel import Session, select
from recruit_system.models.recruit import DBTelemetryEvent, DBDataQualityFlag, DBSession, DBGameScore
from recruit_system.services.task_definitions import (
    get_task_definitions,
    get_stimulus_ground_truth,
    reconstruct_f3_context_state,
    reconstruct_a3_inspection_state,
    reconstruct_c1_allocation_state,
    reconstruct_c3_repair_state,
    reconstruct_e1_sorting_state,
    reconstruct_e2_recovery_state,
    reconstruct_e3_adaptation_state,
    reconstruct_q1_information_seeking_state,
    reconstruct_q2_investigation_state,
    reconstruct_q3_integration_state,
    reconstruct_cr1_construction_state,
    reconstruct_cr2_reframing_state,
    reconstruct_cr3_affordance_state,
    reconstruct_m1_diligence_state,
    reconstruct_m2_continuation_state,
    reconstruct_m3_persistence_state
)

SCORING_VERSION = "game_sjt_scoring_v1"

GAME_PARAMETERS = {
    "F1": "empathy",
    "F2": "empathy",
    "F3": "empathy",
    "A1": "conscientiousness",
    "A2": "conscientiousness",
    "A3": "conscientiousness",
    "C1": "collaborative_spirit",
    "C2": "collaborative_spirit",
    "C3": "collaborative_spirit",
    "E1": "emotional_agility",
    "E2": "emotional_agility",
    "E3": "emotional_agility",
    "Q1": "curiosity",
    "Q2": "curiosity",
    "Q3": "curiosity",
    "CR1": "creative_initiative",
    "CR2": "creative_initiative",
    "CR3": "creative_initiative",
    "M1": "motivation",
    "M2": "motivation",
    "M3": "motivation"
}

GAME_BOUNDS = {
    "F1": {"min": 0, "max": 5, "min_obs": 2},
    "F2": {"min": 0, "max": 3, "min_obs": 1},
    "F3": {"min": 0, "max": 2, "min_obs": 1},
    "A1": {"min": 0, "max": 4, "min_obs": 2},
    "A2": {"min": 0.0, "max": 1.0, "min_obs": 3},
    "A3": {"min": 0, "max": 4, "min_obs": 2},
    "C1": {"min": 0, "max": 2, "min_obs": 1},
    "C2": {"min": 0, "max": 2, "min_obs": 1},
    "C3": {"min": 0, "max": 2, "min_obs": 1},
    "E1": {"min": 0, "max": 8, "min_obs": 4},
    "E2": {"min": 0, "max": 3, "min_obs": 1},
    "E3": {"min": 0, "max": 2, "min_obs": 1},
    "Q1": {"min": 0, "max": 3, "min_obs": 2},
    "Q2": {"min": 0, "max": 3, "min_obs": 1},
    "Q3": {"min": 0, "max": 2, "min_obs": 1},
    "CR1": {"min": 0, "max": 2, "min_obs": 2},
    "CR2": {"min": 0, "max": 2, "min_obs": 1},
    "CR3": {"min": 0, "max": 2, "min_obs": 1},
    "M1": {"min": 0, "max": 2, "min_obs": 1},
    "M2": {"min": 0, "max": 2, "min_obs": 2},
    "M3": {"min": 0, "max": 2, "min_obs": 2}
}


@dataclass
class ScoredGame:
    game_id: str
    parameter: str
    raw: Optional[float]
    min: Optional[float]
    max: Optional[float]
    span: Optional[float]
    num: Optional[float]
    relative: Optional[float]
    band: Optional[str]
    status: str  # USABLE, INSUFFICIENT, INVALID
    observation_count: int
    flags: List[str]
    scoring_version: str
    task_def_version: str

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


def _parse_ev_data(ev: Any) -> Dict[str, Any]:
    data_json = getattr(ev, "data_json", None)
    if data_json:
        try:
            return json.loads(data_json)
        except Exception:
            return {}
    if isinstance(ev, dict):
        return ev.get("data", {})
    return {}


def _get_ev_action(ev: Any) -> Optional[str]:
    return getattr(ev, "action", None) or (ev.get("action") if isinstance(ev, dict) else None)


def _classify_band(relative_score: Optional[float]) -> Optional[str]:
    if relative_score is None:
        return None
    if relative_score >= 0.67:
        return "HIGH"
    elif relative_score <= 0.33:
        return "LOW"
    return "MODERATE"


def score_f1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    F1 Cue Detection: 6 trials.
    Matches candidate choice (accommodate, maintain_objective, clarify)
    with target condition_type.
    """
    defs = get_task_definitions(task_def_version).get("games", {}).get("F1", {})
    trials = defs.get("trials", [])
    expected_map = {t["stimulus_id"]: t.get("condition_type") for t in trials}

    submits = {}
    for ev in events:
        act = _get_ev_action(ev)
        if act in ["trial_submit", "dialogue_selected"]:
            data = _parse_ev_data(ev)
            s_id = data.get("stimulus_id")
            choice = data.get("action_id") or data.get("choice_id") or data.get("choice")
            if s_id and choice:
                submits[s_id] = choice

    raw_score = 0
    for s_id, choice in submits.items():
        exp = expected_map.get(s_id)
        if exp and choice == exp:
            raw_score += 1

    return raw_score, len(submits), []


def score_f2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    F2 Ambiguous Cue: 4 trials.
    Matches candidate action (act, clarify, maintain) with condition_type.
    """
    defs = get_task_definitions(task_def_version).get("games", {}).get("F2", {})
    trials = defs.get("trials", [])
    expected_map = {t["stimulus_id"]: t.get("condition_type") for t in trials}

    submits = {}
    for ev in events:
        act = _get_ev_action(ev)
        if act in ["trial_submit", "inquiry_selected"]:
            data = _parse_ev_data(ev)
            s_id = data.get("stimulus_id")
            choice = data.get("action_id") or data.get("choice_id") or data.get("choice")
            if s_id and choice:
                submits[s_id] = choice

    raw_score = 0
    for s_id, choice in submits.items():
        exp = expected_map.get(s_id)
        if exp and choice == exp:
            raw_score += 1

    return raw_score, len(submits), []


def score_f3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    F3 Context Change: 3 transitions.
    Evaluates adapted response against shifted context appropriate option.
    """
    targets = {
        "F3_T1": "attenuate_reverb",
        "F3_T2": "boost_intelligibility",
        "F3_T3": "open_reciprocal_space"
    }
    state = reconstruct_f3_context_state(events)
    transitions = state.get("transitions", {})

    raw_score = 0
    completed = 0
    for s_id, t_info in transitions.items():
        upd = t_info.get("updated_response")
        if upd:
            completed += 1
            if upd == targets.get(s_id):
                raw_score += 1

    return raw_score, completed, []


def score_a1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    A1 Classification: 5 items.
    Checks destination folder against target_folder.
    """
    defs = get_task_definitions(task_def_version).get("games", {}).get("A1", {})
    trials = defs.get("trials", [])
    target_map = {t["stimulus_id"]: t.get("target_folder") for t in trials}

    sorted_items = {}
    for ev in events:
        act = _get_ev_action(ev)
        if act in ["document_filed", "item_sorted"]:
            data = _parse_ev_data(ev)
            s_id = data.get("stimulus_id") or data.get("item_id")
            folder = data.get("target_folder") or data.get("folder_id") or data.get("choice")
            if s_id and folder:
                sorted_items[s_id] = folder

    raw_score = 0
    for s_id, folder in sorted_items.items():
        target = target_map.get(s_id)
        if target and folder == target:
            raw_score += 1

    return raw_score, len(sorted_items), []


def score_a2(events: List[Any], task_def_version: str = "2.0") -> Tuple[float, int, List[str]]:
    """
    A2 Exception Handling: 4 trials (3 true exceptions, 1 clean control).
    True Precision: TP / (TP + FP)
    - TP: true exception correctly flagged as exception
    - FP: clean control incorrectly flagged as exception
    - If total_flagged (TP + FP) == 0: precision = 0.0
    - Requires genuine_evaluated >= 3; otherwise insufficient observations.
    """
    defs = get_task_definitions(task_def_version).get("games", {}).get("A2", {})
    trials = defs.get("trials", [])
    expected_map = {t["stimulus_id"]: t for t in trials}

    decisions = {}
    for ev in events:
        act = _get_ev_action(ev)
        if act in ["decision_logged", "exception_resolved", "item_sorted"]:
            data = _parse_ev_data(ev)
            s_id = data.get("stimulus_id")
            action_id = data.get("action_id") or data.get("action") or data.get("chosen_action")
            is_exc = data.get("is_exception")
            flagged = data.get("flagged")

            if s_id and (action_id or is_exc is not None or flagged is not None):
                if action_id:
                    chosen = action_id
                elif is_exc is True or flagged is True:
                    chosen = "flag_exception"
                else:
                    chosen = "file_standard"
                if s_id not in decisions:
                    decisions[s_id] = chosen

    genuine_evaluated = 0
    true_positives = 0
    false_positives = 0

    for s_id, chosen in decisions.items():
        trial_def = expected_map.get(s_id, {})
        cond_type = trial_def.get("condition_type")
        exp = trial_def.get("expected_action")

        if cond_type == "true_exception" or exp == "flag_exception":
            genuine_evaluated += 1
            if chosen == "flag_exception" or (exp and chosen == exp):
                true_positives += 1
        elif cond_type == "clean_control" or exp == "file_standard":
            if chosen == "flag_exception" or (exp and chosen != exp):
                false_positives += 1

    flags = []
    if genuine_evaluated < 3:
        flags.append("insufficient_observations")

    total_flagged = true_positives + false_positives
    if total_flagged > 0:
        precision = round(true_positives / total_flagged, 4)
    else:
        precision = 0.0

    obs_count = genuine_evaluated if genuine_evaluated < 3 else len(decisions)
    return precision, obs_count, flags


def score_a3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    A3 Quality Control: 5 ledger records.
    raw_score = true_positives + true_negatives
    """
    state = reconstruct_a3_inspection_state(events)
    tp = state.get("true_positives", 0)
    tn = state.get("true_negatives", 0)
    inspected = state.get("inspected_count", 0)
    raw_score = tp + tn
    return raw_score, inspected, []


def score_c1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    C1 Resource Cooperation: 3 rounds.
    R1 (deficit): transfer >= 2
    R2 (balanced): transfer in [0, 1]
    R3 (self deficit): transfer == 0
    """
    state = reconstruct_c1_allocation_state(events)
    rounds = state.get("rounds", {})
    raw_score = 0
    completed = 0

    if "C1_R1" in rounds and rounds["C1_R1"].get("is_confirmed"):
        completed += 1
        if rounds["C1_R1"].get("transferred_count", 0) >= 2:
            raw_score += 1

    if "C1_R2" in rounds and rounds["C1_R2"].get("is_confirmed"):
        completed += 1
        if rounds["C1_R2"].get("transferred_count", 0) in [0, 1]:
            raw_score += 1

    if "C1_R3" in rounds and rounds["C1_R3"].get("is_confirmed"):
        completed += 1
        if rounds["C1_R3"].get("transferred_count", 0) == 0:
            raw_score += 1

    return raw_score, completed, []


def score_c2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    C2 Coordination: 3 rounds.
    Checks if chosen placement avoids crowding / conflict.
    """
    coordinated_slots = {
        "C2_R1": {"SLOT_NORTH_RIGHT", "SLOT_BOTTOM_CENTER"},
        "C2_R2": {"SLOT_PERIMETER_EAST", "SLOT_PERIMETER_WEST"},
        "C2_R3": {"SLOT_UPPER_GALLERY", "SLOT_MID_SIDE"}
    }
    idx_to_stim = {0: "C2_R1", 1: "C2_R2", 2: "C2_R3"}

    placements = {}
    for ev in events:
        act = _get_ev_action(ev)
        if act in ["placement_confirmed", "placement_attempted"]:
            data = _parse_ev_data(ev)
            s_id = data.get("stimulus_id")
            if not s_id and "round_index" in data and data["round_index"] in idx_to_stim:
                s_id = idx_to_stim[data["round_index"]]
            slot = data.get("chosen_slot") or data.get("slot_id")
            if s_id and slot:
                placements[s_id] = slot

    raw_score = 0
    for s_id, slot in placements.items():
        if slot in coordinated_slots.get(s_id, set()):
            raw_score += 1

    return raw_score, len(placements), []


def score_c3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    C3 Collaboration Repair: 3 breakdown episodes.
    raw_score = completed_count of identified and executed repairs.
    """
    state = reconstruct_c3_repair_state(events)
    completed = state.get("completed_count", 0)
    return completed, completed, []


def score_e1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    E1 Rule Shift: 9 sorting trials.
    raw_score = correct_count across rule shifts.
    """
    state = reconstruct_e1_sorting_state(events)
    correct = state.get("correct_count", 0)
    completed = state.get("trials_completed", 0)
    return correct, completed, []


def score_e2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    E2 Setback Recovery: 4 sequences.
    raw_score = constructive_count.
    """
    state = reconstruct_e2_recovery_state(events)
    constructive = state.get("constructive_count", 0)
    completed = state.get("completed_count", 0)
    return constructive, completed, []


def score_e3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    E3 Changing Conditions: 3 environmental transitions.
    raw_score = aligned_count.
    """
    state = reconstruct_e3_adaptation_state(events)
    aligned = state.get("aligned_count", 0)
    completed = state.get("completed_count", 0)
    return aligned, completed, []


def score_q1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    Q1 Optional Discovery: 4 decisions with optional alcoves.
    raw_score = useful_resources_viewed_count (0 to 4).
    """
    state = reconstruct_q1_information_seeking_state(events)
    useful = state.get("useful_resources_viewed_count", 0)
    completed = state.get("completed_count", 0)
    return min(4, useful), completed, []


def score_q2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    Q2 Mystery Exploration: 4 artifacts with optional clues.
    raw_score = number of artifacts where candidate inspected optional clues (0 to 4).
    """
    state = reconstruct_q2_investigation_state(events)
    clues_map = state.get("clues_by_relic", {})
    investigated = sum(1 for clues in clues_map.values() if len(clues) > 0)
    completed = state.get("completed_count", 0)
    return min(4, investigated), completed, []


def score_q3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    Q3 Information Integration: 3 synthesis episodes.
    raw_score = integrated_correctly_count (target-aligned decisions).
    """
    state = reconstruct_q3_integration_state(events)
    aligned = state.get("integrated_correctly_count", 0)
    completed = state.get("completed_count", 0)
    return aligned, completed, []


def score_cr1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    CR1 Open Construction: 2 stages.
    raw_score = valid_solution_count (valid structural assemblies).
    """
    state = reconstruct_cr1_construction_state(events)
    val_count = state.get("valid_solution_count", 0)
    completed = state.get("completed_count", 0)
    return min(2, val_count), completed, []


def score_cr2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    CR2 Constraint Shift: 3 episodes.
    raw_score = target_aligned_count of reframing adjustments.
    """
    state = reconstruct_cr2_reframing_state(events)
    aligned = state.get("target_aligned_count", 0)
    completed = state.get("completed_count", 0)
    return aligned, completed, []


def score_cr3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    CR3 Unspecified Tool Use: 3 trials.
    raw_score = aligned_count of tool affordances matching required action.
    """
    state = reconstruct_cr3_affordance_state(events)
    aligned = state.get("aligned_count", 0)
    completed = state.get("completed_count", 0)
    return aligned, completed, []


def score_m1(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    M1 Minimum Completed: 3 mandatory diligence units.
    raw_score = units completed (0 to 3).
    """
    state = reconstruct_m1_diligence_state(events)
    completed = state.get("completed_count", 0)
    return min(3, completed), completed, []


def score_m2(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    M2 Optional Continuation: 3 mandatory + up to 3 optional units.
    raw_score = optional_completed_count (0 to 3 voluntary units completed).
    """
    state = reconstruct_m2_continuation_state(events)
    opt_count = state.get("optional_completed_count", 0)
    mand_count = state.get("mandatory_completed_count", 0)
    # Require mandatory completion first
    if mand_count < 2:
        return 0, mand_count, ["mandatory_incomplete"]
    return min(3, opt_count), mand_count + opt_count, []


def score_m3(events: List[Any], task_def_version: str = "2.0") -> Tuple[int, int, List[str]]:
    """
    M3 Persistence Under Reduced Feedback: 3 mandatory + up to 3 voluntary units.
    raw_score = voluntary_completed_count (0 to 3 voluntary units persevered).
    """
    state = reconstruct_m3_persistence_state(events)
    vol_count = state.get("voluntary_completed_count", 0)
    mand_count = state.get("mandatory_completed_count", 0)
    if mand_count < 2:
        return 0, mand_count, ["mandatory_incomplete"]
    return min(3, vol_count), mand_count + vol_count, []


SCORERS = {
    "F1": score_f1,
    "F2": score_f2,
    "F3": score_f3,
    "A1": score_a1,
    "A2": score_a2,
    "A3": score_a3,
    "C1": score_c1,
    "C2": score_c2,
    "C3": score_c3,
    "E1": score_e1,
    "E2": score_e2,
    "E3": score_e3,
    "Q1": score_q1,
    "Q2": score_q2,
    "Q3": score_q3,
    "CR1": score_cr1,
    "CR2": score_cr2,
    "CR3": score_cr3,
    "M1": score_m1,
    "M2": score_m2,
    "M3": score_m3,
}


def score_game(
    game_id: str,
    events: List[Any],
    quality_flags: Optional[List[Any]] = None,
    task_def_version: str = "2.0"
) -> ScoredGame:
    """
    Scores a single game deterministically from accepted primitive events.
    Enforces minimum observations and integrity validation.
    """
    parameter = GAME_PARAMETERS.get(game_id, "unknown")
    bounds = GAME_BOUNDS.get(game_id, {"min": 0, "max": 1, "min_obs": 1})
    g_min = bounds["min"]
    g_max = bounds["max"]
    g_span = g_max - g_min
    min_obs = bounds["min_obs"]

    flags: List[str] = []

    # 1. Check integrity flags
    if quality_flags:
        for qf in quality_flags:
            flag_name = getattr(qf, "flag", None) or (qf.get("flag") if isinstance(qf, dict) else "")
            scope = getattr(qf, "scope", None) or (qf.get("scope") if isinstance(qf, dict) else "")
            if flag_name in ["seq_conflict", "events_cap_reached"]:
                return ScoredGame(
                    game_id=game_id,
                    parameter=parameter,
                    raw=None,
                    min=float(g_min),
                    max=float(g_max),
                    span=float(g_span),
                    num=None,
                    relative=None,
                    band=None,
                    status="INVALID",
                    observation_count=len(events),
                    flags=[flag_name],
                    scoring_version=SCORING_VERSION,
                    task_def_version=task_def_version
                )
            if scope == game_id and flag_name in ["seq_gap", "invalid_timing"]:
                flags.append(flag_name)

    # 2. Check for game-level interruption
    has_interruption = any(_get_ev_action(e) == "interrupted" for e in events)
    if has_interruption:
        return ScoredGame(
            game_id=game_id,
            parameter=parameter,
            raw=None,
            min=float(g_min),
            max=float(g_max),
            span=float(g_span),
            num=None,
            relative=None,
            band=None,
            status="INSUFFICIENT",
            observation_count=len(events),
            flags=["interrupted"],
            scoring_version=SCORING_VERSION,
            task_def_version=task_def_version
        )

    # 3. Check presence of events
    if not events:
        return ScoredGame(
            game_id=game_id,
            parameter=parameter,
            raw=None,
            min=float(g_min),
            max=float(g_max),
            span=float(g_span),
            num=None,
            relative=None,
            band=None,
            status="INSUFFICIENT",
            observation_count=0,
            flags=["no_events"],
            scoring_version=SCORING_VERSION,
            task_def_version=task_def_version
        )

    # 4. Invoke deterministic scorer
    scorer_fn = SCORERS.get(game_id)
    if not scorer_fn:
        return ScoredGame(
            game_id=game_id,
            parameter=parameter,
            raw=None,
            min=float(g_min),
            max=float(g_max),
            span=float(g_span),
            num=None,
            relative=None,
            band=None,
            status="INSUFFICIENT",
            observation_count=0,
            flags=["scorer_not_found"],
            scoring_version=SCORING_VERSION,
            task_def_version=task_def_version
        )

    norm_events = []
    for ev in events:
        if isinstance(ev, dict):
            ev_copy = dict(ev)
            if "mini_game" not in ev_copy:
                ev_copy["mini_game"] = game_id
            if "t_ms" not in ev_copy:
                ev_copy["t_ms"] = 0.0
            norm_events.append(ev_copy)
        else:
            norm_events.append(ev)

    raw_val, obs_count, scorer_flags = scorer_fn(norm_events)
    flags.extend(scorer_flags)

    # 5. Check observation sufficiency
    if obs_count < min_obs or "mandatory_incomplete" in flags or "insufficient_observations" in flags:
        if "insufficient_observations" not in flags:
            flags.append("insufficient_observations")
        return ScoredGame(
            game_id=game_id,
            parameter=parameter,
            raw=None,
            min=float(g_min),
            max=float(g_max),
            span=float(g_span),
            num=None,
            relative=None,
            band=None,
            status="INSUFFICIENT",
            observation_count=obs_count,
            flags=flags,
            scoring_version=SCORING_VERSION,
            task_def_version=task_def_version
        )

    # 6. Compute bounded relative score
    raw_bounded = max(g_min, min(g_max, raw_val))
    num = raw_bounded - g_min
    relative = round(num / g_span, 6) if g_span > 0 else 0.0
    relative = max(0.0, min(1.0, relative))
    band = _classify_band(relative)

    return ScoredGame(
        game_id=game_id,
        parameter=parameter,
        raw=float(raw_bounded),
        min=float(g_min),
        max=float(g_max),
        span=float(g_span),
        num=float(num),
        relative=relative,
        band=band,
        status="USABLE",
        observation_count=obs_count,
        flags=flags,
        scoring_version=SCORING_VERSION,
        task_def_version=task_def_version
    )


def score_session_games(db: Session, session_id: str) -> Dict[str, ScoredGame]:
    """
    Scores all 21 games for a session and persists the DBGameScore records.
    """
    events = db.exec(
        select(DBTelemetryEvent)
        .where(DBTelemetryEvent.session_id == session_id)
        .order_by(DBTelemetryEvent.seq)
    ).all()

    # Detect task_def_version from events
    detected_version = "1.0"
    for ev in events:
        if getattr(ev, "task_def_version", None):
            detected_version = ev.task_def_version
            break

    quality_flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()

    # Group events by mini_game
    grouped_events: Dict[str, List[DBTelemetryEvent]] = {}
    for ev in events:
        mg = ev.mini_game
        if mg:
            grouped_events.setdefault(mg, []).append(ev)

    scores: Dict[str, ScoredGame] = {}
    for gid in GAME_PARAMETERS.keys():
        g_events = grouped_events.get(gid, [])
        scored = score_game(gid, g_events, quality_flags, detected_version)
        scores[gid] = scored

        # Persist DBGameScore (upsert or insert)
        existing_gs = db.exec(
            select(DBGameScore).where(
                DBGameScore.session_id == session_id,
                DBGameScore.game_id == gid
            )
        ).first()

        flags_json = json.dumps(scored.flags)
        if existing_gs:
            existing_gs.parameter = scored.parameter
            existing_gs.raw_score = scored.raw
            existing_gs.min_score = scored.min
            existing_gs.max_score = scored.max
            existing_gs.span = scored.span
            existing_gs.num = scored.num
            existing_gs.relative_score = scored.relative
            existing_gs.band = scored.band
            existing_gs.status = scored.status
            existing_gs.task_def_version = scored.task_def_version
            existing_gs.scoring_version = scored.scoring_version
            existing_gs.observation_count = scored.observation_count
            existing_gs.flags_json = flags_json
            db.add(existing_gs)
        else:
            new_gs = DBGameScore(
                session_id=session_id,
                game_id=gid,
                parameter=scored.parameter,
                raw_score=scored.raw,
                min_score=scored.min,
                max_score=scored.max,
                span=scored.span,
                num=scored.num,
                relative_score=scored.relative,
                band=scored.band,
                status=scored.status,
                task_def_version=scored.task_def_version,
                scoring_version=scored.scoring_version,
                observation_count=scored.observation_count,
                flags_json=flags_json
            )
            db.add(new_gs)

    db.commit()
    return scores
