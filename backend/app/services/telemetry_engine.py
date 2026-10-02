import json
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.models.recruit import DBTelemetryEvent, DBSession, DBDataQualityFlag

class TelemetryCapReachedException(Exception):
    """Raised when the session event hard cap of 50,000 events is reached or exceeded."""
    def __init__(self, message: str = "events_cap_reached"):
        super().__init__(message)
        self.message = message

def ingest_telemetry_batch(db: Session, session_id: str, events: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    R2 Telemetry Ingestion Pipeline:
    - Enforces batch limit: maximum 100 events
    - Enforces individual event combined data+state limit: 4KB (records event_oversize)
    - Enforces session hard cap: 50,000 events (rejects whole batch, records events_cap_reached)
    - Enforces session high-volume threshold: 25,000 events (records events_high_volume)
    - Enforces sequence idempotency: identical payload -> ignore idempotently
    - Enforces sequence conflict: differing payload -> retain original, record seq_conflict
    - Detects sequence gaps -> records seq_gap
    - Discards continuous pointer events before batch, cap, or sequence accounting
    - Validates task_def_version presence on candidate task events
    - Strips client-authored derived and psychological fields
    """
    session_obj = db.get(DBSession, session_id)
    if not session_obj:
        raise ValueError(f"Unknown session_id: {session_id}")

    # Fetch existing events for this session
    existing_events = db.exec(
        select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id)
    ).all()
    existing_map = {e.seq: e for e in existing_events}
    existing_count = len(existing_map)

    if not events:
        return {"ingested_count": 0, "ignored_duplicates": 0, "total_session_events": existing_count}

    # 0. Defensive Backstop: Discard continuous pointer stream events BEFORE ANY accounting
    # (prevents pointer events from consuming sequence numbers, batch limits, event cap, or causing gaps/conflicts)
    filtered_events = []
    for ev in events:
        action = ev.get("action", "unknown")
        if action in ["mousemove", "pointermove", "touchmove", "continuous_drag"]:
            continue
        filtered_events.append(ev)
    events = filtered_events

    if not events:
        return {"ingested_count": 0, "ignored_duplicates": 0, "total_session_events": existing_count}

    # 1. Batch size limit (maximum 100 accepted discrete events)
    if len(events) > 100:
        raise ValueError("Batch exceeds maximum size of 100 events")

    # 2. Hard Cap Enforcement (50,000 accepted events)
    if existing_count >= 50000 or (existing_count + len(events) > 50000):
        # Record session-critical events_cap_reached flag
        cap_flag = db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == session_id,
                DBDataQualityFlag.flag == "events_cap_reached"
            )
        ).first()
        if not cap_flag:
            db.add(DBDataQualityFlag(
                session_id=session_id,
                scope="session",
                flag="events_cap_reached",
                detail=f"Telemetry hard cap of 50,000 events reached (existing: {existing_count}, attempted batch: {len(events)})"
            ))
            db.commit()
        raise TelemetryCapReachedException("events_cap_reached")

    # 3. Informational High Volume Threshold (25,000 events)
    if existing_count < 25000 and (existing_count + len(events) >= 25000):
        high_flag = db.exec(
            select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == session_id,
                DBDataQualityFlag.flag == "events_high_volume"
            )
        ).first()
        if not high_flag:
            db.add(DBDataQualityFlag(
                session_id=session_id,
                scope="session",
                flag="events_high_volume",
                detail="High volume telemetry threshold reached (>= 25,000 events)"
            ))
            db.commit()

    FORBIDDEN_CLIENT_FIELDS = {
        "condition_id", "correctness", "is_correct", "target_state", "target_category",
        "target_container", "is_context_appropriate", "perseverative_choice",
        "perseverative_error", "switch_cost_latency_ms", "insight_applied_correctly",
        "spontaneous_application", "rule_adherence_score", "exploration_efficiency",
        "creative_breakthrough_flag", "deficit_detected",
        "inspected_count", "flagged_count", "flagged_records", "inspected_records",
        "transferred_count", "remaining_count", "partner_final_count",
        "dwell_ms", "response_latency_ms", "context_retrieved"
    }

    new_events = []
    ignored_count = 0

    for ev in events:
        seq = ev.get("seq")
        if seq is None:
            continue

        screen = ev.get("screen", "unknown")
        action = ev.get("action", "unknown")
        mini_game = ev.get("mini_game")
        task_def_version = ev.get("task_def_version")

        # 4. Require task_def_version on candidate telemetry events
        if (screen in ["game", "sjt", "warmup"] or mini_game) and action not in ["session_ping", "page_hidden", "page_visible"]:
            if not task_def_version:
                db.add(DBDataQualityFlag(
                    session_id=session_id,
                    scope="telemetry",
                    flag="missing_task_def_version",
                    detail=f"Event seq {seq} missing required task_def_version"
                ))
            elif task_def_version != "1.0":
                db.add(DBDataQualityFlag(
                    session_id=session_id,
                    scope="telemetry",
                    flag="invalid_task_def_version",
                    detail=f"Event seq {seq} has invalid task_def_version '{task_def_version}'"
                ))

        state_data = ev.get("state")
        data_payload = ev.get("data")

        # 5. Sanitize forbidden client-authored derived and psychological fields
        forbidden_found = []
        if isinstance(data_payload, dict):
            sanitized_data = dict(data_payload)
            for k in list(sanitized_data.keys()):
                if k in FORBIDDEN_CLIENT_FIELDS:
                    forbidden_found.append(k)
                    del sanitized_data[k]
            data_payload = sanitized_data

        if isinstance(state_data, dict):
            sanitized_state = dict(state_data)
            for k in list(sanitized_state.keys()):
                if k in FORBIDDEN_CLIENT_FIELDS:
                    forbidden_found.append(k)
                    del sanitized_state[k]
            state_data = sanitized_state

        if forbidden_found:
            db.add(DBDataQualityFlag(
                session_id=session_id,
                scope="telemetry",
                flag="forbidden_client_field_detected",
                detail=f"Event seq {seq} contained forbidden client fields: {', '.join(sorted(forbidden_found))}; stripped"
            ))

        state_json_str = json.dumps(state_data) if state_data is not None else None
        data_json_str = json.dumps(data_payload) if data_payload is not None else None

        # 6. Individual Event Size Limit (4 KB combined data + state)
        combined_size = (len(state_json_str.encode('utf-8')) if state_json_str else 0) + \
                        (len(data_json_str.encode('utf-8')) if data_json_str else 0)
        if combined_size > 4096:
            db.add(DBDataQualityFlag(
                session_id=session_id,
                scope="telemetry",
                flag="event_oversize",
                detail=f"Event seq {seq} combined data+state exceeds 4KB ({combined_size} bytes)"
            ))
            state_json_str = json.dumps({"oversized": True, "size_bytes": combined_size})
            data_json_str = json.dumps({"oversized": True, "size_bytes": combined_size})

        # 7. Sequence Duplicate / Conflict Check
        if seq in existing_map:
            prev = existing_map[seq]
            is_identical = (
                prev.action == action and
                prev.screen == screen and
                prev.game_world == ev.get("game_world") and
                prev.mini_game == mini_game and
                prev.trial == ev.get("trial") and
                prev.input_type == ev.get("input_type") and
                (prev.state_json == state_json_str or (prev.state_json is None and state_json_str is None)) and
                (prev.data_json == data_json_str or (prev.data_json is None and data_json_str is None))
            )
            if is_identical:
                # Idempotent retransmission
                ignored_count += 1
                continue
            else:
                # Conflicting duplicate: retain original, flag seq_conflict (session-critical)
                ignored_count += 1
                db.add(DBDataQualityFlag(
                    session_id=session_id,
                    scope="telemetry",
                    flag="seq_conflict",
                    detail=f"Conflicting payload for seq {seq}"
                ))
                continue

        event_model = DBTelemetryEvent(
            session_id=session_id,
            seq=seq,
            segment_id=ev.get("segment_id", 1),
            t_ms=float(ev.get("t_ms", 0.0)),
            screen=screen,
            game_world=ev.get("game_world"),
            mini_game=mini_game,
            trial=ev.get("trial"),
            action=action,
            input_type=ev.get("input_type"),
            task_def_version=task_def_version or "1.0",
            state_json=state_json_str,
            data_json=data_json_str
        )
        new_events.append(event_model)
        existing_map[seq] = event_model

    if new_events:
        db.add_all(new_events)
        db.commit()

    # 6. Sequence Gap Detection
    all_seqs = sorted(list(existing_map.keys()))
    if all_seqs:
        expected_seqs = set(range(all_seqs[0], all_seqs[-1] + 1))
        missing = expected_seqs - set(all_seqs)
        if missing:
            existing_gap = db.exec(
                select(DBDataQualityFlag).where(
                    DBDataQualityFlag.session_id == session_id,
                    DBDataQualityFlag.flag == "seq_gap"
                )
            ).first()
            if not existing_gap:
                db.add(DBDataQualityFlag(
                    session_id=session_id,
                    scope="telemetry",
                    flag="seq_gap",
                    detail=f"Missing seq numbers: {sorted(list(missing))[:20]}"
                ))
                db.commit()

    return {
        "ingested_count": len(new_events),
        "ignored_duplicates": ignored_count,
        "total_session_events": len(existing_map)
    }

def calculate_active_duration_ms(events: List[DBTelemetryEvent]) -> float:
    """
    Computes true behavioral duration from performance.now() events within each segment,
    strictly subtracting paused time, blur, and hidden tab time.
    Cross-segment duration is never computed (each segment's active duration is computed separately and summed).
    """
    if not events:
        return 0.0

    from collections import defaultdict
    by_segment = defaultdict(list)
    for ev in events:
        seg_id = ev.segment_id if ev.segment_id is not None else 1
        by_segment[seg_id].append(ev)

    total_active_ms = 0.0

    for segment_id, seg_events in by_segment.items():
        sorted_events = sorted(seg_events, key=lambda e: e.t_ms)
        if not sorted_events:
            continue
        pause_start_t = None
        last_active_t = sorted_events[0].t_ms

        for ev in sorted_events:
            if ev.action in ["pause", "visibility_hidden", "tab_hidden", "blur"]:
                if pause_start_t is None:
                    pause_start_t = ev.t_ms
                    total_active_ms += max(0.0, ev.t_ms - last_active_t)
            elif ev.action in ["resume", "visibility_visible", "tab_visible", "focus"]:
                if pause_start_t is not None:
                    pause_start_t = None
                    last_active_t = ev.t_ms
            else:
                if pause_start_t is None:
                    total_active_ms += max(0.0, ev.t_ms - last_active_t)
                    last_active_t = ev.t_ms

    return total_active_ms

