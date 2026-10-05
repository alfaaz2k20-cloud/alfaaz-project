import unittest
import os
import sys
import json
import uuid

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from fastapi.testclient import TestClient
from app.main import app
from app.core.security import create_token
from app.models.recruit import DBSession, DBApplicantIdentity, DBRecruiterAccessLog
from app.db.session import SessionLocal

client = TestClient(app)

class TestGate5ResearchAndIntegration(unittest.TestCase):
    def setUp(self):
        self.db = SessionLocal()
        self.session_id = str(uuid.uuid4())
        
        # Create dummy session
        sess = DBSession(session_id=self.session_id, status="COMPLETE")
        identity = DBApplicantIdentity(
            session_id=self.session_id,
            full_name="Fatima Zahra",
            email="fatima@example.com"
        )
        self.db.add(sess)
        self.db.add(identity)
        self.db.commit()

        # Generate tokens
        self.admin_token = create_token("admin@alfaaz.com", "ADMIN")
        self.user_token = create_token("user@example.com", "PARTICIPANT")

    def tearDown(self):
        self.db.close()

    def test_unauthenticated_research_access_denied(self):
        resp = client.get("/recruit/research/sessions")
        self.assertIn(resp.status_code, [401, 403]) # No bearer header

    def test_non_admin_research_access_denied(self):
        resp = client.get(
            "/recruit/research/sessions",
            headers={"Authorization": f"Bearer {self.user_token}"}
        )
        self.assertIn(resp.status_code, [401, 403]) # User is not ADMIN

    def test_authenticated_admin_sessions_list(self):
        resp = client.get(
            "/recruit/research/sessions",
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()
        self.assertIsInstance(data, list)
        matching = [s for s in data if s["session_id"] == self.session_id]
        self.assertEqual(len(matching), 1)
        self.assertEqual(matching[0]["full_name"], "Fatima Zahra")

    def test_authenticated_session_detail_and_access_logging(self):
        resp = client.get(
            f"/recruit/research/session/{self.session_id}",
            headers={"Authorization": f"Bearer {self.admin_token}"}
        )
        self.assertEqual(resp.status_code, 200)
        data = resp.json()

        self.assertIn("metadata", data)
        self.assertIn("safeguards", data["metadata"])
        self.assertIn("evidence_by_parameter", data)

        # Check access audit logging
        log_entry = self.db.query(DBRecruiterAccessLog).filter(
            DBRecruiterAccessLog.session_id == self.session_id
        ).first()
        self.assertIsNotNone(log_entry)
        self.assertEqual(log_entry.admin_email, "admin@alfaaz.com")

if __name__ == "__main__":
    unittest.main()
