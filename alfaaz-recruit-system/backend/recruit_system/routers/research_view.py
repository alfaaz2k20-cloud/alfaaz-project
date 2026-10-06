import json
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlmodel import Session, select
from sqlalchemy import func

from recruit_system.db.session import get_db
from recruit_system.core.security import require_admin
from recruit_system.models.recruit import (
    DBSession, DBApplicantIdentity, DBEvidence, DBFeature,
    DBDataQualityFlag, DBRecruiterAccessLog, DBSJTResponse,
    DBConsentRecord, DBTelemetryEvent, DBGameScore
)
from recruit_system.services.feature_extractor import extract_session_features
from recruit_system.services.evidence_integrator import (
    PARAM_MINIGAMES,
    classify_minigame_band,
    evaluate_minigame_status,
    integrate_session_evidence,
    load_feature_bands_config,
    load_integration_config
)
from recruit_system.services.descriptive_task_record import get_session_task_records, DOSSIER_STATEMENT
from recruit_system.services.task_definitions import (
    get_candidate_core_games,
    get_research_bank_games,
    get_expected_candidate_game_count
)

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

@router.get("", include_in_schema=True)
@router.get("/", include_in_schema=True)
def get_research_root():
    """Returns high-level status and endpoint discovery for the recruit research subsystem."""
    return {
        "status": "ACTIVE",
        "service": "Alfaaz Recruit Research & Recruiter Dossier API",
        "quarantine_status": "19_QUARANTINED_2_ACTIVE",
        "calibration_status": "UNCALIBRATED",
        "endpoints": {
            "sessions": "/recruit/research/sessions",
            "session_dossier": "/recruit/research/sessions/{session_id}",
            "config": "/recruit/research/config"
        }
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
        spec_ver = (getattr(s, "spec_version", None) or "").lower()
        is_historical = ("2026-05" in spec_ver) or ("v1" in spec_ver) or (spec_ver == "1.0")
        expected_tasks = 21 if is_historical else 14
        battery_version = "1.0" if is_historical else "2.0"

        if s.status in ("COMPLETE", "COMPLETED"):
            completed_tasks_count = expected_tasks
        else:
            completed_tasks_count = db.exec(
                select(func.count(func.distinct(DBTelemetryEvent.mini_game)))
                .where(DBTelemetryEvent.session_id == s.session_id, DBTelemetryEvent.mini_game != None)
            ).one()
        evidence_collected = has_sjt and (completed_tasks_count >= expected_tasks)

        results.append({
            "session_id": s.session_id,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "status": s.status,
            "full_name": identity.full_name if identity else "Anonymous Applicant",
            "email": identity.email if identity else "unknown",
            "phone_or_contact": identity.phone_or_contact if identity else None,
            "has_sjt": has_sjt,
            "completed_tasks_count": completed_tasks_count,
            "battery_expected_tasks": expected_tasks,
            "battery_version": battery_version,
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
@router.get("/sessions/{session_id}")
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
    try:
        access_log = DBRecruiterAccessLog(
            admin_email=admin_email,
            session_id=session_id,
            ip_address=request.client.host if request.client else None
        )
        db.add(access_log)
        db.commit()
    except Exception as _log_err:
        db.rollback()
        import logging
        logging.getLogger("research_view").warning(f"Notice: Recruiter access log skipped: {_log_err}")

    # Ensure features and evidence are extracted and integrated (reuse existing if valid and complete)
    existing_evidence = db.exec(
        select(DBEvidence).where(
            DBEvidence.session_id == session_id,
            DBEvidence.is_superseded == False
        )
    ).all()

    force_recompute = request.query_params.get("recompute", "").lower() == "true"

    session_obj = db.get(DBSession, session_id)
    is_session_complete = session_obj and session_obj.status in ("COMPLETE", "COMPLETED")

    # Auto-detect if game telemetry exists that was not yet integrated into evidence
    has_unintegrated_games = False
    if existing_evidence and any(e.profile_completeness in ("SJT_ONLY", "PARTIAL") for e in existing_evidence):
        has_game_events = db.exec(
            select(DBTelemetryEvent.id).where(
                DBTelemetryEvent.session_id == session_id,
                DBTelemetryEvent.mini_game != None
            )
        ).first() is not None
        if has_game_events:
            has_unintegrated_games = True

    if not existing_evidence or force_recompute or has_unintegrated_games:
        try:
            extract_session_features(db, session_id)
            evidence_list = integrate_session_evidence(db, session_id, force_recompute=True)
        except Exception as _integ_err:
            db.rollback()
            import logging
            import traceback
            logging.getLogger("research_view").error(f"Error integrating evidence for session {session_id}: {_integ_err}\n{traceback.format_exc()}")
            evidence_list = existing_evidence or []
    else:
        evidence_list = existing_evidence

    identity = db.get(DBApplicantIdentity, session_id)
    consent = db.exec(select(DBConsentRecord).where(DBConsentRecord.session_id == session_id)).first()
    flags = db.exec(
        select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)
    ).all()
    features = db.exec(
        select(DBFeature).where(DBFeature.session_id == session_id)
    ).all()
    features_by_game: Dict[str, List[DBFeature]] = {}
    for feature in features:
        features_by_game.setdefault(feature.mini_game, []).append(feature)
    events_count = db.exec(select(func.count(DBTelemetryEvent.id)).where(DBTelemetryEvent.session_id == session_id)).one()

    evidence_dict = {}
    for ev in evidence_list:
        evidence_dict[ev.parameter] = {
            "parameter": ev.parameter,
            "sjt_raw": ev.sjt_raw,
            "sjt_min": ev.sjt_min,
            "sjt_max": ev.sjt_max,
            "sjt_span": ev.sjt_span,
            "sjt_num": ev.sjt_num,
            "sjt_relative": ev.sjt_relative,
            "sjt_band": ev.sjt_band,
            "random_responder_reference": RANDOM_RESPONDER_REFERENCE.get(ev.parameter, {}),
            "predicted_sjt_relative": ev.predicted_sjt_relative,
            "model_version": ev.model_version,
            "prediction_status": ev.prediction_status,
            "game_raw": ev.game_raw,
            "game_min": ev.game_min,
            "game_max": ev.game_max,
            "game_span": ev.game_span,
            "game_num": ev.game_num,
            "game_relative": ev.game_relative,
            "game_observation_count": ev.game_observation_count,
            "game_consistency_spread": ev.game_consistency_spread,
            "cross_method_delta": ev.cross_method_delta,
            "profile_completeness": ev.profile_completeness,
            "game_status": ev.game_status,
            "game_band": ev.game_band,
            "consistency": ev.consistency,
            "relationship": ev.relationship,
            "confidence": ev.confidence,
            "observed_behavior": ev.observed_behavior_summary
        }

    PARAM_DISPLAY_NAMES = {
        "empathy": "Empathy",
        "conscientiousness": "Conscientiousness",
        "collaborative_spirit": "Collaborative Spirit",
        "emotional_agility": "Emotional Agility",
        "curiosity": "Curiosity",
        "creative_initiative": "Creative Initiative",
        "motivation": "Motivation"
    }

    game_scores_list = db.exec(
        select(DBGameScore).where(DBGameScore.session_id == session_id)
    ).all()
    game_scores_by_id = {gs.game_id: gs for gs in game_scores_list}

    dimensions = []
    for param_name in PARAM_MINIGAMES.keys():
        ev = next((e for e in evidence_list if e.parameter == param_name), None)
        game_ids = PARAM_MINIGAMES[param_name]
        usable_count = sum(
            1 for gid in game_ids
            if (game_scores_by_id.get(gid) and game_scores_by_id[gid].status == "USABLE" and game_scores_by_id[gid].relative_score is not None)
            or evaluate_minigame_status(gid, features_by_game.get(gid, []), flags) == "USABLE"
        )
        dimensions.append({
            "parameter": param_name,
            "display_name": PARAM_DISPLAY_NAMES.get(param_name, param_name.replace('_', ' ').title()),
            "sjt": {
                "raw": ev.sjt_raw if ev else None,
                "min": ev.sjt_min if ev else None,
                "max": ev.sjt_max if ev else None,
                "span": ev.sjt_span if ev else None,
                "num": ev.sjt_num if ev else None,
                "relative": ev.sjt_relative if ev else None,
                "band": ev.sjt_band if ev else None,
            },
            "games": {
                "status": ev.game_status if ev else "INSUFFICIENT",
                "raw": ev.game_raw if ev else None,
                "min": ev.game_min if ev else None,
                "max": ev.game_max if ev else None,
                "span": ev.game_span if ev else None,
                "num": ev.game_num if ev else None,
                "relative": ev.game_relative if ev else None,
                "band": ev.game_band if ev else None,
                "observation_count": ev.game_observation_count if ev else 0,
                "consistency": ev.consistency if ev else "INSUFFICIENT",
                "consistency_spread": ev.game_consistency_spread if ev else None,
                "usable_count": usable_count,
                "total_count": len(game_ids)
            },
            "game_relative": ev.game_relative if ev else None,
            "cross_method_delta": ev.cross_method_delta if ev else None,
            "model": {
                "status": ev.prediction_status if ev else "NOT_AVAILABLE",
                "predicted_relative": ev.predicted_sjt_relative if ev else None,
                "model_version": ev.model_version if ev else "none"
            },
            "relationship": ev.relationship if ev else "NOT_AVAILABLE",
            "confidence": ev.confidence if ev else "LIMITED",
            "observed_behavior": ev.observed_behavior_summary if ev else "No data."
        })

    # Multi-mode ranking metrics across SJT, Game, and Delta dimensions
    def _sjt_key(d):
        val = d.get("sjt", {}).get("relative")
        return (val if val is not None else -999.0, d.get("game_relative") or -999.0, d.get("parameter", ""))
    sorted_by_sjt = sorted(dimensions, key=_sjt_key, reverse=True)
    for idx, d in enumerate(sorted_by_sjt, start=1):
        d["rank_sjt"] = idx if d.get("sjt", {}).get("relative") is not None else None

    def _game_key(d):
        val = d.get("game_relative")
        return (val if val is not None else -999.0, d.get("sjt", {}).get("relative") or -999.0, d.get("parameter", ""))
    sorted_by_game = sorted(dimensions, key=_game_key, reverse=True)
    for idx, d in enumerate(sorted_by_game, start=1):
        d["rank_game"] = idx if d.get("game_relative") is not None else None

    def _delta_key(d):
        val = d.get("cross_method_delta")
        return (val if val is not None else -999.0, d.get("sjt", {}).get("relative") or -999.0, d.get("parameter", ""))
    sorted_by_delta = sorted(dimensions, key=_delta_key, reverse=True)
    for idx, d in enumerate(sorted_by_delta, start=1):
        d["rank_delta"] = idx if d.get("cross_method_delta") is not None else None

    has_any_sjt = any(d.get("sjt", {}).get("relative") is not None for d in dimensions)
    has_any_game = any(d.get("game_relative") is not None for d in dimensions)

    if has_any_sjt:
        dimensions.sort(key=_sjt_key, reverse=True)
        for idx, d in enumerate(dimensions, start=1):
            d["rank"] = idx
    elif has_any_game:
        dimensions.sort(key=_game_key, reverse=True)
        for idx, d in enumerate(dimensions, start=1):
            d["rank"] = idx
    else:
        for idx, d in enumerate(dimensions, start=1):
            d["rank"] = idx

    feature_bands_cfg = load_feature_bands_config()
    integration_cfg = load_integration_config()
    calibration_status = feature_bands_cfg.get("calibration_status", "UNCALIBRATED")
    within_game_tolerance = integration_cfg.get("consistency_max_band_range", 1)
    def parse_feature_flags(feature: DBFeature) -> List[str]:
        try:
            parsed = json.loads(feature.flags_json or "[]")
        except (TypeError, json.JSONDecodeError):
            return ["invalid_feature_flags_json"]
        return parsed if isinstance(parsed, list) else ["invalid_feature_flags_json"]

    measurement_comparisons = {}
    for parameter, game_ids in PARAM_MINIGAMES.items():
        game_measures = []
        calibrated_bands = []
        for game_id in game_ids:
            game_features = features_by_game.get(game_id, [])
            game_status = evaluate_minigame_status(game_id, game_features, flags)
            calibrated_band = None
            if calibration_status == "CALIBRATED" and game_status == "USABLE" and game_features:
                calibrated_band = classify_minigame_band(
                    game_id,
                    game_features[0].value_raw,
                    feature_bands_cfg.get("bands", {}).get(game_id)
                )
            if calibrated_band in ("LOW", "MODERATE", "HIGH"):
                calibrated_bands.append((game_id, calibrated_band))

            game_measures.append({
                "mini_game": game_id,
                "status": game_status,
                "feature_status": "NOT_DERIVED" if not game_features else (
                    "QUARANTINED" if any("feature_not_implemented" in parse_feature_flags(f) for f in game_features) else (
                        "VALID" if all(f.valid for f in game_features) else "FLAGGED"
                    )
                ),
                "features": [
                    {
                        "name": f.feature_name,
                        "value": None if "feature_not_implemented" in parse_feature_flags(f) else f.value_raw,
                        "valid": f.valid,
                        "flags": parse_feature_flags(f)
                    }
                    for f in game_features
                ],
                "calibrated_band": calibrated_band
            })

        pairwise_deltas = []
        for left_index, (left_game, left_band) in enumerate(calibrated_bands):
            for right_game, right_band in calibrated_bands[left_index + 1:]:
                band_order = {"LOW": 0, "MODERATE": 1, "HIGH": 2}
                pairwise_deltas.append({
                    "left_game": left_game,
                    "right_game": right_game,
                    "delta_bands": abs(band_order[left_band] - band_order[right_band])
                })

        evidence = evidence_dict.get(parameter, {})
        sjt_band = evidence.get("sjt_band")
        game_band = evidence.get("game_band")
        band_order = {"LOW": 0, "MODERATE": 1, "HIGH": 2}
        sjt_game_delta = None
        if calibration_status == "CALIBRATED" and sjt_band in band_order and game_band in band_order:
            sjt_game_delta = abs(band_order[sjt_band] - band_order[game_band])

        measurement_comparisons[parameter] = {
            "mini_games": game_measures,
            "within_construct_pairwise_deltas": pairwise_deltas,
            "within_construct_delta_tolerance_bands": within_game_tolerance if calibration_status == "CALIBRATED" else None,
            "sjt_band": sjt_band,
            "game_band": game_band,
            "sjt_game_delta_bands": sjt_game_delta,
            "sjt_game_relationship": evidence.get("relationship", "NOT_COMPUTED"),
            "sjt_game_delta_tolerance": None
        }

    formatted_features = []
    for f in features:
        meta = FEATURE_LABELS.get(f.feature_name, (f.mini_game, f.feature_name.replace('_', ' ').title(), "Interactive Task"))
        flags_list = parse_feature_flags(f)
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

    profile_completeness = evidence_list[0].profile_completeness if evidence_list else "INSUFFICIENT"
    profile_summary = {
        "model_id": "game_sjt_scoring_v1",
        "model_version": "1.0",
        "completeness": profile_completeness,
        "calibration_status": calibration_status,
        "interpretation_type": "WITHIN_PERSON_RELATIVE_PROFILE",
        "safeguards": {
            "statement": "Provisional within-person relative profile for exploratory human review only. Not validated for selection, hiring, or comparative ranking.",
            "overall_score_allowed": False,
            "normative_ranking_allowed": False
        }
    }
    core_games_dict = get_candidate_core_games(by_world=False)
    candidate_core_games = [g for sub in core_games_dict.values() for g in sub]
    bank_games_dict = get_research_bank_games(by_world=False)
    research_bank_games = [g for sub in bank_games_dict.values() for g in sub]

    spec_ver = (getattr(sess, "spec_version", None) or "").lower()
    is_historical = ("2026-05" in spec_ver) or ("v1" in spec_ver) or (spec_ver == "1.0")
    battery_version = "1.0" if is_historical else "2.0"
    expected_tasks = 21 if is_historical else 14

    return {
        "metadata": {
            "session_id": sess.session_id,
            "status": sess.status,
            "battery_version": battery_version,
            "expected_candidate_game_count": expected_tasks,
            "candidate_core_games": candidate_core_games,
            "research_bank_games": research_bank_games,
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
                "ipsative_note": "Parameters are derived from Situational Judgment responses and interactive behavioral tasks. These are provisional within-person relative indicators, NOT standardized trait scores.",
                "sjt_emphasis_note": "Relative emphasis in this SJT's trade-offs: higher / middle / lower."
            }
        },
        "profile_summary": profile_summary,
        "dimensions": dimensions,
        "evidence_by_parameter": evidence_dict,
        "measurement_comparisons": measurement_comparisons,
        "psychometric_status": {
            "calibration_status": calibration_status,
            "reliability": "NOT_ESTIMATED",
            "validity": "NOT_ESTIMATED",
            "regression": "DEACTIVATED",
            "reliability_method": None,
            "validity_method": None,
            "reliability_note": "Requires task-appropriate empirical normative study; cross-method delta does NOT establish reliability.",
            "validity_note": "Criterion validity and regression require linked external outcome data.",
            "single_score_status": "PROHIBITED",
            "single_score": None,
            "safeguard": "Alfaaz Recruit does not compute a single overall score, suitability score, or normative candidate ranking."
        },
        "features": formatted_features,
        "task_records": get_session_task_records(db, session_id),
        "task_records_statement": DOSSIER_STATEMENT,
        "data_quality_flags": [
            {"scope": fl.scope, "flag": fl.flag, "detail": fl.detail} for fl in flags
        ]
    }
