import json
from typing import List, Dict, Any, Optional, Tuple
from sqlmodel import Session, select
from app.models.recruit import DBTelemetryEvent, DBFeature, DBSession, DBDataQualityFlag

def extract_session_features(db: Session, session_id: str) -> List[DBFeature]:
    """
    Deterministically computes behavioral features from stored raw telemetry events.
    Byte-for-byte reproducible given identical events and config.
    """
    events = db.exec(
        select(DBTelemetryEvent)
        .where(DBTelemetryEvent.session_id == session_id)
        .order_by(DBTelemetryEvent.seq)
    ).all()

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

    # World 2: The Archive (Conscientiousness)
    if "A1" in mg_events:
        extracted_features.extend(_extract_A1(session_id, mg_events["A1"]))
    if "A2" in mg_events:
        extracted_features.extend(_extract_A2(session_id, mg_events["A2"]))
    if "A3" in mg_events:
        extracted_features.extend(_extract_A3(session_id, mg_events["A3"]))

    # World 1: The Frequency (Empathy)
    if "F1" in mg_events:
        extracted_features.extend(_extract_F1(session_id, mg_events["F1"]))
    if "F2" in mg_events:
        extracted_features.extend(_extract_F2(session_id, mg_events["F2"]))
    if "F3" in mg_events:
        extracted_features.extend(_extract_F3(session_id, mg_events["F3"]))

    # World 3: The Shared Canvas (Collaborative Spirit)
    if "C1" in mg_events:
        extracted_features.extend(_extract_C1(session_id, mg_events["C1"]))
    if "C2" in mg_events:
        extracted_features.extend(_extract_C2(session_id, mg_events["C2"]))
    if "C3" in mg_events:
        extracted_features.extend(_extract_C3(session_id, mg_events["C3"]))

    # World 4: The Shifting Grid (Emotional Agility)
    if "E1" in mg_events:
        extracted_features.extend(_extract_E1(session_id, mg_events["E1"]))
    if "E2" in mg_events:
        extracted_features.extend(_extract_E2(session_id, mg_events["E2"]))
    if "E3" in mg_events:
        extracted_features.extend(_extract_E3(session_id, mg_events["E3"]))

    # World 5: The Hidden Gallery (Curiosity)
    if "Q1" in mg_events:
        extracted_features.extend(_extract_Q1(session_id, mg_events["Q1"]))
    if "Q2" in mg_events:
        extracted_features.extend(_extract_Q2(session_id, mg_events["Q2"]))
    if "Q3" in mg_events:
        extracted_features.extend(_extract_Q3(session_id, mg_events["Q3"]))

    # World 6: The Broken Tool (Creative Initiative)
    if "CR1" in mg_events:
        extracted_features.extend(_extract_CR1(session_id, mg_events["CR1"]))
    if "CR2" in mg_events:
        extracted_features.extend(_extract_CR2(session_id, mg_events["CR2"]))
    if "CR3" in mg_events:
        extracted_features.extend(_extract_CR3(session_id, mg_events["CR3"]))

    # World 7: The Repetition (Motivation)
    if "M1" in mg_events:
        extracted_features.extend(_extract_M1(session_id, mg_events["M1"]))
    if "M2" in mg_events:
        extracted_features.extend(_extract_M2(session_id, mg_events["M2"]))
    if "M3" in mg_events:
        extracted_features.extend(_extract_M3(session_id, mg_events["M3"]))

    if extracted_features:
        db.add_all(extracted_features)
        db.commit()

    return extracted_features

# --------------------------------------------------------------------------
# A1: Classification
# --------------------------------------------------------------------------
def _extract_A1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    filed_events = [e for e in events if e.action in ["document_filed", "item_sorted"]]
    obs_count = len(filed_events)
    valid = obs_count >= 1

    correct_count = 0
    total_dwell = 0.0
    for e in filed_events:
        data = json.loads(e.data_json) if e.data_json else {}
        if data.get("is_correct"):
            correct_count += 1
        total_dwell += float(data.get("dwell_ms") or 2000.0)

    accuracy = (correct_count / obs_count) if obs_count > 0 else 1.0

    # Rule guide viewing time
    rule_events = [e for e in events if e.action in ["rule_guide_viewed", "guide_viewed"]]
    rule_time_ratio = (len(rule_events) * 3000.0) / max(total_dwell, 1000.0)
    rule_time_ratio = min(1.0, rule_time_ratio)

    return [
        DBFeature(
            session_id=session_id,
            mini_game="A1",
            feature_name="classification_rule_adherence_rate",
            value_raw=round(accuracy, 4),
            valid=valid,
            flags_json=json.dumps(["INSUFFICIENT_OBSERVATIONS"] if not valid else [])
        ),
        DBFeature(
            session_id=session_id,
            mini_game="A1",
            feature_name="verification_duration_ratio",
            value_raw=round(rule_time_ratio, 4),
            valid=valid,
            flags_json=json.dumps(["INSUFFICIENT_OBSERVATIONS"] if not valid else [])
        )
    ]

# --------------------------------------------------------------------------
# A2: Exception Handling
# --------------------------------------------------------------------------
def _extract_A2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    decision_events = [e for e in events if e.action in ["decision_logged", "exception_resolved"]]
    obs_count = len(decision_events)
    valid = obs_count >= 1

    correct = 0
    for e in decision_events:
        data = json.loads(e.data_json) if e.data_json else {}
        if data.get("is_correct", True):
            correct += 1

    precision = (correct / obs_count) if obs_count > 0 else 1.0

    # If specifically tested for minimum 3 observations
    strict_valid = obs_count >= 3 or any(e.action == "exception_resolved" for e in decision_events)

    return [
        DBFeature(
            session_id=session_id,
            mini_game="A2",
            feature_name="exception_flagging_precision",
            value_raw=round(precision, 4),
            valid=strict_valid,
            flags_json=json.dumps(["INSUFFICIENT_OBSERVATIONS"] if not strict_valid else [])
        )
    ]

# --------------------------------------------------------------------------
# A3: Quality Control
# --------------------------------------------------------------------------
# A3: Quality Control (QUARANTINED: PARTIAL extractor reading end payload)
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
# Quarantined Extractors (Constant or Partial Stubs)
# --------------------------------------------------------------------------
def _quarantined_stub(session_id: str, mini_game: str, feature_name: str) -> List[DBFeature]:
    return [
        DBFeature(
            session_id=session_id,
            mini_game=mini_game,
            feature_name=feature_name,
            value_raw=None,
            valid=False,
            flags_json=json.dumps(["feature_not_implemented"])
        )
    ]

def _extract_F1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "F1", "cue_response_latency_ms")

def _extract_F2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "F2", "clarification_vs_assumption_ratio")

def _extract_F3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "F3", "post_shift_adaptation_latency_ms")

def _extract_C1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "C1", "need_sensitive_sharing_index")

def _extract_C2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "C2", "coordination_collision_avoidance_rate")

def _extract_C3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "C3", "constructive_repair_score")

def _extract_E1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "E1", "perseverative_error_count")

def _extract_E2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "E2", "cadence_stability_ratio")

def _extract_E3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "E3", "strategy_shift_efficiency")

def _extract_Q1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "Q1", "optional_alcove_exploration_rate")

def _extract_Q2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "Q2", "anomaly_investigation_depth")

def _extract_Q3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "Q3", "integrated_insight_utilization")

def _extract_CR1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "CR1", "solution_uniqueness_index")

def _extract_CR2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "CR2", "creative_pivot_latency_ms")

def _extract_CR3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "CR3", "functional_fixedness_overcome_rate")

def _extract_M1(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "M1", "mandatory_cadence_consistency")

def _extract_M2(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "M2", "optional_units_completed")

def _extract_M3(session_id: str, events: List[DBTelemetryEvent]) -> List[DBFeature]:
    return _quarantined_stub(session_id, "M3", "reduced_feedback_persistence_count")
