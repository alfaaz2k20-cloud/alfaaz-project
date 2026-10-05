import sys
import unittest
from datetime import datetime, timezone
from pathlib import Path

from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.jobs.calibration_preflight import calibration_preflight
from app.models.recruit import DBConsentRecord, DBSession, DBSJTResponse, DBTelemetryEvent
from app.services.descriptive_task_record import LOCKED_GAMES


def make_db():
    engine = create_engine(
        "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
    )
    SQLModel.metadata.create_all(engine)
    return engine


def seed_eligible_session(db: Session, session_id: str) -> None:
    db.add(
        DBSession(
            session_id=session_id,
            status="COMPLETE",
            created_at=datetime(2026, 10, 2, tzinfo=timezone.utc),
        )
    )
    db.add(
        DBConsentRecord(
            session_id=session_id,
            consent_text_version="2026-10-v1",
            confirmed_18_plus=True,
        )
    )
    for index in range(7):
        db.add(
            DBSJTResponse(
                session_id=session_id, scenario_id=f"S{index + 1}", option_id="A"
            )
        )
    for index, game in enumerate(LOCKED_GAMES):
        db.add(
            DBTelemetryEvent(
                session_id=session_id,
                seq=index + 1,
                segment_id=1,
                t_ms=index * 20_000,
                screen="game",
                mini_game=game["game_id"],
                action="trial_submit",
            )
        )
    db.commit()


class CalibrationPreflightTests(unittest.TestCase):
    def test_reports_eligible_and_incomplete_sessions_without_identifiers(self):
        engine = make_db()
        with Session(engine) as db:
            seed_eligible_session(db, "eligible-session")
            db.add(DBSession(session_id="incomplete-session", status="ACTIVE"))
            db.commit()

            report = calibration_preflight(db)

            self.assertEqual(report["calibration_status"], "NOT_RUN")
            self.assertEqual(report["total_sessions"], 2)
            self.assertEqual(report["eligible_sessions"], 1)
            self.assertEqual(report["excluded_sessions"], 1)
            self.assertEqual(report["exclusion_counts"]["incomplete_battery"], 1)
            self.assertNotIn("eligible-session", str(report))
            self.assertNotIn("incomplete-session", str(report))
        engine.dispose()
