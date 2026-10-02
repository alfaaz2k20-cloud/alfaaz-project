# ALFAAZ RECRUIT — PRODUCTION VERIFICATION CHECKLIST

**Document Version:** 1.0  
**Status:** RELEASE HARDENING RUNBOOK  
**Production Boundary Statement:** `"16 verified locally/statically, 6 NOT VERIFIED in production"`  

---

## 1. PRODUCTION BOUNDARY DEFINITION

Before deploying Alfaaz Recruit to a live production environment (e.g., Render web service + Managed PostgreSQL), the engineering team must execute this verification checklist.

### 1.1 The 16 Verified Items (Local / Test Suite)
The following 16 capabilities have been verified via 141 automated unit tests and static analysis:
1. SQLModel table schemas, primary keys, and index definitions.
2. Latin square counterbalanced world ordering (14 rows, `world_order.py`).
3. SJT scenarios, options, and scoring key boundaries.
4. Byte-identical synchronization of config hashes (`sjt_items.json`, `parameters.json`).
5. Task definitions byte-identity between frontend and backend (`392845e5...`).
6. Active feature extraction logic for A1 (out of 5) and A2 (out of 3 genuine exceptions).
7. Extractor quarantine enforcement (19 extractors quarantined, exactly 2 active).
8. Descriptive task record generation for all 21 games (9 return keys).
9. Telemetry ingestion rate limiters and token bucket mechanics.
10. Telemetry 4KB individual event size limit and payload masking.
11. Telemetry 50,000 session hard cap and 25,000 high-volume warning.
12. Sequence gap detection and idempotent duplicate retransmission handling.
13. Continuous pointer stream filtering before quota accounting.
14. Client-authored forbidden and unknown field stripping and diagnostic logging.
15. Candidate identity rate limiting and consent record creation.
16. Recruiter audit logging and role-based endpoint protection.

---

## 2. THE 6 ITEMS TO VERIFY IN LIVE PRODUCTION

The following 6 architectural components depend on live infrastructure characteristics (PostgreSQL engine, reverse-proxy network hops, ephemeral Dyno lifecycles) and **must be verified in the staging/production environment**:

```
+-------------------------------------------------------------------------------+
|                        PRODUCTION VERIFICATION BOUNDARY                       |
|                                                                               |
|   [LOCAL / STATIC SUITE]                     [LIVE PRODUCTION CLOUD]          |
|   16 Items Verified                          6 Items Pending Verification     |
|   - Schemas & Invariants                     1. PostgreSQL Advisory Locks     |
|   - 21 Game Task Records                     2. Trusted-Proxy IP Ingress      |
|   - Quarantine Guardrails                    3. DB Connection Pool & SSL      |
|   - SJT Scorer & Hashes                      4. Container Restart Tolerance   |
|   - Telemetry Ingestion Pipeline             5. Production CORS Enforcement   |
|                                              6. Multi-User Streaming Latency  |
+-------------------------------------------------------------------------------+
```

---

### ITEM 1: PostgreSQL Advisory Lock Concurrency
- **Risk:** SQLite in-memory does not simulate PostgreSQL transactional advisory locks (`pg_advisory_xact_lock`). Race conditions in concurrent session assignment must be ruled out.
- **Verification Procedure:**
  1. Deploy application connected to live PostgreSQL instance.
  2. Execute concurrent curl script simulating 20 simultaneous candidate starts:
     ```bash
     for i in {1..20}; do
       curl -s -X POST https://<render-backend-url>/api/recruit/session/start \
         -H "Content-Type: application/json" \
         -d "{\"email\":\"tester$i@example.com\",\"full_name\":\"Test $i\"}" &
     done
     wait
     ```
  3. Query `task_assignments` in PostgreSQL:
     ```sql
     SELECT world_order_id, COUNT(*) FROM task_assignments GROUP BY world_order_id;
     ```
  4. **Pass Criteria:** All 20 sessions created with distributed `world_order_id` values (1-14) without duplicate key errors, deadlocks, or lock timeout exceptions.

---

### ITEM 2: Trusted-Proxy Client IP Resolution
- **Risk:** Render / Cloudflare ingress headers (`cf-connecting-ip`, `true-client-ip`, `render-proxy-client-ip`, `x-forwarded-for`) must accurately resolve the real client IP without allowing client-injected header spoofing.
- **Verification Procedure:**
  1. Send a request with a spoofed leftmost `X-Forwarded-For` header:
     ```bash
     curl -i -H "X-Forwarded-For: 1.2.3.4, 198.51.100.25" \
       https://<render-backend-url>/api/recruit/warmup/baseline \
       -X POST -H "Content-Type: application/json" -d "{...}"
     ```
  2. Inspect backend logs or rate limiter keys.
  3. **Pass Criteria:** The backend extracts the true remote proxy IP (`198.51.100.25` or Cloudflare ingress IP), NEVER the spoofed client header (`1.2.3.4`).

---

### ITEM 3: Production Database Connection Pool & SSL Stability
- **Risk:** Render free/starter tiers close idle connections aggressively or limit connection pool sizes, causing `SSL EOF` or `QueuePool limit exceeded`.
- **Verification Procedure:**
  1. Verify backend `DATABASE_URL` contains `sslmode=require`.
  2. Verify SQLAlchemy engine pool configurations:
     - `pool_size=10`
     - `max_overflow=20`
     - `pool_pre_ping=True` (handles dropped connections)
     - `pool_recycle=300` (recycles connections before Render timeout)
  3. Run a sustained 5-minute health check script.
  4. **Pass Criteria:** 0 `SSL EOF detected` exceptions, 0 connection leaks.

---

### ITEM 4: Ephemeral Container Restart Tolerance
- **Risk:** In-memory rate limiters reset on Render dyno reboot, and in-flight sessions might fail if state is held in memory.
- **Verification Procedure:**
  1. Start an assessment session and complete World 1.
  2. Trigger a manual deploy or restart on Render dashboard.
  3. Wait for service to become healthy (`/healthz`).
  4. Resume candidate session on the frontend; complete World 2 and SJT.
  5. **Pass Criteria:** Frontend seamlessly flushes telemetry; backend ingests events into existing session with continuous sequence ordering; zero data loss.

---

### ITEM 5: Production CORS Header Enforcement
- **Risk:** Misconfigured CORS could allow unauthorized third-party origins to submit telemetry or access recruiter logs.
- **Verification Procedure:**
  1. Send pre-flight request with unauthorized origin:
     ```bash
     curl -i -X OPTIONS https://<render-backend-url>/api/recruit/sjt/public \
       -H "Origin: https://malicious-site.com" \
       -H "Access-Control-Request-Method: GET"
     ```
  2. Send pre-flight with authorized Vercel production frontend origin:
     ```bash
     curl -i -X OPTIONS https://<render-backend-url>/api/recruit/sjt/public \
       -H "Origin: https://alfaaz-project.vercel.app" \
       -H "Access-Control-Request-Method: GET"
     ```
  3. **Pass Criteria:** Unauthorized origin receives no `Access-Control-Allow-Origin` or HTTP 403; authorized origin receives `Access-Control-Allow-Origin: https://alfaaz-project.vercel.app` and `Access-Control-Allow-Credentials: false`.

---

### ITEM 6: Live Telemetry Volume & Ingestion Latency Under Multi-User Concurrency
- **Risk:** High-frequency event flushes from multiple simultaneous candidates could saturate FastAPI worker threads.
- **Verification Procedure:**
  1. Run a load simulation simulating 10 concurrent candidates submitting 50-event telemetry batches every 5 seconds.
  2. Monitor response times on `/api/recruit/telemetry`.
  3. **Pass Criteria:** Average response latency $< 150\text{ms}$; 99th percentile $< 400\text{ms}$; 0 dropped events; 0 unhandled 500 errors.

---

## 3. SIGN-OFF CHECKLIST

| Verification Item | Assigned Engineer | Staging Result | Production Result | Sign-Off Date |
| :--- | :--- | :--- | :--- | :--- |
| 1. PostgreSQL Advisory Locks | DevOps / Backend | [ ] PASS | [ ] PASS | _________ |
| 2. Trusted-Proxy IP Ingress | Security / DevOps | [ ] PASS | [ ] PASS | _________ |
| 3. DB Pool & SSL Stability | Backend Lead | [ ] PASS | [ ] PASS | _________ |
| 4. Ephemeral Restart Tolerance | QA / Fullstack | [ ] PASS | [ ] PASS | _________ |
| 5. Production CORS Enforcement | Security Lead | [ ] PASS | [ ] PASS | _________ |
| 6. Telemetry Streaming Latency | Performance Lead | [ ] PASS | [ ] PASS | _________ |
