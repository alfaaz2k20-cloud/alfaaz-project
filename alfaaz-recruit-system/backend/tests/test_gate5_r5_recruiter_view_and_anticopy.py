import os
import sys
import json
import uuid
import re
import unittest
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, create_engine, SQLModel, select
from sqlalchemy.pool import StaticPool
from fastapi.testclient import TestClient

from recruit_system.main import app
from recruit_system.db.session import get_db
from recruit_system.core.security import create_token
from recruit_system.models.recruit import (
    DBSession, DBApplicantIdentity, DBTaskAssignment,
    DBFeature, DBEvidence, DBRecruiterAccessLog,
    DBTelemetryEvent, DBSJTResponse
)


class TestGate5R5RecruiterViewAndAntiCopy(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine(
            "sqlite:///:memory:",
            connect_args={"check_same_thread": False},
            poolclass=StaticPool
        )
        SQLModel.metadata.create_all(self.engine)

        def override_get_db():
            with Session(self.engine) as session:
                yield session

        app.dependency_overrides[get_db] = override_get_db
        self.client = TestClient(app)
        self.admin_token = create_token("admin@alfaaz.test", "ADMIN")
        self.headers = {"Authorization": f"Bearer {self.admin_token}"}

    def tearDown(self):
        app.dependency_overrides.clear()

    def test_recruiter_sessions_ordering_and_operational_filtering(self):
        """
        Verify:
        - Chronological ordering by submission time (created_at desc).
        - Operational session-status filtering works (e.g. ?status=COMPLETE).
        """
        with Session(self.engine) as db:
            s1 = DBSession(session_id="sess-1", status="CONSENTED", created_at=datetime(2026, 1, 1, 10, 0, tzinfo=timezone.utc))
            s2 = DBSession(session_id="sess-2", status="COMPLETE", created_at=datetime(2026, 1, 1, 12, 0, tzinfo=timezone.utc))
            s3 = DBSession(session_id="sess-3", status="ACTIVE", created_at=datetime(2026, 1, 1, 11, 0, tzinfo=timezone.utc))
            db.add_all([s1, s2, s3])
            db.commit()

        # All sessions ordered by created_at desc: sess-2, sess-3, sess-1
        res = self.client.get("/recruit/research/sessions", headers=self.headers)
        self.assertEqual(res.status_code, 200)
        items = res.json()
        self.assertEqual(len(items), 3)
        self.assertEqual(items[0]["session_id"], "sess-2")
        self.assertEqual(items[1]["session_id"], "sess-3")
        self.assertEqual(items[2]["session_id"], "sess-1")

        # Operational status filter: COMPLETE
        res_filtered = self.client.get("/recruit/research/sessions?status=COMPLETE", headers=self.headers)
        self.assertEqual(res_filtered.status_code, 200)
        items_filtered = res_filtered.json()
        self.assertEqual(len(items_filtered), 1)
        self.assertEqual(items_filtered[0]["session_id"], "sess-2")

    def test_prohibited_evidence_field_sort_filter_search(self):
        """
        Verify that attempting to sort, filter, or search on evidence fields returns 400 Bad Request.
        """
        prohibited = ["band=HIGH", "parameter=empathy", "confidence=SUBSTANTIAL", "relationship=ALIGNED",
                      "sort=confidence", "search=conscientiousness", "rank=1", "fit=high"]
        for p in prohibited:
            res = self.client.get(f"/recruit/research/sessions?{p}", headers=self.headers)
            self.assertEqual(res.status_code, 400, f"Expected 400 for prohibited parameter {p}, got {res.status_code}")
            self.assertIn("prohibited", res.json()["detail"].lower())

    def test_recruiter_evidence_view_neutral_uncalibrated_and_safeguards(self):
        """
        Verify:
        - Recruiter view uses 'evidence_by_parameter'.
        - While uncalibrated: game_band=UNCALIBRATED, relationship=NOT_COMPUTED, consistency=NOT_COMPUTED.
        - Methodological note and neutral trade-off statement exist.
        - Overall fit, recommendation, and ranking are absent.
        - Access is logged in DBRecruiterAccessLog.
        """
        s_id = str(uuid.uuid4())
        with Session(self.engine) as db:
            db.add(DBSession(session_id=s_id, status="COMPLETE", created_at=datetime.now(timezone.utc)))
            db.add(DBApplicantIdentity(session_id=s_id, full_name="Candidate Zero", email="zero@test.com"))
            # Seed 7 SJT responses
            for s_idx in range(1, 8):
                db.add(DBSJTResponse(
                    session_id=s_id,
                    scenario_id=f"S{s_idx}",
                    option_id=f"S{s_idx}A",
                    t_ms=1500.0
                ))
            # Seed valid telemetry events for A1 and A2 (so feature extraction succeeds for both)
            db.add(DBTelemetryEvent(
                session_id=s_id,
                seq=1,
                segment_id=1,
                t_ms=1000.0,
                screen="archive",
                server_received=datetime.now(timezone.utc),
                mini_game="A1",
                action="document_filed",
                data_json=json.dumps({"is_correct": True, "dwell_ms": 2000.0})
            ))
            db.add_all([
                DBTelemetryEvent(
                    session_id=s_id,
                    seq=2,
                    segment_id=1,
                    t_ms=2000.0,
                    screen="archive",
                    server_received=datetime.now(timezone.utc),
                    mini_game="A2",
                    action="exception_resolved",
                    data_json=json.dumps({"is_correct": True})
                ),
                DBTelemetryEvent(
                    session_id=s_id,
                    seq=3,
                    segment_id=1,
                    t_ms=2500.0,
                    screen="archive",
                    server_received=datetime.now(timezone.utc),
                    mini_game="A2",
                    action="decision_logged",
                    data_json=json.dumps({"is_correct": True})
                ),
                DBTelemetryEvent(
                    session_id=s_id,
                    seq=4,
                    segment_id=1,
                    t_ms=3000.0,
                    screen="archive",
                    server_received=datetime.now(timezone.utc),
                    mini_game="A2",
                    action="decision_logged",
                    data_json=json.dumps({"is_correct": True})
                )
            ])
            db.commit()

        res = self.client.get(f"/recruit/research/session/{s_id}", headers=self.headers)
        self.assertEqual(res.status_code, 200)
        data = res.json()

        # Evidence by parameter structure
        self.assertIn("evidence_by_parameter", data)
        ev_c = data["evidence_by_parameter"]["conscientiousness"]
        self.assertEqual(ev_c["game_status"], "USABLE")
        self.assertEqual(ev_c["game_band"], "UNCALIBRATED")
        self.assertEqual(ev_c["consistency"], "NOT_COMPUTED")
        self.assertEqual(ev_c["relationship"], "NOT_COMPUTED")
        self.assertEqual(ev_c["confidence"], "MODERATE")

        # Safeguards & Neutral Language
        safeguards = data["metadata"]["safeguards"]
        self.assertIn("ipsative_note", safeguards)
        self.assertIn("sjt_emphasis_note", safeguards)
        self.assertIn("higher / middle / lower", safeguards["sjt_emphasis_note"])

        # Absences: no recommendation, fit, or ranking
        self.assertNotIn("recommendation", data)
        self.assertNotIn("overall_fit", data)
        self.assertNotIn("ranking", data)

        # Audit log verified
        with Session(self.engine) as db:
            log_entries = db.exec(select(DBRecruiterAccessLog).where(DBRecruiterAccessLog.session_id == s_id)).all()
            self.assertEqual(len(log_entries), 1)
            self.assertEqual(log_entries[0].admin_email, "admin@alfaaz.test")

    def test_frontend_anti_copy_and_interception_absence(self):
        """
        Verify that anti-copy code is completely absent from frontend source:
        - No clipboard.write* or writeText
        - No contextmenu preventDefault
        - No copy/cut/dragstart preventDefault
        - No shortcut/F12 keydown interception
        - No global user-select:none on * or body
        """
        recruit_js_path = os.path.join("frontend", "src", "recruit.js")
        with open(recruit_js_path, "r", encoding="utf-8") as f:
            js_src = f.read()

        self.assertNotIn("clipboard.write", js_src)
        self.assertNotIn("contextmenu", js_src)
        self.assertNotIn("PrintScreen", js_src)
        self.assertNotIn("addEventListener('copy'", js_src)
        self.assertNotIn("addEventListener('cut'", js_src)
        self.assertNotIn("addEventListener('dragstart'", js_src)

        recruit_html_path = os.path.join("frontend", "recruit.html")
        with open(recruit_html_path, "r", encoding="utf-8") as f:
            html_src = f.read()

        self.assertNotIn("user-select: none !important", html_src)
        self.assertNotIn("*, *::before", html_src)
        self.assertIn(".game-interactive-surface", html_src)
        self.assertIn("@media print", html_src)

    def test_frontend_research_view_labels_and_neutrality(self):
        """
        Verify frontend research client displays 'Evidence by parameter' and neutral status filter.
        """
        research_js_path = os.path.join("frontend", "src", "research.js")
        with open(research_js_path, "r", encoding="utf-8") as f:
            js_src = f.read()

        self.assertIn("Evidence by parameter", js_src)
        self.assertIn("statusFilter", js_src)
        self.assertIn("Relative emphasis in this SJT's trade-offs", js_src)
        self.assertNotIn("traffic-light", js_src)
        self.assertNotIn("overall fit", js_src.lower())
        self.assertNotIn("recommendation", js_src.lower())


if __name__ == "__main__":
    unittest.main()
