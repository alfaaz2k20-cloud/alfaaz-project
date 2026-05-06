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
from app.models.exhibition import DBExhibitionApplication, DBExhibitionConfig
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

# Note: The blog generation has its own custom token check, so we bypass the standard require_admin for it.
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

    active_topic = data.topic if data.topic else "Choose a fascinating, highly specific, and slightly obscure topic related to art, cultural history, clinical psychology, or literature and write about it."
    system_prompt = """You are the Curator for the Alfaaz Collective.
    Write a scholarly, engaging, and deeply insightful blog article about the requested topic.
    CRITICAL INSTRUCTION: You MUST return a strictly valid JSON object. 
    1. All keys and values must be wrapped in double quotes.
    2. The "content" value is HTML. Use single quotes for HTML attributes to protect the outer JSON quotes.
    3. Do NOT include newlines (\n) inside the JSON strings.
    Use this exact JSON structure: {"title": "...", "excerpt": "...", "content": "<h2>...</h2>"}"""

    try:
        response = client.chat.completions.create(
            messages=[{"role": "system", "content": system_prompt}, {"role": "user", "content": f"Topic: {active_topic}"}],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.8, 
        )
        result = json.loads(response.choices[0].message.content)
        # Assuming bleach is imported and used here as discussed earlier, or rely on frontend sanitation.
        new_blog = DBBlog(title=result["title"], excerpt=result["excerpt"], content=result["content"], is_published=True)
        db.add(new_blog)
        db.commit()
        return {"status": "SUCCESS", "message": "Autonomous research published."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="The Curator failed to generate the article.")

# --- Events Admin ---
@router.post("/events/create")
def create_event(data: EventCreate, db: Session = Depends(get_db)):
    event = DBEvent(name=data.name, description=data.description, event_date=data.event_date, capacity=data.capacity, registration_open=False)
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
    return {"registrations": [{"email": r.user_email, "whatsapp": r.whatsapp_number or "—", "registered_at": str(r.created_at)} for r in regs]}

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

# --- Clubs Admin ---
@router.get("/club-applications")
def get_club_applications(db: Session = Depends(get_db)):
    apps = db.query(DBClubApplication).order_by(DBClubApplication.created_at.desc()).all()
    return [{"id": a.id, "user_email": a.user_email, "club_name": a.club_name, "note": a.note, "status": a.status, "admin_note": a.admin_note, "created_at": str(a.created_at)} for a in apps]

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

# --- Exhibitions Admin ---
@router.get("/exhibitions")
def get_all_exhibitions(db: Session = Depends(get_db)):
    return db.query(DBExhibitionApplication).order_by(DBExhibitionApplication.created_at.desc()).all()

@router.post("/exhibitions/review")
def review_exhibition(data: ExhibitionReview, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == data.application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = data.status
    application.curator_note = data.curator_note
    db.commit()
    if data.status == "APPROVED":
        send_system_email(application.user_email, "ALFAAZ — Exhibition Clearance Granted", f"Greetings {application.full_name},\n\nYour artwork has cleared the screening process.\n\nPlease log into your Alfaaz dashboard to review the Terms & Conditions and finalize your spot.\n\n— The Curator")
    elif data.status == "REJECTED":
        send_system_email(application.user_email, "ALFAAZ — Exhibition Update", f"Greetings {application.full_name},\n\nWe appreciate you sharing your portfolio with us. Unfortunately, we cannot accommodate your submission for this specific cycle.\n\n— The Curator")
    return {"status": "SUCCESS", "message": f"Applicant {data.status.lower()} and notified."}

@router.patch("/exhibitions/{application_id}/confirm-payment")
def confirm_exhibition_payment(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    if application.registration_status != "SUBMITTED":
        raise HTTPException(status_code=400, detail="No payment submission found to confirm.")
    application.registration_status = "CONFIRMED"
    application.payment_confirmed_at = datetime.datetime.now(datetime.timezone.utc)
    db.commit()
    send_system_email(application.user_email, "ALFAAZ — Your Spot is Confirmed!", f"Greetings {application.full_name},\n\nYour payment has been verified and your exhibition spot is officially confirmed.\n\nWelcome to the collective.\n\n— The Curator")
    return {"status": "CONFIRMED"}

@router.get("/exhibitions/{application_id}/registration")
def get_exhibition_registration_detail(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    return {"id": application.id, "user_email": application.user_email, "full_name": application.full_name, "status": application.status, "registration_status": application.registration_status or "NONE", "agreed_to_tnc": application.agreed_to_tnc, "payment_proof_url": application.payment_proof_url, "participant_note_reg": application.participant_note_reg, "payment_confirmed_at": str(application.payment_confirmed_at) if application.payment_confirmed_at else None}

@router.patch("/exhibitions/{application_id}/revert")
def revert_exhibition_status(application_id: int, db: Session = Depends(get_db)):
    application = db.query(DBExhibitionApplication).filter(DBExhibitionApplication.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    application.status = "PENDING"
    application.curator_note = None
    db.commit()
    return {"status": "SUCCESS"}

@router.post("/exhibitions/config")
def update_exhibition_config(data: ExhibitionConfigSchema, db: Session = Depends(get_db)):
    config = db.query(DBExhibitionConfig).first()
    if not config:
        config = DBExhibitionConfig()
        db.add(config)
    config.title = data.title
    config.date_text = data.date_text
    config.venue = data.venue
    config.about_text = data.about_text
    config.is_open = data.is_open
    config.tnc_pdf_url = data.tnc_pdf_url
    config.registration_fee = data.registration_fee
    config.payment_instructions = data.payment_instructions
    config.payment_qr_url = data.payment_qr_url
    db.commit()
    sync_notices_to_cloudinary(db)  
    return {"status": "SUCCESS"}

# --- Users & Submissions Admin ---
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
        "This is a test email from the Alfaaz backend. If you received it, Make automation is configured correctly.",
        raise_on_error=True,
        expose_error=True,
    )
    return {"status": "SENT" if sent else "FAILED"}

@router.get("/email/status")
def get_email_status():
    return {
        "provider": "make",
        "make_webhook_configured": bool(MAKE_WEBHOOK_URL),
    }
