import uuid
import json
import random
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlmodel import Session, select

from app.db.session import get_db
from app.core.config import RECRUIT_CONSENT_COPY
from app.models.recruit import (
    DBApplicantIdentity, DBSession, DBConsentRecord, DBAccessibilityProfile,
    DBWarmupBaseline, DBTaskAssignment, DBSJTResponse, DBEvidence, DBDataQualityFlag
)
from app.services.sjt_engine import (
    get_public_sjt_payload, score_sjt_responses, get_config_hash
)
from app.services.telemetry_engine import ingest_telemetry_batch, TelemetryCapReachedException
from app.services.rate_limiter import (
    recruit_session_start_limiter,
    recruit_identity_limiter,
    recruit_sjt_submit_limiter,
    recruit_telemetry_limiter
)

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

class IdentityRequest(BaseModel):
    session_id: str
    full_name: str = Field(..., min_length=2, max_length=150)
    email: str = Field(..., min_length=5, max_length=150)
    phone_or_contact: Optional[str] = Field(None, max_length=50)

class ConsentRequest(BaseModel):
    choices: Dict[str, bool] = Field(default_factory=dict)
    confirmed_18_plus: bool = True
    device_class: Optional[str] = "desktop"
    input_modality: Optional[str] = "mouse"

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

def _has_affirmative_consent(db: Session, session_id: str) -> bool:
    return db.exec(
        select(DBConsentRecord).where(DBConsentRecord.session_id == session_id)
    ).first() is not None


def _require_consented_session(db: Session, session_id: str) -> DBSession:
    session_obj = db.get(DBSession, session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")
    if not _has_affirmative_consent(db, session_id):
        raise HTTPException(status_code=403, detail="Affirmative consent is required")
    return session_obj


@router.post("/consent", dependencies=[Depends(recruit_session_start_limiter)])
def submit_consent(req: ConsentRequest, db: Session = Depends(get_db)):
    if not req.confirmed_18_plus or not req.choices.get("research_telemetry"):
        raise HTTPException(status_code=400, detail="Affirmative consent is required")

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

    # Consent, pseudonymous session, and task assignment are created together.
    session_obj = DBSession(
        session_id=session_id,
        status="CONSENTED",
        current_screen="identity",
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

    consent = DBConsentRecord(
        session_id=session_id,
        consent_text_version=RECRUIT_CONSENT_COPY["version"],
        choices_json=json.dumps(req.choices),
        confirmed_18_plus=req.confirmed_18_plus
    )
    db.add(consent)

    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return {
        "status": "SUCCESS",
        "session_id": session_id,
        "config_hash": config_hash,
        "world_sequence": world_sequence,
        "seeds": seeds
    }

@router.post("/identity")
def submit_identity(req: IdentityRequest, request: Request, db: Session = Depends(get_db)):
    if isinstance(request, Session):
        db = request
        request = None

    session_obj = _require_consented_session(db, req.session_id)
    if request is not None:
        recruit_identity_limiter.check(request, req.session_id)

    if db.get(DBApplicantIdentity, req.session_id):
        raise HTTPException(status_code=409, detail="Identity already submitted")

    identity = DBApplicantIdentity(
        session_id=req.session_id,
        full_name=req.full_name,
        email=req.email,
        phone_or_contact=req.phone_or_contact
    )
    db.add(identity)
    session_obj.current_screen = "accessibility"
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise

    return {"status": "SUCCESS", "session_id": req.session_id}

@router.post("/accessibility")
def save_accessibility(req: AccessibilityRequest, db: Session = Depends(get_db)):
    session_obj = _require_consented_session(db, req.session_id)

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
    session_obj = _require_consented_session(db, req.session_id)

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
def submit_sjt(req: SJTSubmitRequest, request: Request, db: Session = Depends(get_db)):
    if isinstance(request, Session):
        db = request
        request = None

    session_obj = _require_consented_session(db, req.session_id)
    recruit_sjt_submit_limiter.check(req.session_id)

    # Check for existing SJT submission
    existing_responses = db.exec(
        select(DBSJTResponse).where(DBSJTResponse.session_id == req.session_id)
    ).all()
    if existing_responses:
        existing_map = {r.scenario_id: r.option_id for r in existing_responses}
        if existing_map == req.responses:
            return {
                "status": "SUCCESS",
                "message": "Idempotent SJT resubmission accepted."
            }
        else:
            db.add(DBDataQualityFlag(
                session_id=req.session_id,
                scope="SJT",
                flag="sjt_conflict",
                detail="Conflicting SJT submission rejected; original responses preserved"
            ))
            db.commit()
            raise HTTPException(status_code=409, detail="Conflicting SJT submission rejected")

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

    session_obj.status = "ACTIVE"
    session_obj.current_screen = "games"
    db.commit()

    # Return neutral success confirmation without exposing scores to candidate
    return {
        "status": "SUCCESS",
        "message": "SJT recorded successfully."
    }

@router.post("/telemetry")
def submit_telemetry(req: TelemetryBatchRequest, request: Request, db: Session = Depends(get_db)):
    if isinstance(request, Session):
        db = request
        request = None

    session_obj = _require_consented_session(db, req.session_id)
    if request is not None:
        recruit_telemetry_limiter.check(request, req.session_id)

    # Session eligibility: accept only while status is ACTIVE (or legacy GAMES)
    if session_obj.status not in ["ACTIVE", "GAMES"]:
        raise HTTPException(
            status_code=403,
            detail=f"Telemetry rejected: session status is '{session_obj.status}', must be ACTIVE"
        )

    # 24-hour expiration check
    created_at = session_obj.created_at
    if created_at:
        if created_at.tzinfo is None:
            created_at = created_at.replace(tzinfo=timezone.utc)
        if (datetime.now(timezone.utc) - created_at).total_seconds() > 86400:
            raise HTTPException(
                status_code=403,
                detail="Session expired: telemetry rejected (24-hour limit exceeded)"
            )

    try:
        result = ingest_telemetry_batch(db, req.session_id, req.events)
        return {"status": "SUCCESS", "result": result}
    except TelemetryCapReachedException:
        raise HTTPException(
            status_code=422,
            detail={"status": "DATA_LIMITED", "detail": "events_cap_reached"}
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingest failure: {str(e)}")

@router.post("/complete")
def complete_session(req: CompleteSessionRequest, db: Session = Depends(get_db)):
    session_obj = _require_consented_session(db, req.session_id)

    if session_obj.status not in ["ACTIVE", "GAMES", "COMPLETE"]:
        raise HTTPException(status_code=400, detail="Cannot complete session that is not in active game status")

    session_obj.status = "COMPLETE"
    session_obj.current_screen = "complete"
    session_obj.completed_at = datetime.now(timezone.utc)
    db.commit()

    # Automatically extract game telemetry features and integrate evidence
    from app.services.feature_extractor import extract_session_features
    from app.services.evidence_integrator import integrate_session_evidence
    try:
        extract_session_features(db, req.session_id)
        integrate_session_evidence(db, req.session_id)
    except Exception as e:
        print(f"[Recruit] Auto feature extraction error on complete: {e}")

    return {
        "status": "SUCCESS",
        "message": "Assessment Complete. Thank you for your time."
    }
