import json
from typing import List, Dict, Any, Optional, Set
from sqlmodel import Session, select
from app.models.recruit import DBTelemetryEvent, DBFeature, DBSession, DBDataQualityFlag, DBAccessibilityProfile
from app.services.task_definitions import get_stimulus_ground_truth

# Declared Feature Metadata and Directionality (Section 9)
FEATURE_METADATA = {
    # World 2 (Conscientiousness)
    "classification_rule_adherence_rate": {"mini_game": "A1", "direction": "POSITIVE", "is_timing": False},
    "verification_duration_ratio": {"mini_game": "A1", "direction": "POSITIVE", "is_timing": True},
    "exception_flagging_precision": {"mini_game": "A2", "direction": "POSITIVE", "is_timing": False},
    "error_detection_sensitivity": {"mini_game": "A3", "direction": "POSITIVE", "is_timing": False},
    "false_alarm_rate": {"mini_game": "A3", "direction": "NEGATIVE", "is_timing": False},

    # World 1 (Empathy - Quarantined)
    "cue_response_latency_ms": {"mini_game": "F1", "direction": "NEGATIVE", "is_timing": True},
    "clarification_vs_assumption_ratio": {"mini_game": "F2", "direction": "POSITIVE", "is_timing": False},
    "post_shift_adaptation_latency_ms": {"mini_game": "F3", "direction": "NEGATIVE", "is_timing": True},

    # World 3 (Collaborative Spirit - Quarantined)
    "need_sensitive_sharing_index": {"mini_game": "C1", "direction": "POSITIVE", "is_timing": False},
    "coordination_collision_avoidance_rate": {"mini_game": "C2", "direction": "POSITIVE", "is_timing": False},
    "constructive_repair_score": {"mini_game": "C3", "direction": "POSITIVE", "is_timing": False},

    # World 4 (Emotional Agility - Quarantined)
    "perseverative_error_count": {"mini_game": "E1", "direction": "NEGATIVE", "is_timing": False},
    "cadence_stability_ratio": {"mini_game": "E2", "direction": "POSITIVE", "is_timing": False},
    "strategy_shift_efficiency": {"mini_game": "E3", "direction": "POSITIVE", "is_timing": False},

    # World 5 (Curiosity - Quarantined)
    "optional_alcove_exploration_rate": {"mini_game": "Q1", "direction": "POSITIVE", "is_timing": False},
    "anomaly_investigation_depth": {"mini_game": "Q2", "direction": "POSITIVE", "is_timing": False},
    "integrated_insight_utilization": {"mini_game": "Q3", "direction": "POSITIVE", "is_timing": False},

    # World 6 (Creative Initiative - Quarantined)
    "solution_uniqueness_index": {"mini_game": "CR1", "direction": "POSITIVE", "is_timing": False},
    "creative_pivot_latency_ms": {"mini_game": "CR2", "direction": "NEGATIVE", "is_timing": True},
    "functional_fixedness_overcome_rate": {"mini_game": "CR3", "direction": "POSITIVE", "is_timing": False},

    # World 7 (Motivation - Quarantined)
    "mandatory_cadence_consistency": {"mini_game": "M1", "direction": "POSITIVE", "is_timing": False},
    "optional_units_completed": {"mini_game": "M2", "direction": "POSITIVE", "is_timing": False},
    "reduced_feedback_persistence_count": {"mini_game": "M3", "direction": "POSITIVE", "is_timing": False}
}


def extract_session_features(db: Session, session_id: str) -> List[DBFeature]:
    """
    Deterministically computes behavioral features from stored raw telemetry events.
    Byte-for-byte reproducible given identical events and config.
    Enforces Section 8: Active (A1, A2) vs Quarantined (all others).
    Enforces Section 33: Accessibility profile exclusions for timing features.
    """
    events = db.exec(
        select(DBTelemetryEvent)
        .where(DBTelemetryEvent.session_id == session_id)
        .order_by(DBTelemetryEvent.seq)
    ).all()

    # Accessibility profile check (Section 33)
    a11y_profile = db.get(DBAccessibilityProfile, session_id)
    modes_enabled: List[str] = []
    if a11y_profile and a11y_profile.modes_enabled_json:
        try:
            parsed = json.loads(a11y_profile.modes_enabled_json)
            if isinstance(parsed, list):
                modes_enabled = parsed
        except Exception:
            pass

    timing_excluded = any(
        m in ["extended_time", "keyboard_navigation", "screen_reader"]
        for m in modes_enabled
    )

    # Clear previously computed features for clean idempotency/recompute
    existing = db.exec(select(DBFeature).where(DBFeature.session_id == session_id)).all()
    for f in existing:
        db.delete(f)
    db.commit()

    # Group events by mini_game
    mg_events: Dict[str, List[DBTelemetryEvent]] = {}
    for ev in events:
        mg = ev.mini_game
        if mg:
            if mg not in mg_events:
                mg_events[mg] = []
            mg_events[mg].append(ev)

    extracted_features: List[DBFeature] = []

    # World 2: The Archive (Conscientiousness) - ACTIVE EXTRACTORS A1, A2; QUARANTINED A3
    if "A1" in mg_events:
        extracted_features.extend(_extract_A1(session_id, mg_events["A1"], timing_excluded))
    if "A2" in mg_events:
        extracted_features.extend(_extract_A2(session_id, mg_events["A2"]))
    if "A3" in mg_events:
        extracted_features.extend(_extract_A3(session_id, mg_events["A3"]))

    # World 1: The Frequency (Empathy) - QUARANTINED
    if "F1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "F1", ["cue_response_latency_ms"]))
    if "F2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "F2", ["clarification_vs_assumption_ratio"]))
    if "F3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "F3", ["post_shift_adaptation_latency_ms"]))

    # World 3: The Shared Canvas (Collaborative Spirit) - QUARANTINED
    if "C1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "C1", ["need_sensitive_sharing_index"]))
    if "C2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "C2", ["coordination_collision_avoidance_rate"]))
    if "C3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "C3", ["constructive_repair_score"]))

    # World 4: The Shifting Grid (Emotional Agility) - QUARANTINED
    if "E1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "E1", ["perseverative_error_count"]))
    if "E2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "E2", ["cadence_stability_ratio"]))
    if "E3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "E3", ["strategy_shift_efficiency"]))

    # World 5: The Hidden Gallery (Curiosity) - QUARANTINED
    if "Q1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "Q1", ["optional_alcove_exploration_rate"]))
    if "Q2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "Q2", ["anomaly_investigation_depth"]))
    if "Q3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "Q3", ["integrated_insight_utilization"]))

    # World 6: The Broken Tool (Creative Initiative) - QUARANTINED
    if "CR1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "CR1", ["solution_uniqueness_index"]))
    if "CR2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "CR2", ["creative_pivot_latency_ms"]))
    if "CR3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "CR3", ["functional_fixedness_overcome_rate"]))

    # World 7: The Repetition (Motivation) - QUARANTINED
    if "M1" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "M1", ["mandatory_cadence_consistency"]))
    if "M2" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "M2", ["optional_units_completed"]))
    if "M3" in mg_events:
        extracted_features.extend(_extract_quarantined(session_id, "M3", ["reduced_feedback_persistence_count"]))

    if extracted_features:
        db.add_all(extracted_features)
        db.commit()

    return extracted_features


# --------------------------------------------------------------------------
# A1: Classification (Section 11 Lock)
# --------------------------------------------------------------------------
def _extract_A1(
    session_id: str,
    events: List[DBTelemetryEvent],
    timing_excluded: bool = False
) -> List[DBFeature]:
    filed_events = [e for e in events if e.action in ["document_filed", "item_sorted"]]
    
    # Deduplicate by stimulus_id so repeated clicks on the same item do not inflate denominator
    unique_items: Dict[str, Dict[str, Any]] = {}
    for e in filed_events:
        data = json.loads(e.data_json) if e.data_json else {}
        stim_id = data.get("stimulus_id") or data.get("doc_id")
        choice = data.get("choice") or data.get("target_folder") or data.get("folder")
        if stim_id and stim_id not in unique_items:
            unique_items[stim_id] = {
                "choice": choice,
                "data": data,
                "t_ms": e.t_ms
            }

    obs_count = len(unique_items)
    valid_accuracy = obs_count >= 1

    correct_count = 0
    for stim_id, item_info in unique_items.items():
        choice = item_info["choice"]
        stim = get_stimulus_ground_truth("A1", stim_id)
        if stim and stim.get("target_folder"):
            if choice == stim.get("target_folder"):
                correct_count += 1
        elif item_info["data"].get("is_correct"):
            correct_count += 1

    accuracy = (correct_count / obs_count) if obs_count > 0 else 0.0

    features = [
        DBFeature(
            session_id=session_id,
            mini_game="A1",
            feature_name="classification_rule_adherence_rate",
            value_raw=round(accuracy, 4) if valid_accuracy else None,
            valid=valid_accuracy,
            flags_json=json.dumps(["INSUFFICIENT_OBSERVATIONS"] if not valid_accuracy else [])
        )
    ]

    # verification_duration_ratio (Section 11 Lock):
    # Must use genuine observed timing.
    # The system must NEVER invent dwell time from fixed defaults or guide clicks x constants.
    # Since guide dwell timestamps cannot be reconstructed without close events:
    # do not manufacture the feature.
    if timing_excluded:
        timing_flags = ["excluded_by_accessibility_profile"]
    else:
        timing_flags = ["insufficient_timing_basis"]

    features.append(
        DBFeature(
            session_id=session_id,
            mini_game="A1",
            feature_name="verification_duration_ratio",
            value_raw=None,
            valid=False,
            flags_json=json.dumps(timing_flags)
        )
    )

    return features


# --------------------------------------------------------------------------
# A2: Exception Handling (True Precision: TP / (TP + FP))
# --------------------------------------------------------------------------
def _extract_A2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    decision_events = [e for e in events if e.action in ["decision_logged", "exception_resolved"]]

    # Track candidate decision per distinct stimulus ID (duplicate events must not inflate counts)
    stimulus_decisions: Dict[str, str] = {}
    for e in decision_events:
        data = json.loads(e.data_json) if e.data_json else {}
        stim_id = data.get("stimulus_id")
        action_id = data.get("action_id") or data.get("action") or data.get("chosen_action")

        if not stim_id or not action_id:
            continue

        if stim_id not in stimulus_decisions:
            stimulus_decisions[stim_id] = action_id

    # Ground truth mapping:
    # EXC_01, EXC_03, EXC_04 -> true_exception (expected_action: "flag_exception")
    # EXC_02 -> clean_control (expected_action: "file_standard")
    genuine_evaluated = 0
    true_positives = 0
    false_positives = 0

    for stim_id, chosen_action in stimulus_decisions.items():
        stim = get_stimulus_ground_truth("A2", stim_id)
        if not stim:
            continue

        cond_type = stim.get("condition_type")
        expected = stim.get("expected_action")

        if cond_type == "true_exception":
            genuine_evaluated += 1
            # TP = genuine exception correctly flagged as exception
            if chosen_action == expected or chosen_action == "flag_exception":
                true_positives += 1
        elif cond_type == "clean_control":
            # Clean control: candidate should NOT flag exception.
            # If incorrectly flagged as exception, count as False Positive (FP)
            if chosen_action == "flag_exception" or (expected and chosen_action != expected):
                false_positives += 1

    # Observation gate: exactly genuine exception opportunities evaluated
    # Fewer than 3 genuine exception opportunities -> INSUFFICIENT
    # exception_resolved must NEVER bypass this requirement.
    if genuine_evaluated < 3:
        return [
            DBFeature(
                session_id=session_id,
                mini_game="A2",
                feature_name="exception_flagging_precision",
                value_raw=None,
                valid=False,
                flags_json=json.dumps(["INSUFFICIENT_OBSERVATIONS"])
            )
        ]

    # Mathematical definition: precision = TP / (TP + FP)
    total_flagged = true_positives + false_positives
    if total_flagged > 0:
        precision = true_positives / total_flagged
    else:
        precision = 0.0

    return [
        DBFeature(
            session_id=session_id,
            mini_game="A2",
            feature_name="exception_flagging_precision",
            value_raw=round(precision, 4),
            valid=True,
            flags_json=json.dumps([])
        )
    ]


# --------------------------------------------------------------------------
# A3: Quality Control (Quarantined)
# --------------------------------------------------------------------------
def _extract_A3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return [
        DBFeature(
            session_id=session_id,
            mini_game="A3",
            feature_name="error_detection_sensitivity",
            value_raw=None,
            valid=False,
            flags_json=json.dumps(["feature_not_implemented"])
        ),
        DBFeature(
            session_id=session_id,
            mini_game="A3",
            feature_name="false_alarm_rate",
            value_raw=None,
            valid=False,
            flags_json=json.dumps(["feature_not_implemented"])
        )
    ]


# --------------------------------------------------------------------------
# Quarantined Games (Section 7 & 8 Lock)
# Strictly returns value_raw = None, valid = False, flags = ["feature_not_implemented"].
# NO SHA256 hashes, NO keyword fallbacks, NO fake values.
# --------------------------------------------------------------------------
def _extract_quarantined(session_id: str, mini_game: str, feature_names: List[str]) -> List[DBFeature]:
    return [
        DBFeature(
            session_id=session_id,
            mini_game=mini_game,
            feature_name=fn,
            value_raw=None,
            valid=False,
            flags_json=json.dumps(["feature_not_implemented"])
        )
        for fn in feature_names
    ]
