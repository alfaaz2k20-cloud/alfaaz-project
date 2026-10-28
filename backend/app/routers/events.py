from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.event import DBEvent, DBEventRegistration
from app.schemas.event import EventRegister
from app.core.security import require_auth
from app.services.rate_limiter import form_limiter

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/active")
def get_active_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
    if not events:
        return []
    event_ids = [e.id for e in events]
    counts_rows = db.query(
        DBEventRegistration.event_id,
        func.count(DBEventRegistration.id)
    ).filter(DBEventRegistration.event_id.in_(event_ids)).group_by(DBEventRegistration.event_id).all()
    counts = dict(counts_rows)
    result = []
    for e in events:
        count = counts.get(e.id, 0)
        result.append({
            "id": e.id, "name": e.name, "description": e.description,
            "event_date": e.event_date, "capacity": e.capacity,
            "registered": count,
            "spots_left": (e.capacity - count) if e.capacity > 0 else None,
            "full": (e.capacity > 0 and count >= e.capacity)
        })
    return result

@router.post("/register", dependencies=[Depends(form_limiter)])
def register_for_event(data: EventRegister, db: Session = Depends(get_db), user=Depends(require_auth)):
    query = db.query(DBEvent).filter(DBEvent.id == data.event_id)
    if db.bind and db.bind.dialect.name == "postgresql":
        query = query.with_for_update()
    event = query.first()
    if not event or not event.registration_open:
        raise HTTPException(status_code=400, detail="Registration closed.")
    already = db.query(DBEventRegistration).filter(
        DBEventRegistration.event_id == data.event_id,
        DBEventRegistration.user_email == user["email"]
    ).first()
    if already:
        raise HTTPException(status_code=400, detail="Already registered.")
    count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id).count()
    if event.capacity > 0 and count >= event.capacity:
        raise HTTPException(status_code=400, detail="Event full.")
    reg = DBEventRegistration(
        event_id=data.event_id, user_email=user["email"],
        whatsapp_number=data.whatsapp_number
    )
    db.add(reg)
    db.commit()
    return {"status": "SUCCESS"}

@router.get("/my-registrations")
def get_my_event_registrations(db: Session = Depends(get_db), user=Depends(require_auth)):
    rows = db.query(DBEventRegistration, DBEvent).join(
        DBEvent, DBEventRegistration.event_id == DBEvent.id
    ).filter(DBEventRegistration.user_email == user["email"]).all()
    return [
        {"event_id": r.event_id, "event_name": e.name, "event_date": e.event_date}
        for r, e in rows
    ]