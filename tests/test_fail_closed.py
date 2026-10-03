import unittest
import sys
import json
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.services.telemetry_engine import ingest_telemetry_batch, _get_task_definitions
from app.models.recruit import DBSession, DBTelemetryEvent, DBDataQualityFlag
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine, select
import app.services.telemetry_engine as te


class TestFailClosedTelemetry(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        SQLModel.metadata.create_all(self.engine)
        with Session(self.engine) as db:
            db.add(DBSession(session_id="test-session", status="ACTIVE"))
            db.commit()

    # ------------------------------------------------------------------
    # 1. Valid config + valid event => ACCEPTED
    # ------------------------------------------------------------------
    def test_valid_event_accepted(self):
        """A valid event matching the allowlist must be ingested successfully."""
        with Session(self.engine) as db:
            result = ingest_telemetry_batch(db, "test-session", [
                {"seq": 1, "action": "item_sorted", "world": "A1", "mini_game": "A1",
                 "task_def_version": "v1", "data": {}}
            ])
            self.assertGreaterEqual(result["ingested_count"], 1)
            self.assertEqual(result["total_session_events"], 1)
            # Verify actually persisted
            ev = db.exec(select(DBTelemetryEvent).where(
                DBTelemetryEvent.session_id == "test-session")).first()
            self.assertIsNotNone(ev)
            self.assertEqual(ev.action, "item_sorted")

    # ------------------------------------------------------------------
    # 2. Unknown event => REJECTED / flagged
    # ------------------------------------------------------------------
    def test_unknown_event_rejected(self):
        """An event not in the allowlist must be silently dropped with a quality flag."""
        with Session(self.engine) as db:
            result = ingest_telemetry_batch(db, "test-session", [
                {"seq": 1, "action": "totally_fake_action", "world": "A1",
                 "mini_game": "A1", "task_def_version": "v1", "data": {}}
            ])
            self.assertEqual(result["ingested_count"], 0, "Unknown event must not be ingested")
            flags = db.exec(select(DBDataQualityFlag).where(
                DBDataQualityFlag.session_id == "test-session")).all()
            flag_names = [f.flag for f in flags]
            self.assertTrue(
                any("undeclared_event" in fn for fn in flag_names),
                f"Must record undeclared_event flag, got {flag_names}"
            )

    # ------------------------------------------------------------------
    # 3. Missing game definition => FAIL CLOSED
    # ------------------------------------------------------------------
    def test_missing_game_def_fails_closed(self):
        with Session(self.engine) as db:
            with self.assertRaises(RuntimeError) as ctx:
                ingest_telemetry_batch(db, "test-session", [
                    {"seq": 1, "action": "click", "world": "NONEXISTENT_GAME"}
                ])
            self.assertIn("FAIL CLOSED", str(ctx.exception))
            self.assertIn("Missing game definition", str(ctx.exception))

    # ------------------------------------------------------------------
    # 4. Missing event_allowlist => FAIL CLOSED
    # ------------------------------------------------------------------
    def test_missing_allowlist_fails_closed(self):
        old = te._task_definitions
        te._task_definitions = {"games": {"G1": {}}}
        try:
            with Session(self.engine) as db:
                with self.assertRaises(RuntimeError) as ctx:
                    ingest_telemetry_batch(db, "test-session", [
                        {"seq": 1, "action": "click", "world": "G1"}
                    ])
                self.assertIn("FAIL CLOSED", str(ctx.exception))
                self.assertIn("Missing event_allowlist", str(ctx.exception))
        finally:
            te._task_definitions = old

    # ------------------------------------------------------------------
    # 5. Empty event_allowlist => FAIL CLOSED
    # ------------------------------------------------------------------
    def test_empty_allowlist_fails_closed(self):
        old = te._task_definitions
        te._task_definitions = {"games": {"G1": {"event_allowlist": []}}}
        try:
            with Session(self.engine) as db:
                with self.assertRaises(RuntimeError) as ctx:
                    ingest_telemetry_batch(db, "test-session", [
                        {"seq": 1, "action": "click", "world": "G1"}
                    ])
                self.assertIn("FAIL CLOSED", str(ctx.exception))
                self.assertIn("Empty or invalid event_allowlist", str(ctx.exception))
        finally:
            te._task_definitions = old

    # ------------------------------------------------------------------
    # 6. Unreadable configuration => FAIL CLOSED
    # ------------------------------------------------------------------
    def test_config_load_failure_fails_closed(self):
        old = te._task_definitions
        te._task_definitions = None
        try:
            with patch("app.services.telemetry_engine.open",
                        side_effect=IOError("Disk read error")):
                with self.assertRaises(RuntimeError) as ctx:
                    te._get_task_definitions()
                self.assertIn("FAIL CLOSED", str(ctx.exception))
                self.assertIn("Configuration failure", str(ctx.exception))
        finally:
            te._task_definitions = old

    # ------------------------------------------------------------------
    # 7. No silent fallback to {"games": {}}
    # ------------------------------------------------------------------
    def test_no_silent_empty_games_fallback(self):
        """
        Verify the implementation does NOT catch config errors and substitute
        an empty games dict. If _task_definitions is None and config can't load,
        a RuntimeError must be raised — never a silent return of {"games": {}}.
        """
        old = te._task_definitions
        te._task_definitions = None
        try:
            with patch("app.services.telemetry_engine.open",
                        side_effect=FileNotFoundError("no such file")):
                with self.assertRaises(RuntimeError):
                    te._get_task_definitions()
                # If we reach here without RuntimeError, the validator
                # silently substituted an empty config — that is a FAIL.
        finally:
            te._task_definitions = old

    # ------------------------------------------------------------------
    # 8. Events without world field are accepted (non-game events)
    # ------------------------------------------------------------------
    def test_events_without_world_accepted(self):
        """Non-game events (no world field) must pass through without allowlist check."""
        with Session(self.engine) as db:
            result = ingest_telemetry_batch(db, "test-session", [
                {"seq": 1, "action": "session_ping", "screen": "lobby",
                 "client_timestamp": 10000}
            ])
            self.assertEqual(result["ingested_count"], 1)
