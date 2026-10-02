"""Dry-run-first cleanup for expired Alfaaz Recruit sessions."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Type

from sqlalchemy import func
from sqlmodel import Session, SQLModel, delete, select

from app.db.session import SessionLocal
from app.models.audit import DBAuditLog
from app.models.recruit import (
    DBApplicantIdentity,
    DBAccessibilityProfile,
    DBConsentRecord,
    DBDataQualityFlag,
    DBEvidence,
    DBFeature,
    DBOutcome,
    DBRecruiterAccessLog,
    DBSession,
    DBSJTResponse,
    DBTaskAssignment,
    DBTelemetryEvent,
    DBWarmupBaseline,
)

SESSION_CHILD_MODELS: tuple[Type[SQLModel], ...] = (
    DBApplicantIdentity,
    DBConsentRecord,
    DBAccessibilityProfile,
    DBWarmupBaseline,
    DBTaskAssignment,
    DBSJTResponse,
    DBTelemetryEvent,
    DBFeature,
    DBEvidence,
    DBDataQualityFlag,
    DBOutcome,
    DBRecruiterAccessLog,
)
POLICY_VERSION = "session-retention-v1"


def configured_retention_days() -> int:
    config_path = Path(__file__).resolve().parents[2] / "config" / "brand.json"
    with config_path.open(encoding="utf-8") as config_file:
        days = json.load(config_file).get("data_retention_days")
    if isinstance(days, bool) or not isinstance(days, int) or days <= 0:
        raise ValueError("config/brand.json must define a positive integer data_retention_days")
    return days


def cleanup_expired_sessions(
    db: Session,
    *,
    retention_days: int | None = None,
    now: datetime | None = None,
    apply: bool = False,
) -> dict[str, object]:
    days = configured_retention_days() if retention_days is None else retention_days
    if isinstance(days, bool) or not isinstance(days, int) or days <= 0:
        raise ValueError("retention_days must be a positive integer")

    current_time = now or datetime.now(timezone.utc)
    if current_time.tzinfo is None:
        raise ValueError("now must be timezone-aware")
    cutoff = current_time.astimezone(timezone.utc) - timedelta(days=days)
    expired_ids = list(
        db.exec(select(DBSession.session_id).where(DBSession.created_at < cutoff)).all()
    )
    counts: dict[str, int] = {}
    if expired_ids:
        for model in SESSION_CHILD_MODELS:
            counts[model.__tablename__] = int(
                db.exec(
                    select(func.count()).select_from(model).where(
                        model.session_id.in_(expired_ids)
                    )
                ).one()
            )
        counts[DBSession.__tablename__] = len(expired_ids)
    else:
        counts = {model.__tablename__: 0 for model in SESSION_CHILD_MODELS}
        counts[DBSession.__tablename__] = 0

    result: dict[str, object] = {
        "mode": "apply" if apply else "dry-run",
        "retention_days": days,
        "cutoff_utc": cutoff.isoformat(),
        "expired_sessions": len(expired_ids),
        "rows_by_table": counts,
    }
    if not apply or not expired_ids:
        return result

    for model in SESSION_CHILD_MODELS:
        db.exec(delete(model).where(model.session_id.in_(expired_ids)))
    db.exec(delete(DBSession).where(DBSession.session_id.in_(expired_ids)))

    db.add(
        DBAuditLog(
            admin_email="system:retention-job",
            action="RECRUIT_RETENTION_PURGE",
            target_type="recruit_session_batch",
            details=json.dumps(
                {
                    "policy_version": POLICY_VERSION,
                    "retention_days": days,
                    "cutoff_utc": cutoff.isoformat(),
                    "expired_sessions": len(expired_ids),
                    "deleted_rows_by_table": counts,
                },
                sort_keys=True,
            ),
        )
    )
    db.commit()
    return result


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--apply",
        action="store_true",
        help="delete expired records; without this flag the command only reports counts",
    )
    args = parser.parse_args()

    with SessionLocal() as db:
        result = cleanup_expired_sessions(db, apply=args.apply)
    print(json.dumps(result, sort_keys=True))


if __name__ == "__main__":
    main()
