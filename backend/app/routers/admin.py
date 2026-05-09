import os
import json
import datetime
from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from app.db.session import get_db

# Models
from app.models.user import DBUser
from app.models.event import DBEvent, DBEventRegistration
from app.models.club import DBClubApplication
from app.models.exhibition import DBExhibitionApplication, DBExhibition
from app.models.submission import DBSubmission
from app.models.blog import DBBlog

# Schemas
from app.schemas.auth import StatusUpdate
from app.schemas.event import EventCreate
from app.schemas.club import ClubApplicationReview
from app.schemas.exhibition import ExhibitionReview, ExhibitionConfigSchema
from app.schemas.blog import BlogGenerateRequest

# Security & Services
from app.core.security import require_admin
from app.core.config import MAKE_WEBHOOK_URL
from app.services.email import send_system_email
from app.services.cdn import sync_notices_to_cloudinary
from app.services.curator import get_groq_client

router = APIRouter(prefix="/admin", tags=["Admin"], dependencies=[Depends(require_admin)])

@router.post("/blogs/generate", dependencies=[])
def generate_blog_article(data: BlogGenerateRequest, db: Session = Depends(get_db), authorization: str = Header(None)):
    expected_token = os.environ.get("PHANTOM_SECRET_TOKEN")
    if not expected_token:
        raise HTTPException(status_code=500, detail="PHANTOM_SECRET_TOKEN not configured.")
    if not authorization or not authorization.startswith("Bearer ") or authorization.split(" ")[1] != expected_token:
        raise HTTPException(status_code=403, detail="Unauthorized Curator Access")

    client = get_groq_client()
    if not client:
        raise HTTPException(status_code=500, detail="Curator AI not configured.")

    active_topic = data.topic if data.topic else (
        "Explore a profound intersection between Kashmiri cultural heritage and global movements in "
        "art, photography, film, philosophy, or literature. Focus on a specific, authentic, and scholarly "
        "topic that resonates with local identity while connecting to a broader human narrative."
    )
    system_prompt = """You are the Curator for the Alfaaz Collective, a scholarly and poetic voice dedicated to high-fidelity research in art, film, and philosophy.
    TASK: Generate a deeply detailed, authentic, and evocative journal article.
    TONE: Grounded, native (Kashmiri/Regional focus), yet globally aware and academically rigorous.
    
    STRUCTURE:
    1. Introduction: Hook the reader with a specific cultural or historical observation.
    2. Deep Dive: 3-4 detailed sections exploring the topic through multiple lenses (e.g., historical, psychological, or visual).
    3. The Local-Global Bridge: Explicitly connect regional kashmiri nuances to international artistic or philosophical currents.
    4. References: A concluding section listing authentic scholarly works, historical texts, or artistic movements cited.

    CRITICAL CONSTRAINTS:
    - MUST be a strictly valid JSON object.
    - All keys/values wrapped in double quotes.
    - "content" is HTML (use single quotes for attributes).
    - Do NOT include newlines (\n) inside JSON strings; use <br> or <p> tags instead.
    
    JSON structure: {"title": "...", "excerpt": "...", "content": "<h2>...</h2><p>...</p><h3>References</h3><ul><li>...</li></ul>"}"""

    try:
        response = client.chat.completions.create(
            messages=[{"role": "system", "content": system_prompt},
                      {"role": "user", "content": f"Topic: {active_topic}"}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.8,
        )
        result = json.loads(response.choices[0].message.content)
        new_blog = DBBlog(title=result["title"], excerpt=result["excerpt"],
                          content=result["content"], is_published=True)
        db.add(new_blog)
        db.commit()
        sync_notices_to_cloudinary(db)
        return {"status": "SUCCESS", "message": "Autonomous research published."}
    except Exception:
        raise HTTPException(status_code=500, detail="The Curator failed to generate the article.")


# ── Events ───────────────────────────────────────────────────────────────────
@router.post("/events/create")
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = DBEvent(name=data.name, description=data.description,
                    event_date=data.event_date, capacity=data.capacity, registration_open=False)
    db.add(event)
    db.commit()
    sync_notices_to_cloudinary(db)
    return {"status": "SUCCESS"}

@router.patch("/events/{event_id}/toggle")
def toggle_event_registration(event_id: int, db: Session = Depends(get_db)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    event.registration_open = not event.registration_open
    db.commit()
    sync_notices_to_cloudinary(db)
    return {"status": "OPEN" if event.registration_open else "CLOSED"}

@router.get("/events")
def get_all_events(db: Session = Depends(get_db)):
    events = db.query(DBEvent).order_by(DBEvent.created_at.desc()).all()
    return [{
        "id": e.id, "name": e.name, "description": e.description, "event_date": e.event_date,
        "registration_open": e.registration_open, "capacity": e.capacity,
        "registered": db.query(DBEventRegistration).filter(DBEventRegistration.event_id == e.id).count()
    } for e in events]

@router.get("/events/{event_id}/registrations")
def get_event_registrations(event_id: int, db: Session = Depends(get_db)):
    regs = db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).all()
    return {"registrations": [{"email": r.user_email, "whatsapp": r.whatsapp_number or "—",
                                "registered_at": str(r.created_at)} for r in regs]}

@router.delete("/events/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(DBEvent).filter(DBEvent.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found.")
    db.query(DBEventRegistration).filter(DBEventRegistration.event_id == event_id).delete()
    db.delete(event)
    db.commit()
    sync_notices_to_cloudinary(db)
    return {"status": "SUCCESS"}


# ── Clubs ────────────────────────────────────────────────────────────────────
@router.get("/club-applications")
def get_club_applications(db: Session = Depends(get_db)):
    apps = db.query(DBClubApplication).order_by(DBClubApplication.created_at.desc()).all()
    return [{"id": a.id, "user_email": a.user_email, "club_name": a.club_name,
             "note": a.note, "status": a.status, "admin_note": a.admin_note,
             "created_at": str(a.created_at)} for a in apps]

@router.post("/club-applications/review")
def review_club_application(data: ClubApplicationReview, db: Session = Depends(get_db)):
    application = db.query(DBClubApplication).filter(DBClubApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.admin_note = data.admin_note
    db.commit()
    return {"status": "SUCCESS"}

@router.patch("/club-applications/{application_id}/revert")
def revert_club_status(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBClubApplication).filter(DBClubApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = "PENDING"
    application.admin_note = None
    db.commit()
    return {"status": "SUCCESS"}


# ── Exhibitions ───────────────────────────────────────────────────────────────

def _current_cycle(db: Session) -> str:
    active_ex = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
    return active_ex.title if active_ex else ""

@router.post("/exhibitions/create")
def create_exhibition(data: ExhibitionConfigSchema, db: Session = Depends(get_db)):
    new_ex = DBExhibition(
        title=data.title,
        date_text=data.date_text,
        venue=data.venue,
        about_text=data.about_text,
        tnc_pdf_url=data.tnc_pdf_url,
        registration_fee=data.registration_fee,
        payment_instructions=data.payment_instructions,
        payment_qr_url=data.payment_qr_url,
        is_active=False
    )
    db.add(new_ex)
    db.commit()
    return {"status": "SUCCESS"}

@router.get("/exhibitions/list")
def list_all_exhibitions(db: Session = Depends(get_db)):
    exs = db.query(DBExhibition).order_by(DBExhibition.created_at.desc()).all()
    return [{"id": e.id, "title": e.title, "date_text": e.date_text, "is_active": e.is_active} for e in exs]

@router.patch("/exhibitions/{ex_id}/activate")
def activate_exhibition(ex_id: int, db: Session = Depends(get_db)):
    db.query(DBExhibition).update({DBExhibition.is_active: False})
    target = db.query(DBExhibition).filter(DBExhibition.id == ex_id).first()
    if target:
        target.is_active = True
        db.commit()
        sync_notices_to_cloudinary(db)
        return {"status": "SUCCESS", "title": target.title}
    raise HTTPException(status_code=404, detail="Exhibition not found")

# NEW: Route to close the portal completely
@router.patch("/exhibitions/deactivate-all")
def deactivate_all_exhibitions(db: Session = Depends(get_db)):
    db.query(DBExhibition).update({DBExhibition.is_active: False})
    db.commit()
    sync_notices_to_cloudinary(db)
    return {"status": "SUCCESS"}

# Replace get_all_exhibitions in admin.py
@router.get("/exhibitions")
def get_all_exhibitions(cycle: str = None, db: Session = Depends(get_db)):
    query = db.query(DBExhibitionApplication)
    if cycle and cycle.upper() == "ALL":
        pass
    else:
        target = cycle or _current_cycle(db)
        if target:
            query = query.filter(DBExhibitionApplication.exhibition_cycle == target)
            
    apps = query.order_by(DBExhibitionApplication.created_at.desc()).all()
    
    # Explicit dictionary mapping ensures nulls are sent to JS properly
    return [{
        "id": a.id, 
        "user_email": a.user_email, 
        "full_name": a.full_name,
        "exhibition_cycle": a.exhibition_cycle, # Now safely explicitly None/Null
        "genre": a.genre, 
        "medium": a.medium, 
        "portfolio_url": a.portfolio_url,
        "status": a.status, 
        "registration_status": a.registration_status, 
        "payment_proof_url": a.payment_proof_url
    } for a in apps]

@router.get("/exhibitions/cycles")
def get_exhibition_cycles(db: Session = Depends(get_db)):
    # 1. Pull the master list of all created exhibitions directly from the source
    master_exhibitions = db.query(DBExhibition.title).order_by(DBExhibition.created_at.desc()).all()
    cycles = [e[0] for e in master_exhibitions]
    
    # 2. Safety Net: Grab any legacy names stamped on old applications
    legacy_rows = db.query(DBExhibitionApplication.exhibition_cycle).distinct().all()
    for r in legacy_rows:
        if r[0] and r[0] not in cycles:
            cycles.append(r[0])
            
    current = _current_cycle(db)
    return {"cycles": cycles, "current": current}

@router.post("/exhibitions/review")
def review_exhibition(data: ExhibitionReview, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.curator_note = data.curator_note
    db.commit()
    if data.status == "APPROVED":
        send_system_email(
            application.user_email,
            "ALFAAZ — Exhibition Clearance Granted",
            f"Greetings {application.full_name},\n\nYour artwork has cleared the screening process for "
            f"{application.exhibition_cycle}.\n\nPlease log into your Alfaaz dashboard to review the "
            f"Terms & Conditions and finalize your spot.\n\n— The Curator"
        )
    elif data.status == "REJECTED":
        send_system_email(
            application.user_email,
            "ALFAAZ — Exhibition Update",
            f"Greetings {application.full_name},\n\nWe appreciate you sharing your portfolio with us. "
            f"Unfortunately, we cannot accommodate your submission for {application.exhibition_cycle}.\n\n— The Curator"
        )
    return {"status": "SUCCESS", "message": f"Applicant {data.status.lower()} and notified."}

@router.patch("/exhibitions/{application_id}/confirm-payment")
def confirm_exhibition_payment(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
        
    # NEW GUARD CLAUSE
    if application.registration_status != "SUBMITTED":
        raise HTTPException(status_code=400, detail="Cannot confirm. The artist has not submitted payment proof yet.")
        
    application.registration_status = "CONFIRMED"
    application.payment_confirmed_at = datetime.datetime.now(datetime.timezone.utc)
    db.commit()
    send_system_email(
        application.user_email,
        "ALFAAZ — Your Spot is Confirmed!",
        f"Greetings {application.full_name},\n\nYour payment for {application.exhibition_cycle} has been "
        f"verified and your exhibition spot is officially confirmed.\n\nWelcome to the collective.\n\n— The Curator"
    )
    return {"status": "CONFIRMED"}

@router.patch("/exhibitions/{application_id}/revert")
def revert_exhibition_status(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = "PENDING"
    application.curator_note = None
    db.commit()
    return {"status": "SUCCESS"}

@router.get("/exhibitions/{application_id}/registration")
def get_exhibition_registration_detail(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    return {
        "id": application.id, "user_email": application.user_email,
        "full_name": application.full_name, "exhibition_cycle": application.exhibition_cycle,
        "status": application.status, "registration_status": application.registration_status or "NONE",
        "agreed_to_tnc": application.agreed_to_tnc,
        "payment_proof_url": application.payment_proof_url,
        "participant_note_reg": application.participant_note_reg,
        "payment_confirmed_at": str(application.payment_confirmed_at) if application.payment_confirmed_at else None
    }


# ── Users & Submissions ───────────────────────────────────────────────────────
@router.get("/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [{"email": u.email, "full_name": u.full_name, "status": u.status} for u in users]

@router.delete("/users/{user_email}")
def delete_user(user_email: str, db: Session = Depends(get_db)):
    user = db.query(DBUser).filter(DBUser.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    if user.status == "ADMIN":
        raise HTTPException(status_code=403, detail="Cannot delete an admin account.")
    db.query(DBSubmission).filter(DBSubmission.author_email == user_email).delete()
    db.query(DBClubApplication).filter(DBClubApplication.user_email == user_email).delete()
    db.query(DBEventRegistration).filter(DBEventRegistration.user_email == user_email).delete()
    db.query(DBExhibitionApplication).filter(DBExhibitionApplication.user_email == user_email).delete()
    db.delete(user)
    db.commit()
    return {"status": "SUCCESS", "message": f"User {user_email} purged."}

@router.post("/update_status")
def update_user_status(target: StatusUpdate, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found.")
    db_user.status = target.status
    db.commit()
    return {"status": "SUCCESS"}

@router.get("/submissions")
def get_all_submissions(db: Session = Depends(get_db)):
    return db.query(DBSubmission).order_by(DBSubmission.created_at.desc()).all()

@router.post("/email/test")
def send_test_email(user=Depends(require_admin)):
    sent = send_system_email(
        user["email"],
        "ALFAAZ — Email Test",
        "This is a test email from the Alfaaz backend.",
        raise_on_error=True,
        expose_error=True,
    )
    return {"status": "SENT" if sent else "FAILED"}

@router.get("/email/status")
def get_email_status():
    return {"provider": "make", "make_webhook_configured": bool(MAKE_WEBHOOK_URL)}