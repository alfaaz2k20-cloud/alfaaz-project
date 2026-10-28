import pytest
from fastapi import HTTPException
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.session import get_db
from app.core.security import create_token
from app.models.user import DBUser
from app.models.club import DBClubApplication
from app.models.event import DBEventRegistration
from app.models.exhibition import DBExhibitionApplication
from app.models.submission import DBSubmission
from app.models.audit import DBAuditLog
from app.schemas.auth import StatusUpdate
from app.routers.admin import delete_user, update_user_status

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

def test_delete_user_self_deletion_rejected(test_db):
    admin = DBUser(email="admin@alfaaz.org", full_name="Admin", password="hash", status="ADMIN")
    test_db.add(admin)
    test_db.commit()

    admin_payload = {"email": "admin@alfaaz.org", "status": "ADMIN"}
    with pytest.raises(HTTPException) as exc:
        delete_user("admin@alfaaz.org", db=test_db, admin_user=admin_payload)
    assert exc.value.status_code == 400
    assert "Cannot purge your own administrator account" in exc.value.detail

def test_delete_user_admin_target_rejected(test_db):
    admin1 = DBUser(email="admin1@alfaaz.org", full_name="Admin One", password="hash", status="ADMIN")
    admin2 = DBUser(email="admin2@alfaaz.org", full_name="Admin Two", password="hash", status="ADMIN")
    test_db.add_all([admin1, admin2])
    test_db.commit()

    admin_payload = {"email": "admin1@alfaaz.org", "status": "ADMIN"}
    with pytest.raises(HTTPException) as exc:
        delete_user("admin2@alfaaz.org", db=test_db, admin_user=admin_payload)
    assert exc.value.status_code == 403
    assert "Cannot delete an admin account" in exc.value.detail

def test_delete_user_not_found(test_db):
    admin = DBUser(email="admin@alfaaz.org", full_name="Admin", password="hash", status="ADMIN")
    test_db.add(admin)
    test_db.commit()

    admin_payload = {"email": "admin@alfaaz.org", "status": "ADMIN"}
    with pytest.raises(HTTPException) as exc:
        delete_user("ghost@alfaaz.org", db=test_db, admin_user=admin_payload)
    assert exc.value.status_code == 404

def test_delete_user_participant_cascades_all_records_and_audits(test_db):
    admin = DBUser(email="admin@alfaaz.org", full_name="Admin", password="hash", status="ADMIN")
    user = DBUser(email="artist@alfaaz.org", full_name="Artist", password="hash", status="PARTICIPANT")
    test_db.add_all([admin, user])
    test_db.commit()

    # Seed related records across subsystems
    sub = DBSubmission(submission_type="Poetry", title="Test Poem", file_url="https://res.cloudinary.com/test.pdf", author_email="artist@alfaaz.org")
    club = DBClubApplication(user_email="artist@alfaaz.org", club_name="Film Club", note="Film buff")
    event_reg = DBEventRegistration(event_id=1, user_email="artist@alfaaz.org")
    exhib_app = DBExhibitionApplication(
        user_email="artist@alfaaz.org", full_name="Artist", age=22, address="Srinagar",
        whatsapp="9999999999", genre="Abstract", medium="Oil", portfolio_url="https://portfolio.com",
        over_19=True, agreed_to_screening=True
    )
    test_db.add_all([sub, club, event_reg, exhib_app])
    test_db.commit()

    admin_payload = {"email": "admin@alfaaz.org", "status": "ADMIN"}
    res = delete_user("artist@alfaaz.org", db=test_db, admin_user=admin_payload)
    assert res["status"] == "SUCCESS"

    # Confirm user is purged
    assert test_db.query(DBUser).filter(DBUser.email == "artist@alfaaz.org").first() is None
    # Confirm related records are purged
    assert test_db.query(DBSubmission).filter(DBSubmission.author_email == "artist@alfaaz.org").count() == 0
    assert test_db.query(DBClubApplication).filter(DBClubApplication.user_email == "artist@alfaaz.org").count() == 0
    assert test_db.query(DBEventRegistration).filter(DBEventRegistration.user_email == "artist@alfaaz.org").count() == 0
    assert test_db.query(DBExhibitionApplication).filter(DBExhibitionApplication.user_email == "artist@alfaaz.org").count() == 0

    # Confirm audit log entry was written
    audit = test_db.query(DBAuditLog).filter(DBAuditLog.target_id == "artist@alfaaz.org").first()
    assert audit is not None
    assert audit.action == "PURGE_USER"
    assert audit.admin_email == "admin@alfaaz.org"

def test_demote_last_admin_rejected(test_db):
    admin = DBUser(email="sole_admin@alfaaz.org", full_name="Sole Admin", password="hash", status="ADMIN")
    test_db.add(admin)
    test_db.commit()

    admin_payload = {"email": "sole_admin@alfaaz.org", "status": "ADMIN"}
    update_req = StatusUpdate(email="sole_admin@alfaaz.org", status="PARTICIPANT")

    with pytest.raises(HTTPException) as exc:
        update_user_status(update_req, db=test_db, admin_user=admin_payload)
    assert exc.value.status_code == 400
    assert "Cannot demote the last administrator account" in exc.value.detail

def test_demote_admin_when_multiple_admins_exist(test_db):
    admin1 = DBUser(email="admin1@alfaaz.org", full_name="Admin 1", password="hash", status="ADMIN")
    admin2 = DBUser(email="admin2@alfaaz.org", full_name="Admin 2", password="hash", status="ADMIN")
    test_db.add_all([admin1, admin2])
    test_db.commit()

    admin_payload = {"email": "admin1@alfaaz.org", "status": "ADMIN"}
    update_req = StatusUpdate(email="admin2@alfaaz.org", status="PARTICIPANT")

    res = update_user_status(update_req, db=test_db, admin_user=admin_payload)
    assert res["status"] == "SUCCESS"
    assert test_db.query(DBUser).filter(DBUser.email == "admin2@alfaaz.org").first().status == "PARTICIPANT"

def test_endpoint_independent_role_enforcement(test_db):
    # Override get_db to return test_db
    app.dependency_overrides[get_db] = lambda: test_db
    client = TestClient(app)

    try:
        # Seed an admin and a participant
        admin = DBUser(email="super@alfaaz.org", full_name="Super", password="hash", status="ADMIN")
        participant = DBUser(email="regular@alfaaz.org", full_name="Regular", password="hash", status="PARTICIPANT")
        test_db.add_all([admin, participant])
        test_db.commit()

        part_token = create_token("regular@alfaaz.org", "PARTICIPANT")
        admin_token = create_token("super@alfaaz.org", "ADMIN")

        # 1. Anonymous request to DELETE /admin/users/regular@alfaaz.org -> 401 (HTTPBearer unauthenticated)
        res_anon = client.delete("/admin/users/regular@alfaaz.org")
        assert res_anon.status_code == 401

        # 2. Participant token to DELETE /admin/users/regular@alfaaz.org -> 403 Forbidden
        res_part = client.delete("/admin/users/regular@alfaaz.org", headers={"Authorization": f"Bearer {part_token}"})
        assert res_part.status_code == 403
        assert "Admin clearance required" in res_part.json()["detail"]

        # 3. Participant token to POST /admin/update_status -> 403 Forbidden
        res_update_part = client.post("/admin/update_status", json={"email": "regular@alfaaz.org", "status": "ADMIN"}, headers={"Authorization": f"Bearer {part_token}"})
        assert res_update_part.status_code == 403

        # 4. Admin token to DELETE /admin/users/regular@alfaaz.org -> 200 SUCCESS
        res_admin = client.delete("/admin/users/regular@alfaaz.org", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_admin.status_code == 200
        assert res_admin.json()["status"] == "SUCCESS"
    finally:
        app.dependency_overrides.pop(get_db, None)
