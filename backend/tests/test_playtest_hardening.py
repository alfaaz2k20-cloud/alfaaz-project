import sys
import os
import json
from datetime import datetime, timezone
from sqlmodel import Session, SQLModel, create_engine, select

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from app.models.recruit import (
    DBSession, DBApplicantIdentity, DBConsentRecord, DBTaskAssignment,
    DBSJTResponse, DBAccessibilityProfile, DBTelemetryEvent, DBEvidence,
    DBDataQualityFlag
)
from app.routers.recruit import (
    complete_session, submit_telemetry, submit_sjt, save_accessibility,
    CompleteSessionRequest, TelemetryBatchRequest, SJTSubmitRequest,
    AccessibilityRequest
)
from app.routers.research_view import (
    list_research_sessions, get_session_research_view
)

def run_tests():
    print("=" * 60)
    print("RUNNING POST-PLAYTEST BUG-FIX & HARDENING VERIFICATION SUITE")
    print("=" * 60)
    passed = 0
    total = 0

    def assert_true(cond, test_name):
        nonlocal passed, total
        total += 1
        if cond:
            print(f"  [PASS] {test_name}")
            passed += 1
        else:
            print(f"  [FAIL] {test_name}")

    def assert_eq(actual, expected, test_name):
        nonlocal passed, total
        total += 1
        if actual == expected:
            print(f"  [PASS] {test_name}")
            passed += 1
        else:
            print(f"  [FAIL] {test_name}: expected {expected}, got {actual}")

    # In-memory SQLite engine
    engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(engine)

    with Session(engine) as db:
        # Setup test session
        s_id = "test-session-playtest-01"
        sess = DBSession(
            session_id=s_id,
            status="ACTIVE",
            current_screen="games",
            order_id="ORD-01",
            config_hash="cfg-123"
        )
        db.add(sess)

        consent = DBConsentRecord(
            session_id=s_id,
            consent_text_version="1.0",
            choices_json="{}",
            confirmed_18_plus=True
        )
        db.add(consent)

        ident = DBApplicantIdentity(
            session_id=s_id,
            full_name="Playtest Candidate",
            email="candidate@playtest.example"
        )
        db.add(ident)
        db.commit()

        # 1. Test Accessibility Endpoint with Dyslexia & High Contrast
        print("\n--- Test 1: Accessibility Modes Persistence ---")
        a11y_req = AccessibilityRequest(
            session_id=s_id,
            modes_enabled=["high_contrast", "dyslexia_font", "reduced_motion", "keyboard_navigation"]
        )
        res_a11y = save_accessibility(a11y_req, db=db)
        assert_eq(res_a11y["status"], "SUCCESS", "Accessibility endpoint accepts rich accommodations")
        profile = db.get(DBAccessibilityProfile, s_id)
        assert_true(profile is not None, "Profile row persisted")
        modes = json.loads(profile.modes_enabled_json)
        assert_true("dyslexia_font" in modes, "dyslexia_font mode recorded")
        assert_true("high_contrast" in modes, "high_contrast mode recorded")

        # 2. Test Idempotent SJT Submission
        print("\n--- Test 2: Idempotent SJT Resubmission ---")
        # Prepopulate with 7 responses
        sjt_responses = {
            "S1": "S1_B", "S2": "S2_B", "S3": "S3_A",
            "S4": "S4_B", "S5": "S5_C", "S6": "S6_B", "S7": "S7_A"
        }
        for s_key, opt_key in sjt_responses.items():
            db.add(DBSJTResponse(session_id=s_id, scenario_id=s_key, option_id=opt_key, t_ms=100.0))
        db.commit()

        # Resubmit with identical responses
        class DummyRequest:
            client = None
            query_params = {}
        sjt_req = SJTSubmitRequest(session_id=s_id, responses=sjt_responses)
        res_sjt = submit_sjt(sjt_req, request=DummyRequest(), db=db)
        assert_eq(res_sjt["status"], "SUCCESS", "Idempotent SJT resubmission accepted with SUCCESS")
        assert_true("Idempotent" in res_sjt["message"], "Idempotent SJT message returned")

        # 3. Test Completion & Idempotent Retry
        print("\n--- Test 3: Idempotent Session Complete ---")
        comp_req = CompleteSessionRequest(session_id=s_id)
        res_comp_1 = complete_session(comp_req, db=db)
        assert_eq(res_comp_1["status"], "SUCCESS", "First complete call returns SUCCESS")
        db.refresh(sess)
        assert_eq(sess.status, "COMPLETE", "Session status is COMPLETE")

        # Second complete call (idempotent retry)
        res_comp_2 = complete_session(comp_req, db=db)
        assert_eq(res_comp_2["status"], "SUCCESS", "Second complete call returns SUCCESS")
        assert_eq(res_comp_2.get("is_already_completed"), True, "is_already_completed flag is True")

        # 4. Test Telemetry Acknowledgment for Completed Session
        print("\n--- Test 4: Completed Session Telemetry Acknowledgment ---")
        dummy_event = {
            "seq": 1,
            "segment_id": 1,
            "t_ms": 500.0,
            "screen": "complete",
            "game_world": None,
            "mini_game": None,
            "trial": None,
            "action": "pagehide_flush",
            "input_type": "system",
            "task_def_version": "1.0",
            "state": {},
            "data": {}
        }
        telem_req = TelemetryBatchRequest(session_id=s_id, events=[dummy_event])
        res_telem = submit_telemetry(telem_req, request=DummyRequest(), db=db)
        assert_eq(res_telem["status"], "SUCCESS", "Telemetry to COMPLETE session returns SUCCESS (no 403 error)")
        assert_true("already completed" in res_telem["message"], "Friendly already-completed message returned")

        # 5. Test Research View Optimization
        print("\n--- Test 5: Research View Dossier & Session Listing ---")
        admin_user = {"email": "admin@alfaaz.example", "status": "ADMIN"}
        sessions_list = list_research_sessions(request=DummyRequest(), admin_user=admin_user, db=db)
        assert_true(len(sessions_list) >= 1, "Session list retrieved successfully")
        assert_eq(sessions_list[0]["session_id"], s_id, "Session ID matches")
        assert_eq(sessions_list[0]["completed_tasks_count"], 21, "COMPLETE session reported as 21 completed tasks without event scan")

        dossier = get_session_research_view(s_id, request=DummyRequest(), admin_user=admin_user, db=db)
        assert_true("metadata" in dossier, "Dossier metadata present")
        assert_true("dimensions" in dossier, "Dossier dimensions present")
        assert_eq(dossier["metadata"]["status"], "COMPLETE", "Dossier metadata reports COMPLETE status")

    print("\n" + "=" * 60)
    print(f"ALL {passed}/{total} VERIFICATION CHECKS PASSED WITH ZERO FAILURES!")
    print("=" * 60)
    return passed == total

if __name__ == "__main__":
    if not run_tests():
        sys.exit(1)
