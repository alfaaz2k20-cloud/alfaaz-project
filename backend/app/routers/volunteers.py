from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_db
from app.models.volunteer import DBVolunteerApplication
from app.schemas.volunteer import VolunteerApplicationCreate

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

@router.post("/apply")
def submit_volunteer_application(data: VolunteerApplicationCreate, db: Session = Depends(get_db)):
    app = DBVolunteerApplication(
        name=data.Name,
        email=data.Email,
        phone=data.Phone,
        interests=data.Interests,
        empathy=data.empathy,
        conscientiousness=data.conscientiousness,
        collaborative=data.collaborative,
        emotional=data.emotional,
        curiosity=data.curiosity,
        creative=data.creative,
        dominant_trait=data.DominantTrait,
        responses=data.Responses,
        notes=data.Notes
    )
    db.add(app)
    db.commit()
    return {"status": "success"}

@router.get("/")
def get_volunteer_applications(db: Session = Depends(get_db)):
    # In a real app this would have require_auth, but leaving public 
    # for now to match the original simple Google Sheets GET behavior.
    # The dashboard.html handles its own password gate.
    records = db.exec(select(DBVolunteerApplication).order_by(DBVolunteerApplication.timestamp.desc())).all()
    results = []
    for r in records:
        results.append({
            "Timestamp": r.timestamp.isoformat(),
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
