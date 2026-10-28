import pytest
from fastapi.testclient import TestClient
from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.pool import StaticPool

from app.main import app
from app.db.session import get_db
from app.core.security import create_token
from app.models.user import DBUser
from app.models.submission import DBSubmission

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

def test_storage_vault_end_to_end_workflow(test_db):
    app.dependency_overrides[get_db] = lambda: test_db
    client = TestClient(app)

    try:
        # 1. Seed admin and participant users
        admin = DBUser(email="curator@alfaaz.org", full_name="Curator", password="hash", status="ADMIN")
        artist = DBUser(email="poet@alfaaz.org", full_name="Poet", password="hash", status="PARTICIPANT")
        test_db.add_all([admin, artist])
        test_db.commit()

        admin_token = create_token("curator@alfaaz.org", "ADMIN")
        artist_token = create_token("poet@alfaaz.org", "PARTICIPANT")

        # 2. Anonymous submission attempt to /vault/submit should be rejected
        res_anon = client.post("/vault/submit", json={
            "submission_type": "Poetry",
            "title": "Unauthenticated Verse",
            "file_url": "https://res.cloudinary.com/test.pdf"
        })
        assert res_anon.status_code == 401

        # 3. Hostile/Invalid URL rejected with 422
        res_xss = client.post("/vault/submit", json={
            "submission_type": "Poetry",
            "title": "Malicious Script",
            "file_url": "javascript:alert(document.domain)"
        }, headers={"Authorization": f"Bearer {artist_token}"})
        assert res_xss.status_code == 422

        # 4. Valid submission by participant
        res_valid = client.post("/vault/submit", json={
            "submission_type": "Poetry",
            "title": "Valley Requiem",
            "file_url": "https://res.cloudinary.com/dmqwjpmjk/raw/upload/valley_requiem.pdf",
            "note": "A quiet reflection on autumn chinar leaves."
        }, headers={"Authorization": f"Bearer {artist_token}"})
        assert res_valid.status_code == 200
        assert res_valid.json() == {"status": "SUCCESS"}

        # 5. Anonymous attempt to view vault submissions -> 401
        res_vault_anon = client.get("/admin/submissions")
        assert res_vault_anon.status_code == 401

        # 6. Participant attempt to view vault submissions -> 403
        res_vault_part = client.get("/admin/submissions", headers={"Authorization": f"Bearer {artist_token}"})
        assert res_vault_part.status_code == 403
        assert "Admin clearance required" in res_vault_part.json()["detail"]

        # 7. Admin retrieval of submissions -> 200 with full metadata
        res_vault_admin = client.get("/admin/submissions", headers={"Authorization": f"Bearer {admin_token}"})
        assert res_vault_admin.status_code == 200
        submissions = res_vault_admin.json()
        assert len(submissions) >= 1
        item = next(s for s in submissions if s["title"] == "Valley Requiem")
        assert item["submission_type"] == "Poetry"
        assert item["author_email"] == "poet@alfaaz.org"
        assert item["file_url"] == "https://res.cloudinary.com/dmqwjpmjk/raw/upload/valley_requiem.pdf"
        assert item["note"] == "A quiet reflection on autumn chinar leaves."
        assert "created_at" in item
    finally:
        app.dependency_overrides.pop(get_db, None)
