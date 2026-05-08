from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.exhibition import DBExhibitionApplication, DBExhibition
from app.schemas.exhibition import ExhibitionApplicationCreate, ExhibitionRegistrationSubmit
from app.core.security import require_auth
from app.services.email import send_system_email

router = APIRouter(prefix="/exhibitions", tags=["Exhibitions"])

@router.get("/config")
def get_exhibition_config(db: Session = Depends(get_db)):
    config = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
    if not config:
        return {"is_open": False, "title": "", "date_text": "", "about_text": ""}
    
    return {
        "is_open": True,
        "title": config.title,
        "date_text": config.date_text,
        "about_text": config.about_text,
        "venue": config.venue,
        "tnc_pdf_url": config.tnc_pdf_url,
        "registration_fee": config.registration_fee or "",
        "payment_instructions": config.payment_instructions or "",
        "payment_qr_url": config.payment_qr_url,
    }
@router.post("/apply")
def apply_for_exhibition(data: ExhibitionApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if not data.over_19 or not data.agreed_to_screening:
        raise HTTPException(status_code=400, detail="You must agree to the terms to proceed.")
        
    # --- 1. Fetch the active cycle to stamp the application ---
    active_cycle = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
    if not active_cycle:
        raise HTTPException(status_code=400, detail="The portal is currently closed. No active exhibition.")
    
    cycle_title = active_cycle.title

    # --- 2. STRICT GATEKEEPER: Prevent duplicates in the same cycle ---
    # We remove the status == "PENDING" check and instead lock it to the cycle title.
    existing = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == cycle_title
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="You have already submitted an application for this exhibition cycle.")
        
    # --- 3. Create and Stamp the Application ---
    application = DBExhibitionApplication(
        user_email=user["email"], 
        exhibition_cycle=cycle_title,  # Permanently stamped!
        full_name=data.full_name, 
        age=data.age,
        address=data.address, 
        whatsapp=data.whatsapp, 
        genre=data.genre,
        medium=data.medium, 
        portfolio_url=data.portfolio_url,
        over_19=data.over_19, 
        agreed_to_screening=data.agreed_to_screening,
        applicant_note=data.applicant_note
    )
    db.add(application)
    db.commit()
    
    send_system_email(
        user["email"],
        "ALFAAZ — Application Received",
        f"Greetings {data.full_name},\n\nYour portfolio has successfully entered our Storage. This secure space is used to safely hold your work and protect your assets while they are under review by the Curator for the upcoming exhibition.\n\nYou will receive an update regarding your status soon.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUCCESS", "message": "Application submitted successfully."}

@router.get("/my-status")
def get_my_exhibition_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    # 1. Check what the active cycle is
    active_ex = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
    if not active_ex:
        return {"status": "NONE"} # If portal is closed, they have no active status

    # 2. Fetch the user's application ONLY for the active cycle
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == active_ex.title
    ).first()
    
    if not application:
        return {"status": "NONE"}
        
    base = {
        "status": application.status,
        "curator_note": application.curator_note,
        "application_id": application.id,
        "exhibition_cycle": application.exhibition_cycle, # Passing this to the frontend
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

@router.post("/complete-registration")
def complete_exhibition_registration(data: ExhibitionRegistrationSubmit, db: Session = Depends(get_db), user=Depends(require_auth)):
    # 1. Fetch active cycle
    active_ex = db.query(DBExhibition).filter(DBExhibition.is_active == True).first()
    if not active_ex:
        raise HTTPException(status_code=400, detail="The exhibition portal is currently closed.")

    # 2. Find approved application for THIS cycle
    application = db.query(DBExhibitionApplication).filter(
        DBExhibitionApplication.user_email == user["email"],
        DBExhibitionApplication.exhibition_cycle == active_ex.title,
        DBExhibitionApplication.status == "APPROVED"
    ).first()
    
    if not application:
        raise HTTPException(status_code=404, detail="No approved application found for the current cycle.")
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
        f"Greetings {application.full_name},\n\nYour registration form and payment proof have been received. The Curator will verify your payment and confirm your spot shortly.\n\n— The Alfaaz Collective"
    )
    return {"status": "SUBMITTED", "message": "Registration submitted. Awaiting payment confirmation."}

@router.post("/finalize")
def finalize_exhibition_registration(data: ExhibitionRegistrationSubmit, db: Session = Depends(get_db), user=Depends(require_auth)):
    return complete_exhibition_registration(data, db, user)
