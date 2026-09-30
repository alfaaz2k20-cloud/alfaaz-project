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
    events = db.query(DBAssessmentEvent).filter(DBAssessmentEvent.assessment_id == assessment_id).all()
    observations = db.query(DBBehavioralObservation).filter(DBBehavioralObservation.assessment_id == assessment_id).all()

    # Build a tag index: { tag_name: [{ direction, strength, context }, ...] }
    tag_index = {}
    for obs in observations:
        tag_index.setdefault(obs.behavior_tag, []).append({
            "direction": obs.direction,
            "strength": obs.strength or 1.0,
            "context": obs.context or ""
        })

    def score_construct(positive_tags, negative_tags):
        supporting = 0
        counter = 0
        for tag in positive_tags:
            for entry in tag_index.get(tag, []):
                if entry["direction"] in ["positive", "neutral"]:
                    supporting += entry["strength"]
                elif entry["direction"] == "negative":
                    counter += entry["strength"]
        for tag in negative_tags:
            for entry in tag_index.get(tag, []):
                if entry["direction"] in ["positive", "neutral"]:
                    counter += entry["strength"]
                elif entry["direction"] == "negative":
                    supporting += entry["strength"]
        total = supporting + counter
        confidence = "Insufficient Data"
        if total >= 6: confidence = "High"
        elif total >= 3: confidence = "Moderate"
        elif total >= 1: confidence = "Low"
        return int(supporting), int(counter), int(total), confidence

    constructs = [
        {
            "name": "Empathy",
            "pos": ["distress_response", "edge_sitter_notice", "helper_awareness", "people_priority", "sjt_empathy"],
            "neg": ["ignored_distress", "task_over_people"],
            "sjt_tag": "sjt_empathy",
            "game_pos": ["distress_response", "edge_sitter_notice", "helper_awareness", "people_priority"],
            "desc": "Responsiveness to others' emotional states and prioritization of people over tasks."
        },
        {
            "name": "Conscientiousness",
            "pos": ["project_completion", "methodical_collection", "sjt_conscientiousness"],
            "neg": ["abandoned_project", "erratic_movement"],
            "sjt_tag": "sjt_conscientiousness",
            "game_pos": ["project_completion", "methodical_collection"],
            "desc": "Reliability, organization, and commitment to completing structural tasks."
        },
        {
            "name": "Collaborative Spirit",
            "pos": ["shared_project_contribution", "helped_helper", "sjt_collaborative"],
            "neg": ["hoarded_resources"],
            "sjt_tag": "sjt_collaborative",
            "game_pos": ["shared_project_contribution", "helped_helper"],
            "desc": "Willingness to share resources and work alongside others on joint goals."
        },
        {
            "name": "Emotional Agility",
            "pos": ["fast_recovery", "sjt_emotional"],
            "neg": ["paralysis", "panic_clicking"],
            "sjt_tag": "sjt_emotional",
            "game_pos": ["fast_recovery"],
            "desc": "Ability to maintain composure and adapt quickly after a sudden disruption."
        },
        {
            "name": "Curiosity & Learning",
            "pos": ["fog_exploration", "novelty_seeking", "sjt_curiosity"],
            "neg": ["ignored_fogs", "repetitive_loops"],
            "sjt_tag": "sjt_curiosity",
            "game_pos": ["fog_exploration", "novelty_seeking"],
            "desc": "Drive to explore the unknown, reveal hidden information, and seek new paths."
        },
        {
            "name": "Creative Initiative",
            "pos": ["creative_zone_usage", "unprompted_action", "sjt_creative"],
            "neg": ["rigid_adherence"],
            "sjt_tag": "sjt_creative",
            "game_pos": ["creative_zone_usage", "unprompted_action"],
            "desc": "Tendency to create structure where none exists and utilize open creative spaces."
        }
    ]

    db.query(DBConstructEvidence).filter(DBConstructEvidence.assessment_id == assessment_id).delete()

    for c in constructs:
        sup, ctr, total, confidence = score_construct(c["pos"], c["neg"])
        
        # Calculate Reliability (Game vs SJT)
        game_sup, _, _, _ = score_construct(c["game_pos"], [])
        sjt_sup, _, _, _ = score_construct([c["sjt_tag"]], [])
        
        reliability_msg = "Unknown"
        if sjt_sup > 0 and game_sup > 0:
            reliability_msg = "High Consistency (Demonstrated in both Implicit Simulation & Explicit SJT)"
        elif sjt_sup > 0 and game_sup == 0:
            reliability_msg = "Explicit Only (Candidate endorsed this trait in theory, but did not demonstrate it in simulation)"
        elif sjt_sup == 0 and game_sup > 0:
            reliability_msg = "Implicit Only (Candidate naturally demonstrated this trait, though did not explicitly select it)"

        if total == 0:
            interp = f"No behavioral indicators observed for {c['name'].lower()}."
        else:
            interp = f"{c['desc']} Total Score: {sup}. Reliability: {reliability_msg}."

        ev = DBConstructEvidence(
            assessment_id=assessment_id,
            construct=c["name"],
            supporting_count=sup,
            counter_count=ctr,
            context_count=len(events),
            confidence=confidence,
            interpretation=interp
        )
        db.add(ev)

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
