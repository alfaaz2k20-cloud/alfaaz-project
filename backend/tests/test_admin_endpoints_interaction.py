import pytest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.session import get_db
from app.core.security import create_token
from app.models.user import DBUser
from app.models.event import DBEvent, DBEventRegistration
from app.models.club import DBClubApplication
from app.models.exhibition import DBExhibition
from app.models.audit import DBAuditLog

@pytest.fixture
def test_db():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session

def test_admin_email_status_reporting(test_db):
    app.dependency_overrides[get_db] = lambda: test_db
    client = TestClient(app)

    try:
        admin_token = create_token("admin@alfaaz.org", "ADMIN")
        res = client.get("/admin/email/status", headers={"Authorization": f"Bearer {admin_token}"})
        assert res.status_code == 200
        data = res.json()
        assert "provider" in data
        assert "make_webhook_configured" in data
        assert isinstance(data["make_webhook_configured"], bool)
    finally:
        app.dependency_overrides.pop(get_db, None)

def test_admin_email_test_dispatch_success_and_failure(test_db):
    app.dependency_overrides[get_db] = lambda: test_db
    client = TestClient(app)

    try:
        admin = DBUser(email="admin@alfaaz.org", full_name="Admin", password="hash", status="ADMIN")
        test_db.add(admin)
        test_db.commit()

        admin_token = create_token("admin@alfaaz.org", "ADMIN")

        # 1. Success mock
        with patch("app.routers.admin.send_system_email", return_value=True):
            res_ok = client.post("/admin/email/test", headers={"Authorization": f"Bearer {admin_token}"})
            assert res_ok.status_code == 200
            assert res_ok.json() == {"status": "SENT"}

        # 2. Failure mock
        with patch("app.routers.admin.send_system_email", return_value=False):
            res_fail = client.post("/admin/email/test", headers={"Authorization": f"Bearer {admin_token}"})
            assert res_fail.status_code == 200
            assert res_fail.json() == {"status": "FAILED"}
    finally:
        app.dependency_overrides.pop(get_db, None)

def test_admin_data_retrieval_endpoints(test_db):
    app.dependency_overrides[get_db] = lambda: test_db
    client = TestClient(app)

    try:
        admin = DBUser(email="admin@alfaaz.org", full_name="Admin", password="hash", status="ADMIN")
        event = DBEvent(name="Gallery Walk", description="Srinagar walk", event_date="Sunday", capacity=20, registration_open=True)
        club = DBClubApplication(user_email="fan@alfaaz.org", club_name="Photography", note="Loves film")
        exhib = DBExhibition(title="Kaamil III", is_active=True, date_text="Winter 2026", venue="Mahatta Art Gallery")
        audit = DBAuditLog(admin_email="admin@alfaaz.org", action="TEST_ACTION", target_type="system", target_id="1")
        test_db.add_all([admin, event, club, exhib, audit])
        test_db.commit()

        admin_token = create_token("admin@alfaaz.org", "ADMIN")

        # GET /admin/users
        res_users = client.get("/admin/users", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_users.status_code == 200
        assert any(u["email"] == "admin@alfaaz.org" for u in res_users.json())

        # GET /admin/events
        res_events = client.get("/admin/events", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_events.status_code == 200
        assert any(e["name"] == "Gallery Walk" for e in res_events.json())

        # GET /admin/club-applications
        res_clubs = client.get("/admin/club-applications", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_clubs.status_code == 200
        assert any(c["club_name"] == "Photography" for c in res_clubs.json())

        # GET /admin/exhibitions/cycles
        res_cycles = client.get("/admin/exhibitions/cycles", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_cycles.status_code == 200
        assert res_cycles.json()["current"] == "Kaamil III"
        assert "Kaamil III" in res_cycles.json()["cycles"]

        # GET /admin/audit-logs
        res_audit = client.get("/admin/audit-logs", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_audit.status_code == 200
        logs = res_audit.json()
        assert len(logs) >= 1
        assert logs[0]["action"] == "TEST_ACTION"
    finally:
        app.dependency_overrides.pop(get_db, None)
