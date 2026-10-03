import unittest
import sys
from pathlib import Path
from unittest.mock import patch
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from app.main import app
from app.models.recruit import DBSession, DBEvidence
from sqlalchemy.pool import StaticPool
from sqlmodel import Session, SQLModel, create_engine
from app.db.session import get_db

class TestConfidenceContract(unittest.TestCase):
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
                
        def override_require_admin():
            return {"email": "admin@test.com", "status": "ADMIN"}
            
        app.dependency_overrides[get_db] = override_get_db
        from app.routers.research_view import require_admin as rv_require_admin
        app.dependency_overrides[rv_require_admin] = override_require_admin
        self.client = TestClient(app)
        
        with Session(self.engine) as db:
            db.add(DBSession(session_id="test-session", status="COMPLETE"))
            db.commit()

    @patch("app.routers.research_view.integrate_session_evidence")
    @patch("app.routers.research_view.extract_session_features")
    def test_api_returns_categorical_confidence(self, mock_extract, mock_integrate):
        mock_extract.return_value = None
        mock_integrate.return_value = [
            DBEvidence(
                session_id="test-session",
                parameter="Empathy",
                sjt_band="SUPPORTIVE",
                game_band="UNCALIBRATED",
                consistency="NOT_COMPUTED",
                relationship="NOT_COMPUTED",
                confidence="LIMITED"
            ),
            DBEvidence(
                session_id="test-session",
                parameter="Conscientiousness",
                sjt_band="SUPPORTIVE",
                game_band="UNCALIBRATED",
                consistency="NOT_COMPUTED",
                relationship="NOT_COMPUTED",
                confidence="MODERATE"
            )
        ]
        
        # Fetch research dossier
        res = self.client.get("/recruit/research/sessions/test-session")
        self.assertEqual(res.status_code, 200, res.text)
        data = res.json()
        
        evidence_dict = data.get("evidence_by_parameter", {})
        self.assertGreater(len(evidence_dict), 0)
        
        for param, ev in evidence_dict.items():
            if "confidence" in ev:
                conf = ev["confidence"]
                self.assertIsInstance(conf, str, "Confidence MUST be a string, not float or numeric.")
                self.assertIn(conf, ["LIMITED", "MODERATE", "SUBSTANTIAL"], f"Confidence category {conf} is invalid.")
                self.assertNotIn("score", conf.lower())
                self.assertNotIn("index", conf.lower())
