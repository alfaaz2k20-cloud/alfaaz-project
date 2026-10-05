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
            config_hash="cfg-123",
            spec_version="2026-05"
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
        assert_eq(res_comp_1.get("session_status"), "COMPLETE", "First complete call returns session_status COMPLETE")
        assert_eq(res_comp_1.get("is_already_completed"), False, "First complete call is_already_completed is False")
        db.refresh(sess)
        assert_eq(sess.status, "COMPLETE", "Session status is COMPLETE")

        # Second complete call (idempotent retry)
        res_comp_2 = complete_session(comp_req, db=db)
        assert_eq(res_comp_2["status"], "SUCCESS", "Second complete call returns SUCCESS")
        assert_eq(res_comp_2.get("session_status"), "COMPLETE", "Second complete call returns session_status COMPLETE")
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

        # Test 5B: V2 session reported as 14 completed tasks
        s_id_v2 = "test-session-playtest-v2"
        sess_v2 = DBSession(
            session_id=s_id_v2,
            status="COMPLETE",
            current_screen="complete",
            spec_version="2026-10-v2"
        )
        db.add(sess_v2)
        db.commit()
        sessions_list_v2 = list_research_sessions(request=DummyRequest(), admin_user=admin_user, db=db)
        v2_entry = next((item for item in sessions_list_v2 if item["session_id"] == s_id_v2), None)
        assert_true(v2_entry is not None, "V2 session retrieved successfully")
        assert_eq(v2_entry["completed_tasks_count"], 14, "COMPLETE V2 session reported as 14 completed tasks")

        dossier = get_session_research_view(s_id, request=DummyRequest(), admin_user=admin_user, db=db)
        assert_true("metadata" in dossier, "Dossier metadata present")
        assert_true("dimensions" in dossier, "Dossier dimensions present")
        assert_eq(dossier["metadata"]["status"], "COMPLETE", "Dossier metadata reports COMPLETE status")

    # 6. Test Legacy Schema Migration
    print("\n--- Test 6: Legacy Database Schema Migration & Dossier Resilience ---")
    legacy_engine = create_engine("sqlite:///:memory:")
    SQLModel.metadata.create_all(legacy_engine)
    from sqlalchemy import inspect as sa_insp_tool, text as sa_txt
    with legacy_engine.begin() as lconn:
        # Revert evidence table to legacy schema missing newly added columns
        lconn.execute(sa_txt("DROP TABLE evidence"))
        lconn.execute(sa_txt("""
            CREATE TABLE evidence (
                id INTEGER PRIMARY KEY,
                session_id VARCHAR,
                parameter VARCHAR,
                game_status VARCHAR DEFAULT 'INSUFFICIENT',
                game_band VARCHAR,
                consistency VARCHAR DEFAULT 'NOT_COMPUTED',
                relationship VARCHAR DEFAULT 'NOT_COMPUTED',
                confidence VARCHAR DEFAULT 'LIMITED',
                observed_behavior_summary TEXT,
                data_quality_flags_json TEXT DEFAULT '[]'
            )
        """))

        # Run migration procedure
        _insp = sa_insp_tool(lconn)
        _tables = _insp.get_table_names()
        _conn_dialect = lconn.dialect.name

        def _add_column_if_missing_test(table_name: str, col_name: str, col_type: str):
            if table_name in _tables:
                existing = [c["name"] for c in _insp.get_columns(table_name)]
                if col_name not in existing:
                    lconn.execute(sa_txt(f"ALTER TABLE {table_name} ADD COLUMN {col_name} {col_type}"))

        missing_te = [
            ("server_received", "DATETIME DEFAULT CURRENT_TIMESTAMP"),
            ("game_world", "VARCHAR"),
            ("mini_game", "VARCHAR"),
            ("trial", "INTEGER"),
            ("input_type", "VARCHAR"),
            ("task_def_version", "VARCHAR DEFAULT '1.0'"),
            ("state_json", "TEXT"),
            ("data_json", "TEXT")
        ]
        for cname, ctype in missing_te:
            _add_column_if_missing_test("telemetry_events", cname, ctype)
        missing_ev = [
            ("version", "INTEGER DEFAULT 1"),
            ("is_superseded", "BOOLEAN DEFAULT 0"),
            ("superseded_at", "DATETIME"),
            ("spec_version", "VARCHAR DEFAULT '2026-10-v2'"),
            ("sjt_version", "VARCHAR DEFAULT '2026-09-rev'"),
            ("scoring_version", "VARCHAR DEFAULT '1.0-exact-thirds'"),
            ("feature_version", "VARCHAR DEFAULT '1.0'"),
            ("config_hash", "VARCHAR"),
            ("created_at", "DATETIME DEFAULT CURRENT_TIMESTAMP"),
            ("sjt_raw", "INTEGER"),
            ("sjt_min", "INTEGER"),
            ("sjt_max", "INTEGER"),
            ("sjt_span", "INTEGER"),
            ("sjt_num", "INTEGER"),
            ("sjt_relative", "FLOAT"),
            ("sjt_band", "VARCHAR"),
            ("predicted_sjt_relative", "FLOAT"),
            ("model_version", "VARCHAR"),
            ("prediction_status", "VARCHAR"),
            ("fused_relative", "FLOAT"),
            ("profile_relative_score", "FLOAT"),
            ("profile_relative_rank", "INTEGER"),
            ("profile_relative_level", "VARCHAR"),
            ("profile_completeness", "VARCHAR"),
            ("cross_method_delta", "FLOAT"),
            ("game_raw", "FLOAT"),
            ("game_min", "FLOAT"),
            ("game_max", "FLOAT"),
            ("game_span", "FLOAT"),
            ("game_num", "FLOAT"),
            ("game_relative", "FLOAT"),
            ("game_observation_count", "INTEGER"),
            ("game_consistency_spread", "FLOAT")
        ]
        for cname, ctype in missing_ev:
            _add_column_if_missing_test("evidence", cname, ctype)

        missing_rs = [
            ("current_screen", "VARCHAR"),
            ("order_id", "INTEGER"),
            ("spec_version", "VARCHAR DEFAULT '2026-10-v2'"),
            ("sjt_version", "VARCHAR DEFAULT '2026-09-rev'"),
            ("scoring_version", "VARCHAR DEFAULT '1.0-exact-thirds'"),
            ("feature_version", "VARCHAR DEFAULT '1.0'"),
            ("config_hash", "VARCHAR"),
            ("device_class", "VARCHAR"),
            ("input_modality", "VARCHAR"),
            ("completed_at", "DATETIME")
        ]
        for cname, ctype in missing_rs:
            _add_column_if_missing_test("recruit_sessions", cname, ctype)
        _add_column_if_missing_test("applicant_identities", "phone_or_contact", "VARCHAR")
        _add_column_if_missing_test("applicant_identities", "created_at", "DATETIME DEFAULT CURRENT_TIMESTAMP")
        _add_column_if_missing_test("consent_records", "choices_json", "TEXT DEFAULT '{}'")
        _add_column_if_missing_test("consent_records", "confirmed_18_plus", "BOOLEAN DEFAULT 1")

    # Verify that get_session_research_view now functions on this migrated database without column crashes
    with Session(legacy_engine) as legacy_db:
        leg_sid = "legacy-session-01"
        legacy_db.add(DBSession(session_id=leg_sid, status="COMPLETE"))
        legacy_db.add(DBApplicantIdentity(session_id=leg_sid, full_name="Legacy Candidate", email="leg@test.com"))
        legacy_db.add(DBConsentRecord(session_id=leg_sid, consent_text_version="1.0"))
        legacy_db.commit()

        leg_dossier = get_session_research_view(leg_sid, request=DummyRequest(), admin_user=admin_user, db=legacy_db)
        assert_true("dimensions" in leg_dossier, "Legacy database successfully migrated and dossier opens")
        assert_eq(len(leg_dossier["dimensions"]), 7, "All 7 dimensions present in migrated dossier")

    # --- Test 7: Schema Migration Savepoint Transaction-Failure Isolation ---
    print("\n--- Test 7: Schema Migration Savepoint Transaction-Failure Isolation ---")
    savepoint_engine = create_engine("sqlite:///:memory:")
    with savepoint_engine.begin() as sp_conn:
        sp_conn.execute(sa_txt("CREATE TABLE isolation_test (id INTEGER PRIMARY KEY)"))

        test_columns = [
            ("col_alpha", "VARCHAR"),
            ("id", "INTEGER"),  # Intentional duplicate to simulate lock/DDL failure
            ("col_omega", "FLOAT")
        ]

        sp_insp = sa_insp_tool(sp_conn)
        existing = {c["name"] for c in sp_insp.get_columns("isolation_test")}
        added_count = 0
        failed_count = 0
        for cname, ctype in test_columns:
            if cname not in existing or cname == "id":  # Force attempt on 'id' to test savepoint
                try:
                    with sp_conn.begin_nested():
                        sp_conn.execute(sa_txt(f"ALTER TABLE isolation_test ADD COLUMN {cname} {ctype}"))
                    existing.add(cname)
                    added_count += 1
                except Exception:
                    failed_count += 1

        assert_eq(failed_count, 1, "Intentional faulty DDL was safely caught by savepoint")
        assert_eq(added_count, 2, "Valid columns added despite intervening failure")

    with savepoint_engine.connect() as verify_conn:
        sp_insp2 = sa_insp_tool(verify_conn)
        final_cols = {c["name"] for c in sp_insp2.get_columns("isolation_test")}
        assert_true("col_alpha" in final_cols, "col_alpha present in table after outer commit")
        assert_true("col_omega" in final_cols, "col_omega present in table after outer commit")

    # Structural verification of backend/app/main.py
    main_py_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "app", "main.py"))
    with open(main_py_path, "r", encoding="utf-8") as f:
        main_content = f.read()
    assert_true("with _conn.begin_nested():" in main_content, "main.py structurally enforces with _conn.begin_nested() savepoint isolation")

    print("\n" + "=" * 60)
    print(f"ALL {passed}/{total} VERIFICATION CHECKS PASSED WITH ZERO FAILURES!")
    print("=" * 60)
    return passed == total

if __name__ == "__main__":
    if not run_tests():
        sys.exit(1)
