from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.exhibition import DBExhibitionApplication, DBExhibition
from app.schemas.exhibition import ExhibitionApplicationCreate, ExhibitionRegistrationSubmit
from app.core.security import require_auth
from app.services.email import send_system_email

router = APIRouter(prefix="/exhibitions", tags=["Exhibitions"])

def _get_active_exhibition(db: Session):
    return db.query(DBExhibition).filter(DBExhibition.is_active == True).first()

@router.get("/config")
def get_exhibition_config(db: Session = Depends(get_db)):
    config = _get_active_exhibition(db)
    if not config:
        return {"is_open": False, "title": "Portal Closed"}
    return {
        "title": config.title, "date_text": config.date_text,
        "venue": config.venue, "about_text": config.about_text,
        "is_open": True,
        "tnc_pdf_url": config.tnc_pdf_url,
        "registration_fee": config.registration_fee or "",
        "payment_instructions": config.payment_instructions or "",
        "payment_qr_url": config.payment_qr_url,
    }

@router.post("/apply")
def apply_for_exhibition(data: ExhibitionApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if not data.over_19 or not data.agreed_to_screening:
        raise HTTPException(status_code=400, detail="You must agree to the terms to proceed.")
    config = _get_active_exhibition(db)
    if not config:
        raise HTTPException(status_code=400, detail="No active exhibition to apply for.")
    current_cycle = config.title

    existing = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == current_cycle,
        DBExhibitionApplication.status == "PENDING"
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="You already have an application under review.")

    active = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == current_cycle,
        DBExhibitionApplication.status == "APPROVED"
    ).first()
    if active:
        raise HTTPException(status_code=400, detail="You already have an active submission.")

    application = DBExhibitionApplication(
        user_email=user["email"],
        exhibition_cycle=current_cycle,
        full_name=data.full_name, age=data.age,
        address=data.address, whatsapp=data.whatsapp,
        genre=data.genre, medium=data.medium,
        portfolio_url=data.portfolio_url,
        over_19=data.over_19, agreed_to_screening=data.agreed_to_screening,
        applicant_note=data.applicant_note
    )
    db.add(application)
    db.commit()
    send_system_email(
        user["email"],
        "ALFAAZ — Application Received",
        f"Greetings {data.full_name},\n\nYour portfolio has successfully entered our Storage for {current_cycle}. "
        f"It is now under review by the Curator.\n\nYou will receive an update soon.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUCCESS", "message": "Application submitted successfully."}

@router.get("/my-status")
def get_my_exhibition_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    config = _get_active_exhibition(db)
    if not config:
        return {"status": "NONE"}
    current_cycle = config.title

    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == current_cycle
    ).order_by(DBExhibitionApplication.created_at.desc()).first()

    if not application:
        return {"status": "NONE"}

    base = {
        "status": application.status,
        "curator_note": application.curator_note,
        "application_id": application.id,
        "exhibition_cycle": application.exhibition_cycle,
    }
    if application.status == "APPROVED":
        base.update({
            "full_name": application.full_name,
            "age": application.age,
            "address": application.address,
            "whatsapp": application.whatsapp,
            "genre": application.genre,
            "medium": application.medium,
            "portfolio_url": application.portfolio_url,
            "registration_status": application.registration_status or "NONE",
            "payment_confirmed_at": str(application.payment_confirmed_at) if application.payment_confirmed_at else None,
        })
    return base

@router.post("/finalize")
def finalize_exhibition_registration(data: ExhibitionRegistrationSubmit, db: Session = Depends(get_db), user=Depends(require_auth)):
    config = _get_active_exhibition(db)
    if not config:
        raise HTTPException(status_code=400, detail="No active exhibition.")
    current_cycle = config.title

    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == current_cycle,
        DBExhibitionApplication.status == "APPROVED"
    ).order_by(DBExhibitionApplication.created_at.desc()).first()

    if not application:
        raise HTTPException(status_code=404, detail="No approved application found.")
    if application.registration_status == "CONFIRMED":
        raise HTTPException(status_code=400, detail="Registration already confirmed.")
    if not data.agreed_to_tnc:
        raise HTTPException(status_code=400, detail="You must agree to the Terms & Conditions.")
    if not data.payment_proof_url:
        raise HTTPException(status_code=400, detail="Payment proof is required.")

    application.agreed_to_tnc = True
    application.payment_proof_url = data.payment_proof_url
    application.participant_note_reg = data.participant_note_reg
    application.registration_status = "SUBMITTED"
    db.commit()

    send_system_email(
        user["email"],
        "ALFAAZ — Registration Submitted",
        f"Greetings {application.full_name},\n\nYour registration form and payment proof for {current_cycle} "
        f"have been received. The Curator will verify and confirm your spot shortly.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUBMITTED", "message": "Registration submitted. Awaiting payment confirmation."}

@router.post("/complete-registration")
def complete_exhibition_registration(data: ExhibitionRegistrationSubmit, db: Session = Depends(get_db), user=Depends(require_auth)):
    return finalize_exhibition_registration(data, db, user)