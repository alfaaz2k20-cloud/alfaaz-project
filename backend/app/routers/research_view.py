from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlmodel import Session, select

from app.db.session import get_db
from app.core.security import require_admin
from app.models.recruit import (
    DBSession, DBApplicantIdentity, DBEvidence, DBFeature,
    DBDataQualityFlag, DBRecruiterAccessLog
)
from app.services.feature_extractor import extract_session_features
from app.services.evidence_integrator import integrate_session_evidence

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
    admin_user: dict = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """
    Lists candidates strictly in chronological order of submission.
    Sorting, ranking, or filtering by evidence metrics is prohibited.
    """
    sessions = db.exec(
        select(DBSession).order_by(DBSession.created_at.desc())
    ).all()

    results = []
    for s in sessions:
        identity = db.get(DBApplicantIdentity, s.session_id)
        results.append({
            "session_id": s.session_id,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "status": s.status,
            "full_name": identity.full_name if identity else "Anonymous Applicant",
            "email": identity.email if identity else "unknown"
        })

    return results

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
    flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    features = db.exec(
        select(DBFeature).where(DBFeature.session_id == session_id)
    ).all()

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

    return {
        "metadata": {
            "session_id": sess.session_id,
            "status": sess.status,
            "created_at": sess.created_at.isoformat() if sess.created_at else None,
            "completed_at": sess.completed_at.isoformat() if sess.completed_at else None,
            "applicant": {
                "full_name": identity.full_name if identity else None,
                "email": identity.email if identity else None
            },
            "safeguards": {
                "banner": "Research evidence view. Not validated. Not for selection decisions.",
                "ipsative_note": "SJT profiles are nearly ipsative by design. A higher emphasis on one parameter balances other parameters. A LOW band indicates lower relative emphasis within this specific scenario trade-off, not a deficit in personal ability or moral standing."
            }
        },
        "evidence_by_parameter": evidence_dict,
        "features": [
            {
                "mini_game": f.mini_game,
                "feature_name": f.feature_name,
                "value_raw": f.value_raw,
                "valid": f.valid
            }
            for f in features
        ],
        "data_quality_flags": [
            {"scope": fl.scope, "flag": fl.flag, "detail": fl.detail} for fl in flags
        ]
    }
