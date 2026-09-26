from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, text
from app.db.session import get_db
from app.models.volunteer import DBVolunteerApplication
from app.schemas.volunteer import VolunteerApplicationCreate
import traceback

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

@router.post("/apply")
def submit_volunteer_application(data: VolunteerApplicationCreate, db: Session = Depends(get_db)):
    try:
        # Ensure the table exists (safety net for first deploy)
        from app.db.session import engine
        from app.db.base import Base
        Base.metadata.create_all(bind=engine, tables=[DBVolunteerApplication.__table__], checkfirst=True)
        
        application = DBVolunteerApplication(
            name=data.Name,
            email=data.Email,
            phone=data.Phone,
            interests=data.Interests or "",
            empathy=data.empathy,
            conscientiousness=data.conscientiousness,
            collaborative=data.collaborative,
            emotional=data.emotional,
            curiosity=data.curiosity,
            creative=data.creative,
            dominant_trait=data.DominantTrait or "",
            responses=data.Responses or "",
            notes=data.Notes or ""
        )
        db.add(application)
        db.commit()
        return {"status": "success"}
    except Exception as e:
        db.rollback()
        print(f"VOLUNTEER APPLY ERROR: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/")
def get_volunteer_applications(db: Session = Depends(get_db)):
    try:
        records = db.exec(
            select(DBVolunteerApplication).order_by(DBVolunteerApplication.timestamp.desc())
        ).all()
        results = []
        for r in records:
            results.append({
                "Timestamp": r.timestamp.isoformat() if r.timestamp else "",
                "Name": r.name,
                "Email": r.email,
                "Phone": r.phone,
                "Interests": r.interests,
                "empathy": r.empathy,
                "conscientiousness": r.conscientiousness,
                "collaborative": r.collaborative,
                "emotional": r.emotional,
                "curiosity": r.curiosity,
                "creative": r.creative,
                "DominantTrait": r.dominant_trait,
                "Responses": r.responses,
                "Notes": r.notes
            })
        return results
    except Exception as e:
        print(f"VOLUNTEER LIST ERROR: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))
