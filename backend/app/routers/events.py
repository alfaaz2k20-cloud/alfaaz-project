from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.event import DBEvent, DBEventRegistration
from app.schemas.event import EventRegister
from app.core.security import require_auth

router = APIRouter(prefix="/events", tags=["Events"])

@router.get("/active")
def get_active_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).filter(DBEvent.registration_open == True).all()
    result = []
    for e in events:
        count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
        result.append({
            "id": e.id, "name": e.name, "description": e.description,
            "event_date": e.event_date, "capacity": e.capacity,
            "registered": count,
            "spots_left": (e.capacity - count) if e.capacity > 0 else None,
            "full": (e.capacity > 0 and count >= e.capacity)
        })
    return result

@router.post("/register")
def register_for_event(data: EventRegister, db: Session = Depends(get_db), user=Depends(require_auth)):
    event = db.query(DBEvent).filter(DBEvent.id == data.event_id).first()
    if not event or not event.registration_open:
        raise HTTPException(status_code=400, detail="Registration closed.")
    count = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == data.event_id).count()
    if event.capacity > 0 and count >= event.capacity:
        raise HTTPException(status_code=400, detail="Event full.")
    already = db.query(DBEventRegistration).filter(
        DBEventRegistration.event_id == data.event_id,
        DBEventRegistration.user_email == user["email"]
    ).first()
    if already:
        raise HTTPException(status_code=400, detail="Already registered.")
    reg = DBEventRegistration(
        event_id=data.event_id, user_email=user["email"],
        whatsapp_number=data.whatsapp_number
    )
    db.add(reg)
    db.commit()
    return {"status": "SUCCESS"}

@router.get("/my-registrations")
def get_my_event_registrations(db: Session = Depends(get_db), user=Depends(require_auth)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user["email"]).all()
    result = []
    for r in regs:
        event = db.query(DBEvent).filter(DBEvent.id == r.event_id).first()
        if event:
            result.append({"event_id": r.event_id, "event_name": event.name, "event_date": event.event_date})
    return result