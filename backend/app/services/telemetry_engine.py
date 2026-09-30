import json
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.models.recruit import DBTelemetryEvent, DBSession, DBDataQualityFlag

def ingest_telemetry_batch(db: Session, session_id: str, events: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Idempotent batch ingestion of append-only telemetry events.
    Enforces uniqueness on (session_id, seq) and flags sequence gaps.
    """
    session_obj = db.get(DBSession, session_id)
    if not session_obj:
        raise ValueError(f"Unknown session_id: {session_id}")

    if not events:
        return {"ingested_count": 0, "ignored_duplicates": 0}

    # Fetch existing seq numbers for this session to guarantee idempotency
    existing_seqs = set(
        db.exec(
            select(DBTelemetryEvent.seq).where(DBTelemetryEvent.session_id == session_id)
        ).all()
    )

    new_events = []
    ignored_count = 0

    for ev in events:
        seq = ev.get("seq")
        if seq is None:
            continue
        if seq in existing_seqs:
            ignored_count += 1
            continue

        existing_seqs.add(seq)

        state_data = ev.get("state")
        data_payload = ev.get("data")

        event_model = DBTelemetryEvent(
            session_id=session_id,
            seq=seq,
            segment_id=ev.get("segment_id", 1),
            t_ms=float(ev.get("t_ms", 0.0)),
            screen=ev.get("screen", "unknown"),
            game_world=ev.get("game_world"),
            mini_game=ev.get("mini_game"),
            trial=ev.get("trial"),
            action=ev.get("action", "unknown"),
            input_type=ev.get("input_type"),
            state_json=json.dumps(state_data) if state_data is not None else None,
            data_json=json.dumps(data_payload) if data_payload is not None else None
        )
        new_events.append(event_model)

    if new_events:
        db.add_all(new_events)
        db.commit()

    # Check for sequence gaps
    all_seqs = sorted(list(existing_seqs))
    if all_seqs:
        expected_seqs = set(range(all_seqs[0], all_seqs[-1] + 1))
        missing = expected_seqs - existing_seqs
        if missing:
            flag = DBDataQualityFlag(
                session_id=session_id,
                scope="telemetry",
                flag="SEQUENCE_GAP",
                detail=f"Missing seq numbers: {sorted(list(missing))[:10]}"
            )
            db.add(flag)
            db.commit()

    return {
        "ingested_count": len(new_events),
        "ignored_duplicates": ignored_count,
        "total_session_events": len(existing_seqs)
    }

def calculate_active_duration_ms(events: List[DBTelemetryEvent]) -> float:
    """
    Computes true behavioral duration from performance.now() events within a segment,
    strictly subtracting paused time and hidden tab time.
    """
    if not events:
        return 0.0

    sorted_events = sorted(events, key=lambda e: e.t_ms)
    total_active_ms = 0.0
    
    pause_start_t = None
    last_active_t = sorted_events[0].t_ms

    for ev in sorted_events:
        if ev.action in ["pause", "visibility_hidden"]:
            if pause_start_t is None:
                pause_start_t = ev.t_ms
                total_active_ms += max(0.0, ev.t_ms - last_active_t)
        elif ev.action in ["resume", "visibility_visible"]:
            if pause_start_t is not None:
                pause_start_t = None
                last_active_t = ev.t_ms
        else:
            if pause_start_t is None:
                total_active_ms += max(0.0, ev.t_ms - last_active_t)
                last_active_t = ev.t_ms

    return total_active_ms
