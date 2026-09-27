from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlmodel import Session, select, text
from app.db.session import get_db
from app.models.volunteer import DBVolunteerApplication
from app.models.assessment import DBAssessment, DBAssessmentEvent, DBBehavioralObservation, DBConstructEvidence, DBRoleFit
from app.schemas.volunteer import VolunteerApplicationCreate
from app.schemas.assessment import AssessmentStartRequest, AssessmentEventCreate, AssessmentCompleteRequest, BehavioralInterpretationRequest
from datetime import datetime, timezone
import traceback
import json

router = APIRouter(prefix="/volunteers", tags=["Volunteers"])

def ensure_tables():
    from app.db.session import engine
    from app.db.base import Base
    Base.metadata.create_all(bind=engine, tables=[
        DBVolunteerApplication.__table__,
        DBAssessment.__table__,
        DBAssessmentEvent.__table__,
        DBBehavioralObservation.__table__,
        DBConstructEvidence.__table__,
        DBRoleFit.__table__
    ], checkfirst=True)

@router.post("/assessment/start")
def start_assessment(data: AssessmentStartRequest, db: Session = Depends(get_db)):
    try:
        ensure_tables()
        
        # Check if already exists (prevent duplicate active sessions)
        existing = db.query(DBAssessment).filter(DBAssessment.id == data.assessment_id).first()
        if existing:
            return {"status": "exists", "assessment_id": existing.id}
            
        assessment = DBAssessment(
            id=data.assessment_id,
            session_id=data.session_id,
            name=data.identity.name,
            email=data.identity.email,
            phone=data.identity.phone,
            status="in_progress"
        )
        db.add(assessment)
        db.commit()
        return {"status": "success", "assessment_id": assessment.id}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assessment/{assessment_id}/event")
def log_assessment_event(assessment_id: str, event: AssessmentEventCreate, db: Session = Depends(get_db)):
    try:
        ts = datetime.fromisoformat(event.timestamp.replace('Z', '+00:00')) if event.timestamp else datetime.now(timezone.utc)
        
        db_event = DBAssessmentEvent(
            assessment_id=assessment_id,
            timestamp=ts,
            simulated_time=event.simulated_time,
            scene_id=event.scene_id,
            decision_id=event.decision_id,
            action=event.action,
            action_duration=event.action_duration,
            timer_expired=event.timer_expired,
            state_before=event.state_before,
            state_after=event.state_after,
            consequence_id=event.consequence_id
        )
        db.add(db_event)
        db.commit()
        db.refresh(db_event)
        
        # Store behavioral tags if present
        if event.behavior_tags:
            for tag in event.behavior_tags:
                obs = DBBehavioralObservation(
                    assessment_id=assessment_id,
                    event_id=db_event.id,
                    behavior_tag=tag.get("tag", ""),
                    direction=tag.get("direction", "neutral"),
                    strength=tag.get("strength", 1.0),
                    context=tag.get("context", "")
                )
                db.add(obs)
            db.commit()
            
        return {"status": "success"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/assessment/{assessment_id}/interpretation")
def save_interpretation(assessment_id: str, data: BehavioralInterpretationRequest, db: Session = Depends(get_db)):
    try:
        # Clear old interpretations for this assessment if they exist
        db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()
        db.query(DBRoleFit).filter(DBRoleFit.assessment_id == assessment_id).delete()
        
        for ce in data.construct_evidence:
            ev = DBConstructEvidence(
                assessment_id=assessment_id,
                construct=ce.get("construct", ""),
                supporting_count=ce.get("supporting_count", 0),
                counter_count=ce.get("counter_count", 0),
                context_count=ce.get("context_count", 0),
                confidence=ce.get("confidence", "low"),
                interpretation=ce.get("interpretation", "")
            )
            db.add(ev)
            
        for rf in data.role_fits:
            fit = DBRoleFit(
                assessment_id=assessment_id,
                role=rf.get("role", ""),
                evidence_strength=rf.get("evidence_strength", "low"),
                confidence=rf.get("confidence", "low"),
                interpretation=rf.get("interpretation", "")
            )
            db.add(fit)
            
        db.commit()
        return {"status": "success"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


def generate_interpretations(assessment_id: str, db: Session):
    # Fetch all events
    events = db.query(DBAssessmentEvent).filter(DBAssessmentEvent.assessment_id == assessment_id).all()
    observations = db.query(DBBehavioralObservation).filter(DBBehavioralObservation.assessment_id == assessment_id).all()
    
    # 1. Aggregate tags
    tag_counts = {}
    for obs in observations:
        tag_counts[obs.behavior_tag] = tag_counts.get(obs.behavior_tag, 0) + (1 if obs.direction == 'positive' else -1)
    
    # Simple construct mapping based on tags
    constructs_setup = [
        {"name": "Empathy", "tags": ["perspective_consideration", "conflict_navigation"]},
        {"name": "Conscientiousness", "tags": ["follow_through", "commitment_honoring"]},
        {"name": "Collaborative Spirit", "tags": ["coordination", "delegation"]},
        {"name": "Emotional Agility", "tags": ["adaptation", "conflict_navigation"]},
        {"name": "Curiosity & Learning", "tags": ["information_seeking"]},
        {"name": "Creative Initiative", "tags": ["creative", "initiative"]}
    ]
    
    db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()
    
    for c in constructs_setup:
        supporting = sum(1 for o in observations if o.behavior_tag in c["tags"] and o.direction == 'positive')
        counter = sum(1 for o in observations if o.behavior_tag in c["tags"] and o.direction == 'negative')
        
        confidence = "Low"
        if supporting + counter >= 3: confidence = "High"
        elif supporting + counter >= 1: confidence = "Moderate"
        
        interp = f"Observed {supporting} supporting actions and {counter} contradictory actions for this construct."
        
        ev = DBConstructEvidence(
            assessment_id=assessment_id,
            construct=c["name"],
            supporting_count=supporting,
            counter_count=counter,
            context_count=len(events),
            confidence=confidence,
            interpretation=interp
        )
        db.add(ev)
        
    db.query(DBRoleFit).filter(DBRoleFit.assessment_id == assessment_id).delete()
    # Simple role fit
    roles_setup = [
        {"name": "Event Operations", "req": ["initiative", "follow_through"]},
        {"name": "Community & Outreach", "req": ["perspective_consideration", "communication"]},
        {"name": "Creative / Art", "req": ["creative", "adaptation"]}
    ]
    
    for r in roles_setup:
        score = sum(1 for o in observations if o.behavior_tag in r["req"] and o.direction == 'positive')
        strength = "Strong" if score >= 2 else ("Moderate" if score == 1 else "Low")
        
        fit = DBRoleFit(
            assessment_id=assessment_id,
            role=r["name"],
            evidence_strength=strength,
            confidence="Moderate",
            interpretation=f"Fit score derived from related behavioral markers."
        )
        db.add(fit)
        
    db.commit()

@router.post("/assessment/{assessment_id}/complete")

def complete_assessment(assessment_id: str, data: AssessmentCompleteRequest, db: Session = Depends(get_db)):
    try:
        assessment = db.query(DBAssessment).filter(DBAssessment.id == assessment_id).first()
        if not assessment:
            raise HTTPException(status_code=404, detail="Assessment not found")
            
        assessment.status = "completed"
        assessment.completed_at = datetime.now(timezone.utc)
        assessment.interests = data.interests
        assessment.notes = data.notes
        db.commit()
        generate_interpretations(assessment_id, db)
        return {"status": "success"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/apply")
def submit_volunteer_application(data: VolunteerApplicationCreate, db: Session = Depends(get_db)):
    # Legacy endpoint preserved for backwards compatibility
    try:
        ensure_tables()
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
