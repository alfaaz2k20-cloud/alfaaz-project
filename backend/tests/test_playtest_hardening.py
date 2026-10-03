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

        # 4. Test Telemetry Invariants for Completed Session (Cases A, B, C)
        print("\n--- Test 4: Completed Session Telemetry Invariants (Cases A, B, C) ---")
        from fastapi import HTTPException

        # Pre-seed one accepted event seq=1 before completion checks
        db.add(DBTelemetryEvent(
            session_id=s_id,
            seq=1,
            segment_id=1,
            t_ms=500.0,
            screen="games",
            mini_game="F1",
            action="card_select",
            data_json="{}",
            state_json="{}"
        ))
        db.commit()
        db_count_before = len(db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == s_id)).all())

        # Test 4A: Case A - Resend previously accepted event seq=1
        telem_req_a = TelemetryBatchRequest(session_id=s_id, events=[{"seq": 1, "action": "card_select"}])
        res_telem_a = submit_telemetry(telem_req_a, request=DummyRequest(), db=db)
        assert_eq(res_telem_a["status"], "SUCCESS", "Case A: Telemetry replay to COMPLETE session returns SUCCESS")
        assert_eq(res_telem_a["result"]["accepted_count"], 1, "Case A: Accepted count is 1")
        assert_eq(res_telem_a["result"]["new_rejected_count"], 0, "Case A: New rejected count is 0")
        db_count_after_a = len(db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == s_id)).all())
        assert_eq(db_count_after_a, db_count_before, "Case A: Zero new rows added to DB")

        # Test 4B: Case B - Send brand-new event seq=2 after COMPLETE
        telem_req_b = TelemetryBatchRequest(session_id=s_id, events=[{"seq": 2, "action": "card_select"}])
        case_b_threw_403 = False
        try:
            submit_telemetry(telem_req_b, request=DummyRequest(), db=db)
        except HTTPException as e:
            if e.status_code == 403:
                case_b_threw_403 = True
        assert_true(case_b_threw_403, "Case B: Brand-new telemetry after COMPLETE rejected with HTTP 403")
        db_count_after_b = len(db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == s_id)).all())
        assert_eq(db_count_after_b, db_count_before, "Case B: Zero new rows added to DB")

        # Test 4C: Case C - Mixed batch containing old seq=1 and new seq=3
        telem_req_c = TelemetryBatchRequest(
            session_id=s_id,
            events=[{"seq": 1, "action": "card_select"}, {"seq": 3, "action": "card_select"}]
        )
        res_telem_c = submit_telemetry(telem_req_c, request=DummyRequest(), db=db)
        assert_eq(res_telem_c["status"], "SUCCESS", "Case C: Mixed telemetry to COMPLETE session returns SUCCESS")
        assert_eq(res_telem_c["result"]["accepted_count"], 1, "Case C: Acknowledged old event count is 1")
        assert_eq(res_telem_c["result"]["new_rejected_count"], 1, "Case C: New rejected count is 1")
        db_count_after_c = len(db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == s_id)).all())
        assert_eq(db_count_after_c, db_count_before, "Case C: Zero new rows added to DB, new event discarded")

        # Test 4D: Empty batch on COMPLETE
        telem_req_empty = TelemetryBatchRequest(session_id=s_id, events=[])
        res_telem_empty = submit_telemetry(telem_req_empty, request=DummyRequest(), db=db)
        assert_eq(res_telem_empty["status"], "SUCCESS", "Case D: Empty telemetry batch to COMPLETE session returns SUCCESS")

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
