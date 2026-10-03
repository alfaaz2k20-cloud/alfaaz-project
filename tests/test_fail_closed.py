import unittest
import sys
from pathlib import Path
from unittest.mock import patch, mock_open

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.services.telemetry_engine import ingest_telemetry_batch
from app.models.recruit import DBSession
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine

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

    def test_missing_game_def_fails_closed(self):
        with Session(self.engine) as db:
            with self.assertRaises(RuntimeError) as context:
                ingest_telemetry_batch(db, "test-session", [{"action": "click", "world": "NONEXISTENT_GAME", "seq": 1}])
            self.assertIn("FAIL CLOSED: Missing game definition", str(context.exception))

    def test_missing_allowlist_fails_closed(self):
        import app.services.telemetry_engine as te
        old = te._task_definitions
        te._task_definitions = {"games": {"G1": {}}}
        try:
            with Session(self.engine) as db:
                with self.assertRaises(RuntimeError) as context:
                    ingest_telemetry_batch(db, "test-session", [{"action": "click", "world": "G1", "seq": 1}])
                self.assertIn("FAIL CLOSED: Missing event_allowlist", str(context.exception))
        finally:
            te._task_definitions = old

    def test_empty_allowlist_fails_closed(self):
        import app.services.telemetry_engine as te
        old = te._task_definitions
        te._task_definitions = {"games": {"G1": {"event_allowlist": []}}}
        try:
            with Session(self.engine) as db:
                with self.assertRaises(RuntimeError) as context:
                    ingest_telemetry_batch(db, "test-session", [{"action": "click", "world": "G1", "seq": 1}])
                self.assertIn("FAIL CLOSED: Empty or invalid event_allowlist", str(context.exception))
        finally:
            te._task_definitions = old

    def test_config_load_failure_fails_closed(self):
        import app.services.telemetry_engine as te
        old = te._task_definitions
        te._task_definitions = None
        # Mock open to raise exception
        with patch("app.services.telemetry_engine.open", side_effect=IOError("Disk read error")):
            with Session(self.engine) as db:
                with self.assertRaises(RuntimeError) as context:
                    te._get_task_definitions()
                self.assertIn("FAIL CLOSED: Configuration failure", str(context.exception))
        te._task_definitions = old

