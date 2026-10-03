import unittest
import sys
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
from app.main import app
from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature, DBEvidence, DBConsentRecord
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine, select
from app.db.session import get_db
import json

class TestEndToEndLineage(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite://",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
        SQLModel.metadata.create_all(self.engine)
        
        def override_get_db():
            with Session(self.engine) as session:
                yield session
                
        app.dependency_overrides[get_db] = override_get_db
        self.client = TestClient(app)
        
        with Session(self.engine) as db:
            db.add(DBSession(session_id="e2e-session", status="ACTIVE"))
            db.add(DBConsentRecord(session_id="e2e-session", consent_text_version="v1", confirmed_18_plus=True, choices={"research_telemetry": True}))
            db.commit()

    def test_end_to_end_lineage(self):
        events = [
            {"seq": 1, "action": "item_sorted", "world": "A1", "mini_game": "A1", "client_timestamp": 12345, "task_def_version": "v1", "data_json": json.dumps({"is_correct": True, "dwell_ms": 3000, "choice": "folder_1", "stimulus_id": "A1_01"})},
            {"seq": 2, "action": "decision_logged", "world": "A2", "mini_game": "A2", "client_timestamp": 12346, "task_def_version": "v1", "data_json": json.dumps({"is_genuine_exception": True, "is_correct": True, "stimulus_id": "none1"})},
            {"seq": 3, "action": "decision_logged", "world": "A2", "mini_game": "A2", "client_timestamp": 12347, "task_def_version": "v1", "data_json": json.dumps({"is_genuine_exception": True, "is_correct": True, "stimulus_id": "none2"})},
            {"seq": 4, "action": "decision_logged", "world": "A2", "mini_game": "A2", "client_timestamp": 12348, "task_def_version": "v1", "data_json": json.dumps({"is_genuine_exception": True, "is_correct": True, "stimulus_id": "none3"})},
            {"seq": 5, "action": "trial_submit", "world": "F1", "mini_game": "F1", "client_timestamp": 12349, "task_def_version": "v1", "data_json": json.dumps({})},
        ]
        res = self.client.post("/recruit/telemetry", json={"session_id": "e2e-session", "events": events})
        self.assertEqual(res.status_code, 200, res.text)
        
        with Session(self.engine) as db:
            sess = db.get(DBSession, "e2e-session")
            sess.status = "COMPLETE"
            db.commit()
            
        def override_require_admin():
            return {"email": "admin@test.com", "status": "ADMIN"}
        from app.routers.research_view import require_admin as rv_require_admin
        app.dependency_overrides[rv_require_admin] = override_require_admin
        
        res = self.client.get("/recruit/research/sessions/e2e-session")
        self.assertEqual(res.status_code, 200, res.text)
        data = res.json()
        
        features = data.get("features", [])
        
        # Verify F1 is returned as quarantined
        f1_feat = next((f for f in features if f["mini_game"] == "F1"), None)
        self.assertIsNotNone(f1_feat)
        self.assertFalse(f1_feat["valid"])
        self.assertIn("feature_not_implemented", str(f1_feat))
        
        evidence = data.get("evidence_by_parameter", {})
        conscientiousness = evidence.get("conscientiousness")
        self.assertIsNotNone(conscientiousness)
        self.assertEqual(conscientiousness["game_band"], "UNCALIBRATED")
        self.assertEqual(conscientiousness["consistency"], "NOT_COMPUTED")
        
        for param, ev in evidence.items():
            self.assertIn(ev["confidence"], ["LIMITED", "MODERATE"])
