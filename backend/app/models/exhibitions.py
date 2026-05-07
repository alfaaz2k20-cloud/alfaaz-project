from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
# Notice we changed DBExhibition to DBExhibition here
from app.models.exhibition import DBExhibitionApplication, DBExhibition 
from app.schemas.exhibition import ExhibitionApplicationCreate, ExhibitionRegistrationSubmit
from app.core.security import require_auth
from app.services.email import send_system_email

router = APIRouter(prefix="/exhibitions", tags=["Exhibitions"])

def _get_active_exhibition(db: Session):
    # Finds the ONE exhibition you clicked "Activate" on
    return db.query(DBExhibition).filter(DBExhibition.is_active == True).first()

@router.get("/config")
def get_exhibition_config(db: Session = Depends(get_db)):
    config = _get_active_exhibition(db)
    
    # If you haven't activated any exhibition, tell the frontend it's closed
    if not config:
        return {"is_open": False, "title": "Portal Closed"}
        
    return {
        "title": config.title, "date_text": config.date_text,
        "venue": config.venue, "about_text": config.about_text,
        "is_open": True, # If it's active, it's open
        "tnc_pdf_url": config.tnc_pdf_url,
        "registration_fee": config.registration_fee or "",
        "payment_instructions": config.payment_instructions or "",
        "payment_qr_url": config.payment_qr_url,
    }