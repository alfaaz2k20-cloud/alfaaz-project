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

VALID_CONFIDENCE_VALUES = {"LIMITED", "MODERATE", "SUBSTANTIAL"}


class TestConfidenceContract(unittest.TestCase):
    """
    Proves the API contract: confidence is always a categorical string
    from {LIMITED, MODERATE, SUBSTANTIAL}, never numeric.
    """

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
    def test_api_returns_categorical_confidence_for_all_entries(
        self, mock_extract, mock_integrate
    ):
        mock_extract.return_value = None
        mock_integrate.return_value = [
            DBEvidence(
                session_id="test-session",
                parameter="Empathy",
                sjt_band="SUPPORTIVE",
                game_band="UNCALIBRATED",
                consistency="NOT_COMPUTED",
                relationship="NOT_COMPUTED",
                confidence="LIMITED",
            ),
            DBEvidence(
                session_id="test-session",
                parameter="Conscientiousness",
                sjt_band="SUPPORTIVE",
                game_band="UNCALIBRATED",
                consistency="NOT_COMPUTED",
                relationship="NOT_COMPUTED",
                confidence="MODERATE",
            ),
        ]

        res = self.client.get("/recruit/research/sessions/test-session")
        self.assertEqual(res.status_code, 200, res.text)
        data = res.json()

        evidence_dict = data.get("evidence_by_parameter", {})
        self.assertGreater(len(evidence_dict), 0, "evidence_by_parameter must not be empty")

        for param, ev in evidence_dict.items():
            # confidence MUST always be present — do NOT skip with 'if'
            self.assertIn("confidence", ev,
                          f"'{param}' evidence must contain 'confidence' key")

            conf = ev["confidence"]
            self.assertIsInstance(conf, str,
                                 f"'{param}': confidence must be str, got {type(conf).__name__}")
            self.assertIn(conf, VALID_CONFIDENCE_VALUES,
                          f"'{param}': confidence '{conf}' is not a valid category")

            # Ensure no numeric confidence leaked into any field
            for key, val in ev.items():
                if "confidence" in key.lower() or "index" in key.lower():
                    self.assertNotIsInstance(val, (int, float),
                                            f"'{param}.{key}' must not be numeric, got {val}")

    @patch("app.routers.research_view.integrate_session_evidence")
    @patch("app.routers.research_view.extract_session_features")
    def test_no_numeric_confidence_anywhere_in_payload(
        self, mock_extract, mock_integrate
    ):
        """Scan the entire response recursively for numeric confidence values."""
        mock_extract.return_value = None
        mock_integrate.return_value = [
            DBEvidence(
                session_id="test-session",
                parameter="empathy",
                confidence="LIMITED",
            ),
        ]

        res = self.client.get("/recruit/research/sessions/test-session")
        self.assertEqual(res.status_code, 200, res.text)
        data = res.json()

        def _scan(obj, path=""):
            if isinstance(obj, dict):
                for k, v in obj.items():
                    if "confidence" in k.lower():
                        self.assertNotIsInstance(
                            v, (int, float),
                            f"Numeric confidence found at {path}.{k}: {v}"
                        )
                    _scan(v, f"{path}.{k}")
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    _scan(item, f"{path}[{i}]")

        _scan(data)
