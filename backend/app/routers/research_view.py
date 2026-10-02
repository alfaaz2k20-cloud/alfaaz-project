import json
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlmodel import Session, select
from sqlalchemy import func

from app.db.session import get_db
from app.core.security import require_admin
from app.models.recruit import (
    DBSession, DBApplicantIdentity, DBEvidence, DBFeature,
    DBDataQualityFlag, DBRecruiterAccessLog, DBSJTResponse,
    DBConsentRecord, DBTelemetryEvent
)
from app.services.feature_extractor import extract_session_features
from app.services.evidence_integrator import integrate_session_evidence
from app.services.descriptive_task_record import get_session_task_records, DOSSIER_STATEMENT

router = APIRouter(prefix="/recruit/research", tags=["Recruiter Research View"])

# Random responder distribution reference (Brief v2 §6.3)
RANDOM_RESPONDER_REFERENCE = {
    "empathy": {"LOW": "34.6%", "MODERATE": "59.7%", "HIGH": "5.7%"},
    "conscientiousness": {"LOW": "46.0%", "MODERATE": "51.1%", "HIGH": "2.9%"},
    "collaborative_spirit": {"LOW": "34.2%", "MODERATE": "60.9%", "HIGH": "5.0%"},
    "emotional_agility": {"LOW": "43.9%", "MODERATE": "51.9%", "HIGH": "4.2%"},
    "curiosity": {"LOW": "48.2%", "MODERATE": "49.2%", "HIGH": "2.5%"},
    "creative_initiative": {"LOW": "48.9%", "MODERATE": "48.9%", "HIGH": "2.2%"},
    "motivation": {"LOW": "34.7%", "MODERATE": "59.6%", "HIGH": "5.7%"}
}

@router.get("/sessions")
def list_research_sessions(
    request: Request,
    status: Optional[str] = None,
    admin_user: dict = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Lists candidates strictly in chronological order of submission.
    Operational session-status filtering is permitted.
    Sorting, ranking, or filtering by evidence fields is strictly prohibited.
    """
    # Safeguard: disallow sorting, filtering, or searching by evidence metrics
    prohibited_evidence_params = {
        "band", "parameter", "confidence", "relationship", "score",
        "sort", "search", "rank", "fit", "features", "trait"
    }
    present_disallowed = prohibited_evidence_params.intersection(request.query_params.keys())
    if present_disallowed:
        raise HTTPException(
            status_code=400,
            detail=f"Evidence-field sorting/filtering/searching is prohibited: {', '.join(sorted(present_disallowed))}"
        )

    query = select(DBSession).order_by(DBSession.created_at.desc())
    if status:
        query = query.where(DBSession.status == status)

    sessions = db.exec(query).all()

    results = []
    for s in sessions:
        identity = db.get(DBApplicantIdentity, s.session_id)
        sjt_count = db.exec(select(func.count(DBSJTResponse.id)).where(DBSJTResponse.session_id == s.session_id)).one()
        has_sjt = (sjt_count >= 7)
        records = get_session_task_records(db, s.session_id)
        completed_tasks_count = sum(1 for r in records if r.get("status") in ("RECORDED", "USABLE"))
        evidence_collected = has_sjt and (completed_tasks_count >= 21)

        results.append({
            "session_id": s.session_id,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "status": s.status,
            "full_name": identity.full_name if identity else "Anonymous Applicant",
            "email": identity.email if identity else "unknown",
            "phone_or_contact": identity.phone_or_contact if identity else None,
            "has_sjt": has_sjt,
            "completed_tasks_count": completed_tasks_count,
            "evidence_status": "Evidence Collected" if evidence_collected else ("In Progress" if (has_sjt or completed_tasks_count > 0) else "Not Started"),
            "active_extractors_count": 2,
            "active_extractors_total": 2,
            "quarantined_extractors_count": 19
        })

    return results

FEATURE_LABELS = {
    "cue_response_latency_ms": ("Part 1: Tuning the Hall", "Sound Wave Adjustment Latency (ms)", "The Frequency"),
    "clarification_vs_assumption_ratio": ("Part 2: The Gathering Voices", "Constructive Dialogue Balance", "The Frequency"),
    "post_shift_adaptation_latency_ms": ("Part 3: The Echo of the Room", "Acoustic Shift Adaptation Time (ms)", "The Frequency"),
    "classification_rule_adherence_rate": ("Part 1: The Manuscript Folios", "Folio Sorting Accuracy", "The Archive"),
    "verification_duration_ratio": ("Part 1: The Manuscript Folios", "Guide Consultation Ratio", "The Archive"),
    "exception_flagging_precision": ("Part 2: The Fragile Leaf", "Preservation Choice Precision", "The Archive"),
    "error_detection_sensitivity": ("Part 3: The Exhibition Ledger", "Ledger Proofreading Sensitivity", "The Archive"),
    "false_alarm_rate": ("Part 3: The Exhibition Ledger", "Ledger False Alarm Rate", "The Archive"),
    "need_sensitive_sharing_index": ("Part 1: The Artisan's Basket", "Tile Sharing Balance Index", "The Shared Canvas"),
    "coordination_collision_avoidance_rate": ("Part 2: The Gallery Wall", "Layout Placement Harmony", "The Shared Canvas"),
    "constructive_repair_score": ("Part 3: The Dual Lanterns", "Dual Spotlight Balance Score", "The Shared Canvas"),
    "perseverative_error_count": ("Part 1: The Ceramic Mosaic", "Rule Switch Adaptation Errors", "The Shifting Grid"),
    "cadence_stability_ratio": ("Part 2: The Unexpected Guest", "Pace Stability on Interruption", "The Shifting Grid"),
    "strategy_shift_efficiency": ("Part 3: The Geometric Harmony", "Pattern Alignment Efficiency", "The Shifting Grid"),
    "optional_alcove_exploration_rate": ("Part 1: The Three Chambers", "Gallery Room Exploration Ratio", "The Hidden Gallery"),
    "anomaly_investigation_depth": ("Part 2: The Uncataloged Seal", "Artifact Inspection Depth", "The Hidden Gallery"),
    "integrated_insight_utilization": ("Part 3: The Weaver's Chronicle", "Storytelling Format Alignment", "The Hidden Gallery"),
    "solution_uniqueness_index": ("Part 1: The Artisan's Cord", "Material Adaptation Choice", "The Broken Tool"),
    "creative_pivot_latency_ms": ("Part 2: The Central Pillar", "Display Arrangement Latency (ms)", "The Broken Tool"),
    "functional_fixedness_overcome_rate": ("Part 3: The Printed Motif", "Creative Layout Selection", "The Broken Tool"),
    "mandatory_cadence_consistency": ("Part 1: The Wax Seal", "Stamping Rhythm Consistency", "The Repetition"),
    "optional_units_completed": ("Part 2: The Courtesy Sleeves", "Voluntary Courtesy Sleeves Completed", "The Repetition"),
    "reduced_feedback_persistence_count": ("Part 3: The Repetition Register", "Readiness Checklist Verified Items", "The Repetition")
}

@router.get("/session/{session_id}")
def get_session_research_view(
    session_id: str,
    request: Request,
    admin_user: dict = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Detailed evidence view for a specific session.
    Logs recruiter access to audit trail.
    """
    sess = db.get(DBSession, session_id)
    if not sess:
        raise HTTPException(status_code=404, detail="Session not found")

    # Log Recruiter Access
    admin_email = admin_user.get("email", "admin")
    access_log = DBRecruiterAccessLog(
        admin_email=admin_email,
        session_id=session_id,
        ip_address=request.client.host if request.client else None
    )
    db.add(access_log)
    db.commit()

    # Ensure features and evidence are extracted and integrated
    extract_session_features(db, session_id)
    evidence_list = integrate_session_evidence(db, session_id)

    identity = db.get(DBApplicantIdentity, session_id)
    consent = db.exec(select(DBConsentRecord).where(DBConsentRecord.session_id == session_id)).first()
    flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    features = db.exec(
        select(DBFeature).where(DBFeature.session_id == session_id)
    ).all()
    events_count = db.exec(select(func.count(DBTelemetryEvent.id)).where(DBTelemetryEvent.session_id == session_id)).one()

    evidence_dict = {}
    for ev in evidence_list:
        evidence_dict[ev.parameter] = {
            "parameter": ev.parameter,
            "sjt_raw": ev.sjt_raw,
            "sjt_min": ev.sjt_min,
            "sjt_max": ev.sjt_max,
            "sjt_span": ev.sjt_span,
            "sjt_band": ev.sjt_band,
            "random_responder_reference": RANDOM_RESPONDER_REFERENCE.get(ev.parameter, {}),
            "game_status": ev.game_status,
            "game_band": ev.game_band,
            "consistency": ev.consistency,
            "relationship": ev.relationship,
            "confidence": ev.confidence,
            "observed_behavior": ev.observed_behavior_summary
        }

    formatted_features = []
    for f in features:
        meta = FEATURE_LABELS.get(f.feature_name, (f.mini_game, f.feature_name.replace('_', ' ').title(), "Interactive Task"))
        flags_list = json.loads(f.flags_json) if f.flags_json else []
        is_quarantined = "feature_not_implemented" in flags_list
        formatted_features.append({
            "mini_game": f.mini_game,
            "task_title": meta[0],
            "label": meta[1],
            "world_name": meta[2],
            "feature_name": f.feature_name,
            "value_raw": None if is_quarantined else f.value_raw,
            "display_value": "Not implemented" if is_quarantined else (
                str(round(f.value_raw, 2)) if isinstance(f.value_raw, float) else str(f.value_raw)
            ),
            "valid": False if is_quarantined else f.valid,
            "flags": flags_list,
            "is_quarantined": is_quarantined,
            "status": "QUARANTINED" if is_quarantined else ("VALID" if f.valid else "FLAGGED"),
            "quarantine_reason": "Awaiting calibration data (Design Freeze v1.1)" if is_quarantined else None
        })

    # Duration calculation
    duration_minutes = None
    if sess.created_at and sess.completed_at:
        duration_minutes = round((sess.completed_at - sess.created_at).total_seconds() / 60.0, 1)

    return {
        "metadata": {
            "session_id": sess.session_id,
            "status": sess.status,
            "created_at": sess.created_at.isoformat() if sess.created_at else None,
            "completed_at": sess.completed_at.isoformat() if sess.completed_at else None,
            "duration_minutes": duration_minutes,
            "applicant": {
                "full_name": identity.full_name if identity else None,
                "email": identity.email if identity else None,
                "phone_or_contact": identity.phone_or_contact if identity else None
            },
            "consent": {
                "consent_text_version": consent.consent_text_version if consent else "1.0",
                "timestamp": consent.timestamp.isoformat() if consent and consent.timestamp else None,
                "confirmed_18_plus": consent.confirmed_18_plus if consent else True
            },
            "telemetry_summary": {
                "total_events": events_count
            },
            "safeguards": {
                "banner": "Research evidence view. Not validated. Not for selection decisions.",
                "ipsative_note": "Parameters are derived from Situational Judgment responses. These are provisional ipsative indicators, NOT standardized scores.",
                "sjt_emphasis_note": "Relative emphasis in this SJT's trade-offs: higher / middle / lower."
            }
        },
        "evidence_by_parameter": evidence_dict,
        "features": formatted_features,
        "task_records": get_session_task_records(db, session_id),
        "task_records_statement": DOSSIER_STATEMENT,
        "data_quality_flags": [
            {"scope": fl.scope, "flag": fl.flag, "detail": fl.detail} for fl in flags
        ]
    }

