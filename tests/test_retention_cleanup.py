import json
import sys
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine, select

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.jobs.retention_cleanup import cleanup_expired_sessions
from app.models.audit import DBAuditLog
from app.models.recruit import DBApplicantIdentity, DBSession, DBTelemetryEvent


def make_db():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    return engine


def seed_session(db: Session, session_id: str, created_at: datetime) -> None:
    db.add(DBSession(session_id=session_id, created_at=created_at, status="COMPLETE"))
    db.add(DBApplicantIdentity(session_id=session_id, full_name="Test", email="test@example.invalid"))
    db.add(
        DBTelemetryEvent(
            session_id=session_id,
            seq=1,
            segment_id=1,
            t_ms=10,
            screen="game",
            action="tap",
        )
    )
    db.commit()


class RetentionCleanupTests(unittest.TestCase):
    def test_dry_run_reports_counts_without_deleting_or_auditing(self):
        engine = make_db()
        now = datetime(2026, 10, 2, tzinfo=timezone.utc)
        with Session(engine) as db:
            seed_session(db, "expired-id", now - timedelta(days=91))
            seed_session(db, "recent-id", now - timedelta(days=89))

            result = cleanup_expired_sessions(db, retention_days=90, now=now)

            self.assertEqual(result["mode"], "dry-run")
            self.assertEqual(result["expired_sessions"], 1)
            self.assertEqual(result["rows_by_table"]["applicant_identities"], 1)
            self.assertEqual(result["rows_by_table"]["telemetry_events"], 1)
            self.assertIsNotNone(db.get(DBSession, "expired-id"))
            self.assertEqual(db.exec(select(DBAuditLog)).all(), [])
        engine.dispose()

    def test_apply_deletes_all_session_rows_and_writes_nonidentifying_audit(self):
        engine = make_db()
        now = datetime(2026, 10, 2, tzinfo=timezone.utc)
        with Session(engine) as db:
            seed_session(db, "expired-id", now - timedelta(days=91))
            seed_session(db, "recent-id", now - timedelta(days=89))

            result = cleanup_expired_sessions(db, retention_days=90, now=now, apply=True)

            self.assertEqual(result["mode"], "apply")
            self.assertIsNone(db.get(DBSession, "expired-id"))
            self.assertIsNone(db.get(DBApplicantIdentity, "expired-id"))
            self.assertEqual(
                db.exec(
                    select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == "expired-id")
                ).all(),
                [],
            )
            self.assertIsNotNone(db.get(DBSession, "recent-id"))
            audit = db.exec(select(DBAuditLog)).one()
            audit_details = json.loads(audit.details)
            self.assertEqual(audit.action, "RECRUIT_RETENTION_PURGE")
            self.assertNotIn("expired-id", audit.details)
            self.assertNotIn("recent-id", audit.details)
            self.assertEqual(audit_details["expired_sessions"], 1)
        engine.dispose()
