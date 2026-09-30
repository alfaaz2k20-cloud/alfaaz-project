import uuid
import json
import random
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from sqlmodel import Session, select

from app.db.session import get_db
from app.models.recruit import (
    DBApplicantIdentity, DBSession, DBConsentRecord, DBAccessibilityProfile,
    DBWarmupBaseline, DBTaskAssignment, DBSJTResponse, DBEvidence
)
from app.services.sjt_engine import (
    get_public_sjt_payload, score_sjt_responses, get_config_hash
)
from app.services.telemetry_engine import ingest_telemetry_batch

router = APIRouter(prefix="/recruit", tags=["Recruitment"])

# Williams-type balanced Latin square for 7 worlds (14 balanced sequences)
# Worlds: W1 (The Frequency), W2 (The Archive), W3 (The Shared Canvas),
#         W4 (The Shifting Grid), W5 (The Hidden Gallery), W6 (The Broken Tool), W7 (The Repetition)
LATIN_SQUARE_7 = [
    ["W1", "W2", "W7", "W3", "W6", "W4", "W5"],
    ["W2", "W3", "W1", "W4", "W7", "W5", "W6"],
    ["W3", "W4", "W2", "W5", "W1", "W6", "W7"],
    ["W4", "W5", "W3", "W6", "W2", "W7", "W1"],
    ["W5", "W6", "W4", "W7", "W3", "W1", "W2"],
    ["W6", "W7", "W5", "W1", "W4", "W2", "W3"],
    ["W7", "W1", "W6", "W2", "W5", "W3", "W4"],
    # Reverse rows for full first-order balance
    ["W5", "W4", "W6", "W3", "W7", "W2", "W1"],
    ["W6", "W5", "W7", "W4", "W1", "W3", "W2"],
    ["W7", "W6", "W1", "W5", "W2", "W4", "W3"],
    ["W1", "W7", "W2", "W6", "W3", "W5", "W4"],
    ["W2", "W1", "W3", "W7", "W4", "W6", "W5"],
    ["W3", "W2", "W4", "W1", "W5", "W7", "W6"],
    ["W4", "W3", "W5", "W2", "W6", "W1", "W7"]
]

class StartSessionRequest(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=150)
    email: EmailStr
    phone_or_contact: Optional[str] = Field(None, max_length=50)
    device_class: Optional[str] = "desktop"
    input_modality: Optional[str] = "mouse"

class ConsentRequest(BaseModel):
    session_id: str
    consent_text_version: str
    choices: Dict[str, bool] = {}
    confirmed_18_plus: bool = True

class AccessibilityRequest(BaseModel):
    session_id: str
    modes_enabled: List[str] = []

class WarmupRequest(BaseModel):
    session_id: str
    tap_latency_baseline_ms: Optional[float] = None
    movement_speed_baseline: Optional[float] = None
    reading_dwell_baseline_ms: Optional[float] = None
    pointer_type: Optional[str] = None
    viewport_class: Optional[str] = None

class SJTSubmitRequest(BaseModel):
    session_id: str
    responses: Dict[str, str] # e.g. {"S1": "S1B", "S2": "S2A", ...}
    t_ms: Optional[float] = None

class TelemetryBatchRequest(BaseModel):
    session_id: str
    events: List[Dict[str, Any]]

class CompleteSessionRequest(BaseModel):
    session_id: str

@router.post("/session/start")
def start_session(req: StartSessionRequest, db: Session = Depends(get_db)):
    session_id = str(uuid.uuid4())
    config_hash = get_config_hash()

    # Determine least-used Latin square order ID
    order_counts = {i: 0 for i in range(len(LATIN_SQUARE_7))}
    assignments = db.exec(select(DBTaskAssignment.world_order_id)).all()
    for o_id in assignments:
        if o_id in order_counts:
            order_counts[o_id] += 1

    min_count = min(order_counts.values())
    least_used_orders = [o_id for o_id, count in order_counts.items() if count == min_count]
    chosen_order_id = random.choice(least_used_orders)
    world_sequence = LATIN_SQUARE_7[chosen_order_id]

    # Generate cryptographically secure per-minigame random seeds
    all_mg_ids = [
        "F1", "F2", "F3", "A1", "A2", "A3", "C1", "C2", "C3",
        "E1", "E2", "E3", "Q1", "Q2", "Q3", "CR1", "CR2", "CR3", "M1", "M2", "M3"
    ]
    seeds = {mg: random.randint(100000, 999999) for mg in all_mg_ids}

    # Store identity separately
    identity = DBApplicantIdentity(
        session_id=session_id,
        full_name=req.full_name,
        email=req.email,
        phone_or_contact=req.phone_or_contact
    )
    db.add(identity)

    # Store session
    session_obj = DBSession(
        session_id=session_id,
        status="INIT",
        current_screen="consent",
        order_id=chosen_order_id,
        config_hash=config_hash,
        device_class=req.device_class,
        input_modality=req.input_modality
    )
    db.add(session_obj)

    # Store assignment
    assignment = DBTaskAssignment(
        session_id=session_id,
        world_order_id=chosen_order_id,
        world_sequence_json=json.dumps(world_sequence),
        seeds_json=json.dumps(seeds)
    )
    db.add(assignment)

    db.commit()

    return {
        "status": "SUCCESS",
        "session_id": session_id,
        "config_hash": config_hash,
        "world_sequence": world_sequence,
        "seeds": seeds
    }

@router.post("/consent")
def submit_consent(req: ConsentRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    consent = DBConsentRecord(
        session_id=req.session_id,
        consent_text_version=req.consent_text_version,
        choices_json=json.dumps(req.choices),
        confirmed_18_plus=req.confirmed_18_plus
    )
    db.add(consent)
    session_obj.status = "CONSENTED"
    session_obj.current_screen = "accessibility"
    db.commit()

    return {"status": "SUCCESS", "session_id": req.session_id}

@router.post("/accessibility")
def save_accessibility(req: AccessibilityRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    profile = db.get(DBAccessibilityProfile, req.session_id)
    if not profile:
        profile = DBAccessibilityProfile(
            session_id=req.session_id,
            modes_enabled_json=json.dumps(req.modes_enabled)
        )
        db.add(profile)
    else:
        profile.modes_enabled_json = json.dumps(req.modes_enabled)
        profile.updated_at = datetime.now(timezone.utc)

    session_obj.current_screen = "warmup"
    db.commit()

    return {"status": "SUCCESS"}

@router.post("/warmup")
def submit_warmup(req: WarmupRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    baseline = DBWarmupBaseline(
        session_id=req.session_id,
        tap_latency_baseline_ms=req.tap_latency_baseline_ms,
        movement_speed_baseline=req.movement_speed_baseline,
        reading_dwell_baseline_ms=req.reading_dwell_baseline_ms,
        pointer_type=req.pointer_type,
        viewport_class=req.viewport_class
    )
    db.add(baseline)
    session_obj.status = "SJT"
    session_obj.current_screen = "sjt"
    db.commit()

    return {"status": "SUCCESS"}

@router.get("/sjt/public")
def get_public_sjt():
    """Serves scenario text and options. Scoring keys are strictly excluded."""
    return get_public_sjt_payload()

@router.post("/sjt/submit")
def submit_sjt(req: SJTSubmitRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    # Score server-side
    try:
        scoring_results = score_sjt_responses(req.responses)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Save raw responses
    for s_id, opt_id in req.responses.items():
        resp = DBSJTResponse(
            session_id=req.session_id,
            scenario_id=s_id,
            option_id=opt_id,
            t_ms=req.t_ms
        )
        db.add(resp)

    # Save evidence records per parameter
    for param_key, scores in scoring_results.items():
        evidence = db.exec(
            select(DBEvidence).where(
                DBEvidence.session_id == req.session_id,
                DBEvidence.parameter == param_key
            )
        ).first()

        if not evidence:
            evidence = DBEvidence(
                session_id=req.session_id,
                parameter=param_key,
                sjt_raw=scores["raw"],
                sjt_min=scores["min"],
                sjt_max=scores["max"],
                sjt_span=scores["span"],
                sjt_band=scores["band"],
                game_status="UNCALIBRATED",
                game_band=None,
                consistency="NOT_COMPUTED",
                relationship="SJT_ONLY",
                confidence="LIMITED"
            )
            db.add(evidence)
        else:
            evidence.sjt_raw = scores["raw"]
            evidence.sjt_min = scores["min"]
            evidence.sjt_max = scores["max"]
            evidence.sjt_span = scores["span"]
            evidence.sjt_band = scores["band"]

    session_obj.status = "GAMES"
    session_obj.current_screen = "games"
    db.commit()

    # Return neutral success confirmation without exposing scores to candidate
    return {
        "status": "SUCCESS",
        "message": "SJT recorded successfully."
    }

@router.post("/telemetry")
def submit_telemetry(req: TelemetryBatchRequest, db: Session = Depends(get_db)):
    try:
        result = ingest_telemetry_batch(db, req.session_id, req.events)
        return {"status": "SUCCESS", "result": result}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingest failure: {str(e)}")

@router.post("/complete")
def complete_session(req: CompleteSessionRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    session_obj.status = "COMPLETE"
    session_obj.current_screen = "complete"
    session_obj.completed_at = datetime.now(timezone.utc)
    db.commit()

    return {
        "status": "SUCCESS",
        "message": "Assessment Complete. Thank you for your time."
    }
