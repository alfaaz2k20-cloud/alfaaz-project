import uuid
import json
import logging
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status

logger = logging.getLogger("recruit_system.routers.recruit")
from pydantic import BaseModel, Field
from sqlmodel import Session, select

from recruit_system.db.session import get_db
from recruit_system.core.config import RECRUIT_CONSENT_COPY
from recruit_system.models.recruit import (
    DBApplicantIdentity, DBSession, DBConsentRecord, DBAccessibilityProfile,
    DBWarmupBaseline, DBTaskAssignment, DBSJTResponse, DBEvidence, DBDataQualityFlag,
    DBTelemetryEvent, DBInterviewBooking, DBInterviewSettings
)
from recruit_system.services.sjt_engine import (
    get_public_sjt_payload, score_sjt_responses, get_config_hash
)
from recruit_system.services.telemetry_engine import ingest_telemetry_batch, TelemetryCapReachedException
from recruit_system.services.rate_limiter import (
    recruit_session_start_limiter,
    recruit_identity_limiter,
    recruit_sjt_submit_limiter,
    recruit_telemetry_limiter
)

router = APIRouter(prefix="/recruit", tags=["Recruitment"])

from recruit_system.services.world_order import (
    LATIN_SQUARE_14,
    assign_world_order,
    get_world_order_distribution,
    verify_latin_square_balance,
    assignment_lock
)

# Maintain alias for backward compatibility
LATIN_SQUARE_7 = LATIN_SQUARE_14

class IdentityRequest(BaseModel):
    session_id: str
    full_name: str = Field(..., min_length=2, max_length=150)
    email: str = Field(..., min_length=5, max_length=150)
    phone_or_contact: Optional[str] = Field(None, max_length=50)
    whatsapp_no: Optional[str] = Field(None, max_length=50)
    linkedin_url: Optional[str] = Field(None, max_length=500)

class ScheduleInterviewRequest(BaseModel):
    session_id: str
    candidate_name: Optional[str] = None
    candidate_email: Optional[str] = None
    candidate_phone: Optional[str] = None
    slot_date: str = Field(..., min_length=4, max_length=20)
    slot_time: str = Field(..., min_length=2, max_length=20)
    slot_display: str = Field(..., min_length=5, max_length=150)
    notes: Optional[str] = None

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

    # Protect assignment with transaction/locking per Addendum 1 Section 7
    with assignment_lock:
        chosen_order_id, world_sequence, seeds = assign_world_order(db, session_id)

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

    phone_val = req.phone_or_contact or req.whatsapp_no
    identity = DBApplicantIdentity(
        session_id=req.session_id,
        full_name=req.full_name,
        email=req.email,
        phone_or_contact=phone_val,
        linkedin_url=req.linkedin_url
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
            if session_obj.status == "SJT":
                session_obj.status = "ACTIVE"
                session_obj.current_screen = "games"
                db.commit()
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
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid SJT responses")

    # Save raw responses
    for s_id, opt_id in req.responses.items():
        resp = DBSJTResponse(
            session_id=req.session_id,
            scenario_id=s_id,
            option_id=opt_id,
            t_ms=req.t_ms
        )
        db.add(resp)
    db.commit()

    # Integrate evidence records per parameter (creates version 1)
    from recruit_system.services.evidence_integrator import integrate_session_evidence
    try:
        integrate_session_evidence(db, req.session_id, force_recompute=True)
    except Exception as e:
        print(f"[Recruit] SJT evidence integration notice: {e}")

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

    # If session is already COMPLETE, enforce post-completion telemetry invariants:
    if session_obj.status == "COMPLETE":
        events = req.events or []
        if not events:
            return {
                "status": "SUCCESS",
                "message": "Session already completed; telemetry acknowledged.",
                "result": {"accepted_count": 0, "new_rejected_count": 0, "session_status": "COMPLETE"}
            }

        # Query existing event sequence numbers for this session
        existing_seqs = set(
            db.exec(
                select(DBTelemetryEvent.seq).where(DBTelemetryEvent.session_id == req.session_id)
            ).all()
        )

        already_accepted = [ev for ev in events if ev.get("seq") in existing_seqs]
        new_events = [ev for ev in events if ev.get("seq") not in existing_seqs]

        # Case B: All events are brand-new after session is COMPLETE -> Reject
        if not already_accepted and new_events:
            raise HTTPException(
                status_code=403,
                detail="Telemetry rejected: session is already COMPLETE (must be ACTIVE) and event was not previously accepted"
            )

        # Case A: All events previously accepted (or Case C: mixture of old and new)
        # Safe idempotent acknowledgement of previously accepted events; new events are NEVER persisted.
        return {
            "status": "SUCCESS",
            "message": "Session already completed; previously accepted telemetry acknowledged.",
            "result": {
                "accepted_count": len(already_accepted),
                "new_rejected_count": len(new_events),
                "session_status": "COMPLETE"
            }
        }

    # Session eligibility: telemetry strictly requires status == 'ACTIVE'
    if session_obj.status != "ACTIVE":
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
        logger.error("Telemetry ingest failure: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Ingest failure encountered during telemetry processing")

@router.post("/complete")
def complete_session(req: CompleteSessionRequest, db: Session = Depends(get_db)):
    session_obj = _require_consented_session(db, req.session_id)

    if session_obj.status not in ["ACTIVE", "COMPLETE"]:
        raise HTTPException(status_code=400, detail="Cannot complete session that is not in active game status")

    if session_obj.status == "COMPLETE":
        return {
            "status": "SUCCESS",
            "session_status": "COMPLETE",
            "message": "Assessment already completed.",
            "is_already_completed": True
        }

    session_obj.status = "COMPLETE"
    session_obj.current_screen = "complete"
    session_obj.completed_at = datetime.now(timezone.utc)
    db.commit()

    # Automatically extract game telemetry features and integrate evidence
    from recruit_system.services.feature_extractor import extract_session_features
    from recruit_system.services.evidence_integrator import integrate_session_evidence
    try:
        extract_session_features(db, req.session_id)
        integrate_session_evidence(db, req.session_id, force_recompute=True)
    except Exception as e:
        print(f"[Recruit] Auto feature extraction error on complete: {e}")

    return {
        "status": "SUCCESS",
        "session_status": "COMPLETE",
        "message": "Assessment Complete. Thank you for your time.",
        "is_already_completed": False
    }


def _send_interview_notification(booking: DBInterviewBooking, is_reschedule: bool = False):
    action_text = "Rescheduled" if is_reschedule else "Scheduled"
    subject = f"Alfaaz Interview {action_text}: {booking.candidate_name} ({booking.slot_display})"
    body = (
        f"A candidate interview has been {action_text.lower()} for the Alfaaz Collective Volunteer Assessment.\n\n"
        f"Candidate Name: {booking.candidate_name}\n"
        f"Email: {booking.candidate_email}\n"
        f"WhatsApp / Contact: {booking.candidate_phone or 'Not provided'}\n"
        f"Interview Timing: {booking.slot_display}\n"
        f"Session ID: {booking.session_id}\n\n"
        f"Recruiter Research Dossier:\n"
        f"https://alfaazcollective.vercel.app/research.html?session={booking.session_id}\n"
    )

    import os
    webhook_url = os.environ.get("MAKE_WEBHOOK_URL")
    if webhook_url:
        try:
            import requests
            # Clean standard schema strictly matching send_system_email: {to, subject, text}
            requests.post(
                webhook_url,
                json={
                    "to": "alfaaz2k20@gmail.com",
                    "subject": subject,
                    "text": body
                },
                timeout=10
            )
        except Exception as e:
            logger.warning(f"Notice sending interview email webhook: {e}")

    logger.info(f"[INTERVIEW {action_text.upper()}] {booking.candidate_name} -> {booking.slot_display} (Contact: {booking.candidate_phone})")


def _get_effective_interview_settings(db: Session):
    import os
    settings_row = db.get(DBInterviewSettings, 1)
    if settings_row:
        try:
            slots = json.loads(settings_row.slots_json)
            skip_days = json.loads(settings_row.skip_days_json)
            if slots and isinstance(slots, list):
                return slots, skip_days
        except Exception:
            pass

    env_slots = os.environ.get("RECRUIT_INTERVIEW_SLOTS")
    env_skip = os.environ.get("RECRUIT_INTERVIEW_SKIP_DAYS")
    slots = [s.strip() for s in env_slots.split(",") if s.strip()] if env_slots else ["11:00 AM", "03:00 PM", "05:30 PM", "07:00 PM"]
    skip_days = [d.strip() for d in env_skip.split(",") if d.strip()] if env_skip else ["Sunday"]
    return slots, skip_days


@router.get("/interview-slots")
def get_interview_slots(db: Session = Depends(get_db)):
    """
    Returns available interview dates and time windows for the next 7 days,
    excluding designated skip days. Already-booked slots are filtered out.
    """
    from datetime import timedelta
    now_utc = datetime.now(timezone.utc)

    active_bookings = db.exec(
        select(DBInterviewBooking).where(DBInterviewBooking.status == "SCHEDULED")
    ).all()
    booked_set = {(b.slot_date, b.slot_time) for b in active_bookings}

    standard_times, skip_days = _get_effective_interview_settings(db)
    available_days = []

    WEEKDAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    skip_day_indices = {i for i, name in enumerate(WEEKDAY_NAMES) if any(name.lower() == s.lower() for s in skip_days)}

    for day_offset in range(1, 10):
        day_date = now_utc + timedelta(days=day_offset)
        if day_date.weekday() in skip_day_indices:
            continue

        date_str = day_date.strftime("%Y-%m-%d")
        date_label = day_date.strftime("%a, %b %d")
        full_date_label = day_date.strftime("%A, %B %d, %Y")

        free_times = [t for t in standard_times if (date_str, t) not in booked_set]
        if free_times:
            available_days.append({
                "date": date_str,
                "date_label": date_label,
                "full_date_label": full_date_label,
                "times": free_times
            })

        if len(available_days) >= 6:
            break

    return {"days": available_days, "configured_slots": standard_times, "skip_days": skip_days}


@router.post("/schedule-interview")
def schedule_interview(req: ScheduleInterviewRequest, db: Session = Depends(get_db)):
    session_obj = db.get(DBSession, req.session_id)
    if not session_obj:
        raise HTTPException(status_code=404, detail="Session not found")

    identity = db.get(DBApplicantIdentity, req.session_id)
    candidate_name = req.candidate_name or (identity.full_name if identity else "Applicant")
    candidate_email = req.candidate_email or (identity.email if identity else "unknown")
    candidate_phone = req.candidate_phone or (identity.phone_or_contact if identity else None)

    collision = db.exec(
        select(DBInterviewBooking).where(
            DBInterviewBooking.slot_date == req.slot_date,
            DBInterviewBooking.slot_time == req.slot_time,
            DBInterviewBooking.status == "SCHEDULED",
            DBInterviewBooking.session_id != req.session_id
        )
    ).first()
    if collision:
        raise HTTPException(
            status_code=409,
            detail="This timing was just reserved by another candidate. Please choose another slot."
        )

    existing_booking = db.exec(
        select(DBInterviewBooking).where(DBInterviewBooking.session_id == req.session_id)
    ).first()

    if existing_booking:
        existing_booking.candidate_name = candidate_name
        existing_booking.candidate_email = candidate_email
        existing_booking.candidate_phone = candidate_phone
        existing_booking.slot_date = req.slot_date
        existing_booking.slot_time = req.slot_time
        existing_booking.slot_display = req.slot_display
        existing_booking.status = "SCHEDULED"
        existing_booking.notes = req.notes
        db.add(existing_booking)
        booking = existing_booking
    else:
        booking = DBInterviewBooking(
            session_id=req.session_id,
            candidate_name=candidate_name,
            candidate_email=candidate_email,
            candidate_phone=candidate_phone,
            slot_date=req.slot_date,
            slot_time=req.slot_time,
            slot_display=req.slot_display,
            status="SCHEDULED",
            notes=req.notes
        )
        db.add(booking)

    db.commit()
    db.refresh(booking)

    _send_interview_notification(booking)

    import urllib.parse
    wa_msg = (
        f"Hi Alfaaz Team, I ({candidate_name}) have completed the volunteer assessment "
        f"and scheduled my interview for {req.slot_display}. "
        f"Looking forward to speaking with you!"
    )
    whatsapp_notify_url = f"https://wa.me/?text={urllib.parse.quote(wa_msg)}"

    cal_title = urllib.parse.quote("Alfaaz Collective — Volunteer Interview")
    cal_desc = urllib.parse.quote(f"Volunteer interview call for {candidate_name} ({candidate_email}). WhatsApp: {candidate_phone or 'N/A'}")
    google_calendar_url = f"https://calendar.google.com/calendar/render?action=TEMPLATE&text={cal_title}&details={cal_desc}&location=Google+Meet"

    return {
        "status": "SUCCESS",
        "booking": {
            "session_id": booking.session_id,
            "candidate_name": booking.candidate_name,
            "candidate_email": booking.candidate_email,
            "candidate_phone": booking.candidate_phone,
            "slot_date": booking.slot_date,
            "slot_time": booking.slot_time,
            "slot_display": booking.slot_display,
            "status": booking.status,
            "created_at": booking.created_at.isoformat() if booking.created_at else None,
            "whatsapp_notify_url": whatsapp_notify_url,
            "google_calendar_url": google_calendar_url
        }
    }


@router.get("/interview-booking/{session_id}")
def get_interview_booking(session_id: str, db: Session = Depends(get_db)):
    booking = db.exec(
        select(DBInterviewBooking).where(DBInterviewBooking.session_id == session_id)
    ).first()
    if not booking:
        return {"booking": None}
    return {
        "booking": {
            "session_id": booking.session_id,
            "candidate_name": booking.candidate_name,
            "candidate_email": booking.candidate_email,
            "candidate_phone": booking.candidate_phone,
            "slot_date": booking.slot_date,
            "slot_time": booking.slot_time,
            "slot_display": booking.slot_display,
            "status": booking.status,
            "created_at": booking.created_at.isoformat() if booking.created_at else None
        }
    }
