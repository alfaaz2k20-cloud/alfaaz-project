import pytest
from fastapi import HTTPException
from sqlmodel import SQLModel, Session, create_engine
from sqlalchemy.pool import StaticPool
from app.models.club import DBClubApplication
from app.models.event import DBEvent, DBEventRegistration
from app.schemas.club import ClubApplicationCreate
from app.schemas.event import EventRegister
from app.routers.clubs import apply_to_club
from app.routers.events import get_active_events, register_for_event

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

def test_club_apply_success_and_reapply_after_rejection(test_db):
    user = {"email": "artist@alfaaz.org", "status": "PARTICIPANT"}
    req = ClubApplicationCreate(club_name="Film Club", note="Interested in cinematography")

    # 1. First application
    res = apply_to_club(req, db=test_db, user=user)
    assert res == {"status": "PENDING"}

    # 2. Applying again while PENDING should fail
    with pytest.raises(HTTPException) as exc_info:
        apply_to_club(req, db=test_db, user=user)
    assert exc_info.value.status_code == 400
    assert "Pending application exists" in exc_info.value.detail

    # 3. Reject the application
    app = test_db.query(DBClubApplication).filter_by(user_email=user["email"]).first()
    app.status = "REJECTED"
    app.admin_note = "Portfolio incomplete"
    test_db.commit()

    # 4. Re-applying after REJECTED should succeed (no UniqueConstraint crash!)
    req_updated = ClubApplicationCreate(club_name="Film Club", note="Updated portfolio link")
    res2 = apply_to_club(req_updated, db=test_db, user=user)
    assert res2 == {"status": "PENDING"}

    # Verify the row was updated, not duplicated
    total_apps = test_db.query(DBClubApplication).filter_by(user_email=user["email"]).count()
    assert total_apps == 1

def test_club_apply_when_already_approved(test_db):
    user = {"email": "writer@alfaaz.org", "status": "PARTICIPANT"}
    # Pre-approve in Literature
    app = DBClubApplication(user_email=user["email"], club_name="Literature", status="APPROVED")
    test_db.add(app)
    test_db.commit()

    # Try applying to another club
    req = ClubApplicationCreate(club_name="Philosophy", note="Want to join philosophy too")
    with pytest.raises(HTTPException) as exc_info:
        apply_to_club(req, db=test_db, user=user)
    assert exc_info.value.status_code == 400
    assert "Already a member of Literature" in exc_info.value.detail

def test_event_active_and_registration(test_db):
    # Create an event with capacity 1
    ev = DBEvent(name="Kaamil III", capacity=1, registration_open=True, event_date="Sunday")
    test_db.add(ev)
    test_db.commit()
    test_db.refresh(ev)

    # 1. Verify get_active_events returns it
    active = get_active_events(db=test_db)
    assert len(active) == 1
    assert active[0]["name"] == "Kaamil III"
    assert active[0]["registered"] == 0
    assert active[0]["spots_left"] == 1
    assert active[0]["full"] is False

    # 2. Register first user
    user1 = {"email": "guest1@alfaaz.org", "status": "PARTICIPANT"}
    reg1 = EventRegister(event_id=ev.id, whatsapp_number="+917006612345")
    res1 = register_for_event(reg1, db=test_db, user=user1)
    assert res1 == {"status": "SUCCESS"}

    # 3. Duplicate registration by same user fails
    with pytest.raises(HTTPException) as exc_dup:
        register_for_event(reg1, db=test_db, user=user1)
    assert exc_dup.value.status_code == 400
    assert "Already registered" in exc_dup.value.detail

    # 4. Register second user when capacity is reached fails with Event Full
    user2 = {"email": "guest2@alfaaz.org", "status": "PARTICIPANT"}
    reg2 = EventRegister(event_id=ev.id, whatsapp_number=None)
    with pytest.raises(HTTPException) as exc_full:
        register_for_event(reg2, db=test_db, user=user2)
    assert exc_full.value.status_code == 400
    assert "Event full" in exc_full.value.detail

    # 5. Active events now shows full
    active_updated = get_active_events(db=test_db)
    assert active_updated[0]["registered"] == 1
    assert active_updated[0]["spots_left"] == 0
    assert active_updated[0]["full"] is True
