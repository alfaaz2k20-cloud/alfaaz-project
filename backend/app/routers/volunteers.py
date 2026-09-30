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
            decision_id=event.decision_id or "",
            action=event.action,
            action_duration=event.action_duration,
            timer_expired=event.timer_expired,
            state_before=event.state_before or "",
            state_after=event.state_after or "",
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
    assessment = db.query(DBAssessment).filter(DBAssessment.id == assessment_id).first()
    if not assessment: return

    # Try to parse the new hybrid payload from notes
    try:
        import json
        payload = json.loads(assessment.notes)
        if "sjtResponses" in payload:
            is_hybrid = True
        else:
            is_hybrid = False
    except:
        is_hybrid = False

    db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()

    if is_hybrid:
        # Interpret the new sequence format
        c1 = payload.get("metricsC1", {})
        c2 = payload.get("metricsC2", {})
        sjt = payload.get("sjtResponses", [])
        
        # Calculate Reliability
        is_reliable = payload.get("isReliable", False)
        motor = payload.get("motorBaselineMs", 0)
        
        # We can map the SJT tags
        sjt_tag_counts = {}
        for resp in sjt:
            for tag in resp.get("tags", []):
                sjt_tag_counts[tag] = sjt_tag_counts.get(tag, 0) + 1
        
        constructs = [
            {
                "name": "Cognitive Baseline",
                "desc": f"Motor Latency: {motor:.0f}ms. Working Memory Peak: {c1.get('wmPeak', 0)} nodes. Inhibition Limit: {c1.get('sabLimit', 0)}ms.",
                "sup": 5 if is_reliable else 2,
                "ctr": 0 if is_reliable else 3,
                "conf": "High"
            },
            {
                "name": "Fatigue Degradation (Reliability)",
                "desc": f"Shift in Error Rate: {c2.get('stroopErr', 0) - c1.get('stroopErr', 0)}. Shift in Memory Span: {c2.get('wmPeak', 0) - c1.get('wmPeak', 0)}.",
                "sup": 5 if is_reliable else 1,
                "ctr": 0 if is_reliable else 4,
                "conf": "High"
            },
            {
                "name": "Situational Empathy",
                "desc": f"Explicitly selected empathic responses in {sjt_tag_counts.get('empathy', 0)} scenarios.",
                "sup": sjt_tag_counts.get('empathy', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Collaborative Spirit",
                "desc": f"Explicitly prioritized collaboration in {sjt_tag_counts.get('collaborative', 0)} scenarios.",
                "sup": sjt_tag_counts.get('collaborative', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Creative Initiative",
                "desc": f"Chose creative compromises in {sjt_tag_counts.get('creative', 0)} scenarios. Risk Intensity (BART): {c1.get('bartAvg', 0):.1f}",
                "sup": sjt_tag_counts.get('creative', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Emotional Agility",
                "desc": f"Chose emotionally agile responses in {sjt_tag_counts.get('emotional', 0)} scenarios. Go/NoGo Limit: {c1.get('sabLimit', 0)}ms.",
                "sup": sjt_tag_counts.get('emotional', 0),
                "ctr": 0,
                "conf": "Moderate"
            },
            {
                "name": "Conscientiousness",
                "desc": f"Chose structured/dutiful responses in {sjt_tag_counts.get('conscientiousness', 0)} scenarios.",
                "sup": sjt_tag_counts.get('conscientiousness', 0),
                "ctr": 0,
                "conf": "Moderate"
            }
        ]
        
        for c in constructs:
            ev = DBConstructEvidence(
                assessment_id=assessment_id,
                construct=c["name"],
                supporting_count=c["sup"],
                counter_count=c["ctr"],
                context_count=len(sjt),
                confidence=c["conf"],
                interpretation=c["desc"]
            )
            db.add(ev)
    else:
        # Fallback to the old tag-based interpretation if no payload is present (or old data)
        pass # we can ignore old data for now to keep the code simple, or restore the old logic here.

    db.query(DBRoleFit).filter(DBRoleFit.assessment_id == assessment_id).delete()

    roles = [
        {
            "name": "Event Operations",
            "indicators": ["task_completion", "project_finished", "deliberation", "fast_recovery"],
            "desc": "Operational readiness for managing logistics, setup, and event execution."
        },
        {
            "name": "Community & Outreach",
            "indicators": ["distress_response", "edge_sitter_notice", "people_priority", "resource_sharing"],
            "desc": "Suitability for community-facing roles requiring interpersonal sensitivity."
        },
        {
            "name": "Creative / Art",
            "indicators": ["creative_placement", "resource_combination", "non_obvious_interaction", "fog_exploration"],
            "desc": "Fit for creative programming, exhibition curation, and artistic projects."
        },
        {
            "name": "Media & Communication",
            "indicators": ["unique_interactions", "early_exploration", "solution_variety", "high_interaction_count"],
            "desc": "Aptitude for content creation, documentation, and storytelling roles."
        },
        {
            "name": "Research & Documentation",
            "indicators": ["fog_exploration", "unique_interactions", "deliberation", "sequential_work"],
            "desc": "Fit for systematic research, archive work, and knowledge documentation."
        },
    ]

    for r in roles:
        score = sum(
            sum(e["strength"] for e in tag_index.get(ind, []) if e["direction"] == "positive")
            for ind in r["indicators"]
        )
        strength = "Strong" if score >= 4 else ("Moderate" if score >= 2 else "Low")
        conf = "Moderate" if score >= 1 else "Insufficient Data"
        fit = DBRoleFit(
            assessment_id=assessment_id,
            role=r["name"],
            evidence_strength=strength,
            confidence=conf,
            interpretation=r["desc"]
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
