import argparse
import sys
import os

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from app.db.session import engine, SessionLocal
from app.models.recruit import DBSession, DBFeature, DBEvidence
from app.services.feature_extractor import extract_session_features
from app.services.evidence_integrator import integrate_session_evidence
from sqlmodel import select

def recompute_session(session_id: str):
    db = SessionLocal()
    try:
        sess = db.get(DBSession, session_id)
        if not sess:
            print(f"Error: Session {session_id} not found.")
            return False

        features = extract_session_features(db, session_id)
        evidence = integrate_session_evidence(db, session_id, force_recompute=True)
        ver = evidence[0].version if evidence else 1
        print(f"[RECOMPUTE] Session {session_id}: Extracted {len(features)} features, derived {len(evidence)} evidence records (version {ver}).")
        return True
    finally:
        db.close()

def recompute_all():
    db = SessionLocal()
    try:
        sessions = db.exec(select(DBSession)).all()
        print(f"[RECOMPUTE] Found {len(sessions)} sessions in database.")
        for s in sessions:
            extract_session_features(db, s.session_id)
            integrate_session_evidence(db, s.session_id, force_recompute=True)
        print(f"[RECOMPUTE] Recomputation complete for all {len(sessions)} sessions.")
    finally:
        db.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Deterministic Evidence Recomputation Engine")
    parser.add_argument("--session", type=str, help="Specific session_id to recompute")
    parser.add_argument("--all", action="store_true", help="Recompute all sessions")

    args = parser.parse_args()
    if args.session:
        recompute_session(args.session)
    elif args.all:
        recompute_all()
    else:
        parser.print_help()
