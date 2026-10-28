from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.club import DBClubApplication
from app.schemas.club import ClubApplicationCreate
from app.core.security import require_auth

router = APIRouter(prefix="/clubs", tags=["Clubs"])

VALID_CLUBS = ["Art & Craft", "Film Club", "Photography", "Philosophy", "Literature"]

@router.post("/apply")
def apply_to_club(data: ClubApplicationCreate, db: Session = Depends(get_db), user=Depends(require_auth)):
    if data.club_name not in VALID_CLUBS:
        raise HTTPException(status_code=400, detail="Invalid club.")

    approved = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "APPROVED"
    ).first()
    if approved:
        raise HTTPException(status_code=400, detail=f"Already a member of {approved.club_name}.")

    existing_club = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.club_name == data.club_name
    ).first()
    if existing_club:
        if existing_club.status == "PENDING":
            raise HTTPException(status_code=400, detail="Pending application exists.")
        # If REJECTED, reset application to PENDING
        existing_club.status = "PENDING"
        existing_club.note = data.note
        existing_club.admin_note = None
        db.commit()
        return {"status": "PENDING"}

    other_pending = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"],
        DBClubApplication.status == "PENDING"
    ).first()
    if other_pending:
        raise HTTPException(status_code=400, detail="Pending application exists.")

    application = DBClubApplication(user_email=user["email"], club_name=data.club_name, note=data.note)
    db.add(application)
    db.commit()
    return {"status": "PENDING"}

@router.get("/my-status")
def get_my_club_status(db: Session = Depends(get_db), user=Depends(require_auth)):
    application = db.query(DBClubApplication).filter(
        DBClubApplication.user_email == user["email"]
    ).order_by(DBClubApplication.created_at.desc()).first()
    if not application:
        return {"status": "NONE"}
    return {"status": application.status, "club": application.club_name, "admin_note": application.admin_note}