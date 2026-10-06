import unittest
import os
import sys
import json
import uuid
import time
from datetime import datetime, timezone, timedelta
from pathlib import Path
from starlette.requests import Request
from starlette.datastructures import Headers
from fastapi import HTTPException
from fastapi.testclient import TestClient

# Add backend to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from sqlmodel import Session, create_engine, SQLModel, select
from recruit_system.main import app
from recruit_system.models.recruit import (
    DBSession, DBTelemetryEvent, DBDataQualityFlag, DBSJTResponse, DBConsentRecord
)
from recruit_system.services.rate_limiter import (
    get_client_ip, SimpleRateLimiter, GlobalRateLimiter, TokenBucket,
    TelemetryRateLimiter, IdentityRateLimiter, SJTSubmitRateLimiter,
    recruit_session_start_minute_limiter, recruit_session_start_hour_limiter,
    recruit_session_start_global_limiter
)
from recruit_system.services.telemetry_engine import (
    ingest_telemetry_batch, calculate_active_duration_ms, TelemetryCapReachedException
)


def make_dummy_request(headers_dict=None, client_host="127.0.0.1"):
    raw_headers = []
    if headers_dict:
        for k, v in headers_dict.items():
            raw_headers.append((k.lower().encode("latin1"), v.encode("latin1")))
    scope = {
        "type": "http",
        "headers": raw_headers,
        "client": (client_host, 12345),
    }
    return Request(scope)


class TestGate2R2TelemetryIntegrity(unittest.TestCase):
    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.client = TestClient(app)

    # =========================================================================
    # 1. Trusted Proxy & Client IP (Section 5.2)
    # =========================================================================
    def test_trusted_proxy_platform_headers(self):
        # Cloudflare connecting IP
        req = make_dummy_request({"cf-connecting-ip": "203.0.113.195"})
        self.assertEqual(get_client_ip(req), "203.0.113.195")

        # True-Client-IP
        req = make_dummy_request({"true-client-ip": "198.51.100.44"})
        self.assertEqual(get_client_ip(req), "198.51.100.44")

        # Render proxy client IP
        req = make_dummy_request({"render-proxy-client-ip": "192.0.2.77"})
        self.assertEqual(get_client_ip(req), "192.0.2.77")

    def test_trusted_proxy_spoofed_forwarded_headers(self):
        # Attacker injects fake IP at the start of X-Forwarded-For: "attacker_spoofed_ip, trusted_proxy_ip"
        # The implementation must extract the rightmost entry, never the attacker-controlled leftmost entry.
        req = make_dummy_request({"x-forwarded-for": "10.0.0.1, 198.51.100.22"})
        self.assertEqual(get_client_ip(req), "198.51.100.22")

        # Direct connection fallback
        req = make_dummy_request({}, client_host="172.16.0.5")
        self.assertEqual(get_client_ip(req), "172.16.0.5")

    # =========================================================================
    # 2. Rate Limits (Section 5.1)
    # =========================================================================
    def test_shared_session_start_bucket(self):
        minute_limiter = SimpleRateLimiter(max_requests=10, window_seconds=60)
        hour_limiter = SimpleRateLimiter(max_requests=60, window_seconds=3600)
        global_limiter = GlobalRateLimiter(max_requests=500, window_seconds=3600)

        req = make_dummy_request({}, client_host="203.0.113.50")

        # First 10 requests pass
        for _ in range(10):
            minute_limiter(req)
            hour_limiter(req)
            global_limiter(req)

        # 11th request hits per-minute limit
        with self.assertRaises(HTTPException) as ctx:
            minute_limiter(req)
        self.assertEqual(ctx.exception.status_code, 429)

    def test_identity_rate_limiter(self):
        limiter = IdentityRateLimiter()
        req = make_dummy_request({}, client_host="203.0.113.60")
        sess_id = "sess-id-123"

        # 5 requests per session pass
        for _ in range(5):
            limiter.check(req, sess_id)

        # 6th request fails (5/session)
        with self.assertRaises(HTTPException) as ctx:
            limiter.check(req, sess_id)
        self.assertEqual(ctx.exception.status_code, 429)
        self.assertIn("5/session", ctx.exception.detail)

    def test_sjt_submit_rate_limiter(self):
        limiter = SJTSubmitRateLimiter()
        sess_id = "sess-sjt-123"

        # 3 requests pass
        for _ in range(3):
            limiter.check(sess_id)

        # 4th request fails
        with self.assertRaises(HTTPException) as ctx:
            limiter.check(sess_id)
        self.assertEqual(ctx.exception.status_code, 429)
        self.assertIn("3/session", ctx.exception.detail)

    def test_telemetry_rate_limiter_burst_and_window(self):
        limiter = TelemetryRateLimiter()
        req = make_dummy_request({}, client_host="203.0.113.70")
        sess_id = "sess-telemetry-1"

        # Token bucket burst capacity is 20
        for _ in range(20):
            limiter.check(req, sess_id)

        # 21st immediate request in the burst is rejected
        with self.assertRaises(HTTPException) as ctx:
            limiter.check(req, sess_id)
        self.assertEqual(ctx.exception.status_code, 429)
        self.assertIn("burst", ctx.exception.detail)

    # =========================================================================
    # 3. Request Body Limits & Individual Event Limit (Section 5.1)
    # =========================================================================
    def test_body_limit_oversize_rejection_http_413(self):
        # 16 KB for non-telemetry
        res = self.client.post("/recruit/consent", content=b"x" * 20000)
        self.assertEqual(res.status_code, 413)

        # 256 KB for telemetry
        res = self.client.post("/recruit/telemetry", content=b"x" * 300000)
        self.assertEqual(res.status_code, 413)

    def test_individual_event_4kb_limit_and_flag(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            # Create event where combined data + state > 4 KB
            huge_data = {"key": "x" * 5000}
            batch = [{
                "seq": 1,
                "segment_id": 1,
                "t_ms": 100.0,
                "screen": "game",
                "action": "click",
                "data": huge_data,
                "state": {"step": 1}
            }]
            res = ingest_telemetry_batch(db, session_id, batch)
            self.assertEqual(res["ingested_count"], 1)

            # Must record event_oversize flag and mask oversized raw payload
            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "event_oversize" for f in flags))

            ev = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id)).first()
            self.assertIn('"oversized": true', ev.data_json)
            self.assertNotIn("x" * 5000, ev.data_json)

    # =========================================================================
    # 4. Event Hard Cap & High-Volume Threshold (Section 5.1)
    # =========================================================================
    def test_event_cap_50k_and_high_volume_25k(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            # Seed 24,999 events
            events = [
                DBTelemetryEvent(session_id=session_id, seq=i, segment_id=1, t_ms=float(i), screen="game", action="step")
                for i in range(1, 25000)
            ]
            db.add_all(events)
            db.commit()

            # Batch crossing 25,000 threshold
            batch1 = [{"seq": 25000, "segment_id": 1, "t_ms": 25000.0, "screen": "game", "action": "step"}]
            ingest_telemetry_batch(db, session_id, batch1)

            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "events_high_volume" for f in flags))

            # Simulate existing at 49,950 events
            more_events = [
                DBTelemetryEvent(session_id=session_id, seq=i, segment_id=1, t_ms=float(i), screen="game", action="step")
                for i in range(25001, 49951)
            ]
            db.add_all(more_events)
            db.commit()

            # Attempt a batch of 60 events (would reach 50,010 -> crosses 50,000)
            # The whole batch must be rejected
            batch_over = [
                {"seq": 49951 + j, "segment_id": 1, "t_ms": float(49951 + j), "screen": "game", "action": "step"}
                for j in range(60)
            ]
            with self.assertRaises(TelemetryCapReachedException):
                ingest_telemetry_batch(db, session_id, batch_over)

            # Verify whole batch rejected: event count remains 49,950
            total_count = len(db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id)).all())
            self.assertEqual(total_count, 49950)

            # Verify session-critical events_cap_reached flag recorded
            flags_after = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "events_cap_reached" for f in flags_after))

    # =========================================================================
    # 5. Sequence Duplicate vs Conflict & Gaps (Section 5.5)
    # =========================================================================
    def test_sequence_idempotency_vs_conflict(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            batch = [{"seq": 1, "segment_id": 1, "t_ms": 10.0, "screen": "game", "action": "click", "data": {"btn": "A"}}]
            res1 = ingest_telemetry_batch(db, session_id, batch)
            self.assertEqual(res1["ingested_count"], 1)

            # 1. Identical retransmission: ignored idempotently
            res2 = ingest_telemetry_batch(db, session_id, batch)
            self.assertEqual(res2["ingested_count"], 0)
            self.assertEqual(res2["ignored_duplicates"], 1)

            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertFalse(any(f.flag == "seq_conflict" for f in flags))

            # 2. Conflicting retransmission (different action/data): retain original, record seq_conflict
            conflicting_batch = [{"seq": 1, "segment_id": 1, "t_ms": 10.0, "screen": "game", "action": "diff_action", "data": {"btn": "B"}}]
            res3 = ingest_telemetry_batch(db, session_id, conflicting_batch)
            self.assertEqual(res3["ingested_count"], 0)

            ev = db.exec(select(DBTelemetryEvent).where(DBTelemetryEvent.session_id == session_id, DBTelemetryEvent.seq == 1)).first()
            self.assertEqual(ev.action, "click")  # Original retained

            flags_after = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "seq_conflict" for f in flags_after))

    def test_sequence_gap_detection(self):
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="ACTIVE"))
            db.commit()

            # Ingest seq 1 and seq 4 (missing seq 2, 3)
            batch = [
                {"seq": 1, "segment_id": 1, "t_ms": 10.0, "screen": "game", "action": "start"},
                {"seq": 4, "segment_id": 1, "t_ms": 40.0, "screen": "game", "action": "move"}
            ]
            ingest_telemetry_batch(db, session_id, batch)

            flags = db.exec(select(DBDataQualityFlag).where(DBDataQualityFlag.session_id == session_id)).all()
            self.assertTrue(any(f.flag == "seq_gap" for f in flags))

    # =========================================================================
    # 6. Active Duration & Cross-Segment Isolation (Section 5.4, 5.1)
    # =========================================================================
    def test_duration_subtraction_for_tab_hidden_and_blur(self):
        ev1 = DBTelemetryEvent(session_id="s1", seq=1, segment_id=1, t_ms=1000.0, screen="game", action="start")
        ev2 = DBTelemetryEvent(session_id="s1", seq=2, segment_id=1, t_ms=3000.0, screen="game", action="tab_hidden")
        ev3 = DBTelemetryEvent(session_id="s1", seq=3, segment_id=1, t_ms=9000.0, screen="game", action="tab_visible")
        ev4 = DBTelemetryEvent(session_id="s1", seq=4, segment_id=1, t_ms=12000.0, screen="game", action="finish")

        dur = calculate_active_duration_ms([ev1, ev2, ev3, ev4])
        # 1000 to 3000 (2000ms) + 9000 to 12000 (3000ms) = 5000ms
        self.assertEqual(dur, 5000.0)

    def test_cross_segment_isolation_in_duration(self):
        # Segment 1: t=1000 to t=3000 (active = 2000ms)
        # Segment 2: t=100000 to t=102000 (active = 2000ms)
        # The gap between segments (97,000ms) must NOT be counted as active duration.
        ev1 = DBTelemetryEvent(session_id="s1", seq=1, segment_id=1, t_ms=1000.0, screen="game", action="start")
        ev2 = DBTelemetryEvent(session_id="s1", seq=2, segment_id=1, t_ms=3000.0, screen="game", action="step")
        ev3 = DBTelemetryEvent(session_id="s1", seq=3, segment_id=2, t_ms=100000.0, screen="game", action="start")
        ev4 = DBTelemetryEvent(session_id="s1", seq=4, segment_id=2, t_ms=102000.0, screen="game", action="finish")

        dur = calculate_active_duration_ms([ev1, ev2, ev3, ev4])
        self.assertEqual(dur, 4000.0)

    # =========================================================================
    # 7. Telemetry Eligibility & 24h Expiration (Section 5.1)
    # =========================================================================
    def test_telemetry_eligibility_status_and_expiration(self):
        # 1. Non-active status rejected
        with Session(self.engine) as db:
            session_id = str(uuid.uuid4())
            db.add(DBSession(session_id=session_id, status="CONSENTED"))
            db.add(DBConsentRecord(session_id=session_id, consent_text_version="2.0", choices_json="{}", confirmed_18_plus=True))
            db.commit()

        # In TestClient, patch db or use app database
        # We can test router logic directly by simulating the conditions:
        from recruit_system.routers.recruit import submit_telemetry, TelemetryBatchRequest
        req = TelemetryBatchRequest(session_id=session_id, events=[{"seq": 1, "t_ms": 1.0}])
        dummy_request = make_dummy_request()

        with Session(self.engine) as db:
            with self.assertRaises(HTTPException) as ctx:
                submit_telemetry(req, dummy_request, db)
            self.assertEqual(ctx.exception.status_code, 403)
            self.assertIn("must be ACTIVE", ctx.exception.detail)

            # 2. Expired session (> 24 hours) rejected
            sess = db.get(DBSession, session_id)
            sess.status = "ACTIVE"
            sess.created_at = datetime.now(timezone.utc) - timedelta(hours=25)
            db.commit()

            with self.assertRaises(HTTPException) as ctx:
                submit_telemetry(req, dummy_request, db)
            self.assertEqual(ctx.exception.status_code, 403)
            self.assertIn("24-hour limit exceeded", ctx.exception.detail)

    # =========================================================================
    # 8. R1/R2 Consent Datastore Invariants & Active Game Period Strictness
    # =========================================================================
    def test_r1_consent_datastore_invariants(self):
        """
        Verify:
        - initial page load / no action: 0 rows
        - consent declined: 0 rows
        - identity before consent: rejected, 0 rows
        - affirmative consent: exactly 1 session ('CONSENTED'), 1 consent record, 1 assignment, 0 identity
        """
        from recruit_system.routers.recruit import submit_consent, submit_identity, ConsentRequest, IdentityRequest
        from recruit_system.models.recruit import DBApplicantIdentity, DBTaskAssignment

        with Session(self.engine) as db:
            # 1. Initial datastore state: completely empty
            self.assertEqual(db.exec(select(DBSession)).all(), [])
            self.assertEqual(db.exec(select(DBConsentRecord)).all(), [])
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])
            self.assertEqual(db.exec(select(DBTaskAssignment)).all(), [])

            # 2. Consent declined (under 18 or research unchecked): 0 rows
            with self.assertRaises(HTTPException):
                submit_consent(ConsentRequest(choices={"research_telemetry": False}, confirmed_18_plus=True), db)
            with self.assertRaises(HTTPException):
                submit_consent(ConsentRequest(choices={"research_telemetry": True}, confirmed_18_plus=False), db)

            self.assertEqual(db.exec(select(DBSession)).all(), [])
            self.assertEqual(db.exec(select(DBConsentRecord)).all(), [])
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])

            # 3. Identity before consent: rejected, 0 rows
            with self.assertRaises(HTTPException):
                submit_identity(IdentityRequest(session_id="nonexistent", full_name="Test", email="t@example.com"), None, db)

            self.assertEqual(db.exec(select(DBSession)).all(), [])
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])

            # 4. Affirmative consent: atomic creation of 1 session ('CONSENTED'), 1 consent, 1 assignment
            res = submit_consent(ConsentRequest(choices={"research_telemetry": True}, confirmed_18_plus=True), db)
            sess_id = res["session_id"]

            sessions = db.exec(select(DBSession)).all()
            self.assertEqual(len(sessions), 1)
            self.assertEqual(sessions[0].session_id, sess_id)
            self.assertEqual(sessions[0].status, "CONSENTED")  # Never 'INIT'

            consents = db.exec(select(DBConsentRecord)).all()
            self.assertEqual(len(consents), 1)
            self.assertEqual(consents[0].session_id, sess_id)

            assignments = db.exec(select(DBTaskAssignment)).all()
            self.assertEqual(len(assignments), 1)
            self.assertEqual(assignments[0].session_id, sess_id)

            # Identity must remain 0 rows until explicitly submitted
            self.assertEqual(db.exec(select(DBApplicantIdentity)).all(), [])

    def test_active_game_period_strictness(self):
        """
        Verify that telemetry and completion strictly require status == 'ACTIVE'.
        Legacy 'GAMES', 'INIT', 'CONSENTED', 'SJT', or 'COMPLETE' cannot submit telemetry.
        """
        from recruit_system.routers.recruit import submit_telemetry, complete_session, TelemetryBatchRequest, CompleteSessionRequest

        with Session(self.engine) as db:
            s_id = str(uuid.uuid4())
            sess = DBSession(session_id=s_id, status="CONSENTED")
            db.add(sess)
            db.add(DBConsentRecord(session_id=s_id, consent_text_version="2.0", choices_json="{}", confirmed_18_plus=True))
            db.commit()

            req = TelemetryBatchRequest(session_id=s_id, events=[{"seq": 1, "t_ms": 1.0}])
            dummy_request = make_dummy_request()

            # Disallowed statuses for telemetry
            for disallowed in ["CONSENTED", "SJT", "GAMES", "COMPLETE"]:
                sess.status = disallowed
                db.commit()
                with self.assertRaises(HTTPException) as ctx:
                    submit_telemetry(req, dummy_request, db)
                self.assertEqual(ctx.exception.status_code, 403)
                self.assertIn("must be ACTIVE", ctx.exception.detail)

            # Completion disallowed when not ACTIVE
            sess.status = "SJT"
            db.commit()
            with self.assertRaises(HTTPException) as ctx:
                complete_session(CompleteSessionRequest(session_id=s_id), db)
            self.assertEqual(ctx.exception.status_code, 400)
            self.assertIn("Cannot complete session", ctx.exception.detail)

            # Only ACTIVE status succeeds
            sess.status = "ACTIVE"
            db.commit()
            comp_res = complete_session(CompleteSessionRequest(session_id=s_id), db)
            self.assertEqual(comp_res["status"], "SUCCESS")
            self.assertEqual(sess.status, "COMPLETE")


if __name__ == "__main__":
    unittest.main()
