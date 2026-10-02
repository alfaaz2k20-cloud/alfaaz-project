"""Report whether Recruit data are eligible for empirical calibration.

This command is deliberately read-only: it never creates thresholds, bands, or
candidate-level output. It reports aggregate data-quality exclusions only.
"""

from __future__ import annotations

import json

from sqlmodel import Session, select

from app.db.session import SessionLocal
from app.models.recruit import (
    DBConsentRecord,
    DBDataQualityFlag,
    DBSession,
    DBSJTResponse,
    DBTelemetryEvent,
)
from app.services.descriptive_task_record import LOCKED_GAMES
from app.services.telemetry_engine import calculate_active_duration_ms

EXPECTED_GAME_IDS = frozenset(game["game_id"] for game in LOCKED_GAMES)
HARD_EXCLUSION_FLAGS = frozenset(
    {
        "events_cap_reached",
        "seq_conflict",
        "seq_gap",
        "missing_task_def_version",
        "invalid_task_def_version",
    }
)
MIN_ACTIVE_DURATION_MS = 6 * 60 * 1000
MAX_ACTIVE_DURATION_MS = 90 * 60 * 1000


def session_exclusion_reasons(db: Session, session_id: str) -> set[str]:
    """Return protocol-defined exclusion reasons without exposing session data."""
    reasons: set[str] = set()
    session = db.get(DBSession, session_id)
    if session is None or session.status != "COMPLETE":
        reasons.add("incomplete_battery")

    consent = db.exec(
        select(DBConsentRecord).where(DBConsentRecord.session_id == session_id)
    ).first()
    if consent is None or not consent.confirmed_18_plus:
        reasons.add("invalid_or_missing_consent")

    sjt_count = db.exec(
        select(DBSJTResponse).where(DBSJTResponse.session_id == session_id)
    ).all()
    if len(sjt_count) != 7:
        reasons.add("incomplete_sjt")

    events = db.exec(
        select(DBTelemetryEvent)
        .where(DBTelemetryEvent.session_id == session_id)
        .order_by(DBTelemetryEvent.seq)
    ).all()
    observed_games = {event.mini_game for event in events if event.mini_game}
    if not EXPECTED_GAME_IDS.issubset(observed_games):
        reasons.add("incomplete_game_battery")

    active_duration_ms = calculate_active_duration_ms(events)
    if active_duration_ms < MIN_ACTIVE_DURATION_MS or active_duration_ms > MAX_ACTIVE_DURATION_MS:
        reasons.add("active_duration_outlier")

    flags = db.exec(
        select(DBDataQualityFlag.flag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    if HARD_EXCLUSION_FLAGS.intersection(flags):
        reasons.add("hard_integrity_flag")
    return reasons


def calibration_preflight(db: Session) -> dict[str, object]:
    exclusion_counts: dict[str, int] = {}
    total_sessions = 0
    eligible_sessions = 0

    for session_id in db.exec(select(DBSession.session_id)).all():
        total_sessions += 1
        reasons = session_exclusion_reasons(db, session_id)
        if not reasons:
            eligible_sessions += 1
        for reason in reasons:
            exclusion_counts[reason] = exclusion_counts.get(reason, 0) + 1

    return {
        "calibration_status": "NOT_RUN",
        "total_sessions": total_sessions,
        "eligible_sessions": eligible_sessions,
        "excluded_sessions": total_sessions - eligible_sessions,
        "exclusion_counts": dict(sorted(exclusion_counts.items())),
        "planning_targets": {"technical_field_pilot": 50, "exploratory_calibration": 250},
        "next_action": (
            "Collect clean consented sessions before calibration analysis."
            if eligible_sessions < 50
            else "Review distributions and task-appropriate reliability before any calibration decision."
        ),
    }


def main() -> None:
    with SessionLocal() as db:
        print(json.dumps(calibration_preflight(db), sort_keys=True))


if __name__ == "__main__":
    main()
