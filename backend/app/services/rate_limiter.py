import time
import os
from collections import defaultdict
from typing import Dict, List, Optional
from fastapi import HTTPException, Request

def get_client_ip(request: Request) -> str:
    """
    Extracts authentic client IP.
    When behind a platform trusted reverse proxy (e.g. Render / Cloudflare):
    - Uses platform-trusted single-IP headers (CF-Connecting-IP, True-Client-IP, Render-Proxy-Client-IP).
    - For X-Forwarded-For: takes the rightmost IP (appended by the trusted proxy),
      never trusting an attacker-controlled leftmost forwarded value.
    - Falls back to request.client.host.
    """
    headers = getattr(request, "headers", None)
    if headers:
        # 1. Platform-trusted single-IP headers
        if "cf-connecting-ip" in headers:
            return headers["cf-connecting-ip"].strip()
        if "true-client-ip" in headers:
            return headers["true-client-ip"].strip()
        if "render-proxy-client-ip" in headers:
            return headers["render-proxy-client-ip"].strip()

        # 2. X-Forwarded-For: rightmost entry is appended by the nearest trusted reverse proxy
        if "x-forwarded-for" in headers:
            forwarded = headers["x-forwarded-for"]
            ips = [ip.strip() for ip in forwarded.split(",") if ip.strip()]
            if ips:
                return ips[-1]

    # 3. Direct client connection fallback
    client = getattr(request, "client", None)
    if client and getattr(client, "host", None):
        return client.host
    return "127.0.0.1"


class SimpleRateLimiter:
    def __init__(
        self,
        max_requests: int = 10,
        window_seconds: int = 60,
        detail: str = "Too many requests. Please try again later.",
    ):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.detail = detail
        self._requests: dict = defaultdict(list)

    def __call__(self, request: Request):
        ip = get_client_ip(request)
        now = time.time()
        window_start = now - self.window_seconds
        self._requests[ip] = [t for t in self._requests[ip] if t > window_start]
        if len(self._requests[ip]) >= self.max_requests:
            raise HTTPException(status_code=429, detail=self.detail)
        self._requests[ip].append(now)


class GlobalRateLimiter:
    def __init__(
        self,
        max_requests: int = 500,
        window_seconds: int = 3600,
        detail: str = "Global request limit reached. Please try again later.",
    ):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.detail = detail
        self._requests: List[float] = []

    def __call__(self, request: Optional[Request] = None):
        now = time.time()
        window_start = now - self.window_seconds
        self._requests = [t for t in self._requests if t > window_start]
        if len(self._requests) >= self.max_requests:
            raise HTTPException(status_code=429, detail=self.detail)
        self._requests.append(now)


class TokenBucket:
    def __init__(self, capacity: float, refill_rate: float):
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = capacity
        self.last_update = time.time()

    def consume(self, count: float = 1.0) -> bool:
        now = time.time()
        elapsed = now - self.last_update
        self.last_update = now
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        if self.tokens >= count:
            self.tokens -= count
            return True
        return False


class TelemetryRateLimiter:
    """
    R2 Telemetry Rate Limiter:
    - Per session: 50 requests/10s sliding window
    - Per session: token-bucket burst capacity 20, refill 5 requests/sec
    - Per IP: 3,000 requests/minute
    """
    def __init__(self):
        self._session_buckets: Dict[str, TokenBucket] = {}
        self._session_windows: Dict[str, List[float]] = defaultdict(list)
        self._ip_windows: Dict[str, List[float]] = defaultdict(list)

    def check(self, request: Request, session_id: str):
        ip = get_client_ip(request)
        now = time.time()

        # 1. Per-IP: 3000 requests / 60 seconds
        ip_start = now - 60.0
        self._ip_windows[ip] = [t for t in self._ip_windows[ip] if t > ip_start]
        if len(self._ip_windows[ip]) >= 3000:
            raise HTTPException(status_code=429, detail="IP telemetry rate limit reached (3,000 req/min)")

        # 2. Per-session sliding window: 50 requests / 10 seconds
        sess_start = now - 10.0
        self._session_windows[session_id] = [t for t in self._session_windows[session_id] if t > sess_start]
        if len(self._session_windows[session_id]) >= 50:
            raise HTTPException(status_code=429, detail="Session telemetry rate limit reached (50 req/10s)")

        # 3. Per-session token bucket: burst capacity 20, refill 5 req/s
        if session_id not in self._session_buckets:
            self._session_buckets[session_id] = TokenBucket(capacity=20.0, refill_rate=5.0)
        bucket = self._session_buckets[session_id]
        if not bucket.consume(1.0):
            raise HTTPException(status_code=429, detail="Session telemetry burst capacity reached (token bucket burst 20, refill 5/s)")

        self._ip_windows[ip].append(now)
        self._session_windows[session_id].append(now)


class IdentityRateLimiter:
    """
    R2 Identity Limiter:
    - 5 requests / session
    - 30 requests / hour / IP
    """
    def __init__(self):
        self._session_counts: Dict[str, int] = defaultdict(int)
        self._ip_windows: Dict[str, List[float]] = defaultdict(list)

    def check(self, request: Request, session_id: str):
        ip = get_client_ip(request)
        now = time.time()

        ip_start = now - 3600.0
        self._ip_windows[ip] = [t for t in self._ip_windows[ip] if t > ip_start]
        if len(self._ip_windows[ip]) >= 30:
            raise HTTPException(status_code=429, detail="IP identity submission limit reached (30/hour)")

        if self._session_counts[session_id] >= 5:
            raise HTTPException(status_code=429, detail="Session identity submission limit reached (5/session)")

        self._ip_windows[ip].append(now)
        self._session_counts[session_id] += 1


class SJTSubmitRateLimiter:
    """
    R2 SJT Submit Limiter:
    - 3 requests / session
    """
    def __init__(self):
        self._session_counts: Dict[str, int] = defaultdict(int)

    def check(self, session_id: str):
        if self._session_counts[session_id] >= 3:
            raise HTTPException(status_code=429, detail="SJT submission limit reached (3/session)")
        self._session_counts[session_id] += 1


# General Application Limiters
auth_limiter = SimpleRateLimiter(
    max_requests=5, window_seconds=60, detail="Too many login/auth attempts. Please wait a minute."
)
reset_limiter = SimpleRateLimiter(
    max_requests=3, window_seconds=300, detail="Too many password reset attempts. Please wait 5 minutes."
)
upload_limiter = SimpleRateLimiter(
    max_requests=10, window_seconds=60, detail="Too many upload requests. Please slow down."
)
form_limiter = SimpleRateLimiter(
    max_requests=10, window_seconds=60, detail="Submission rate limit reached. Please wait a moment."
)

# Recruitment Specific Limiters
recruit_session_start_minute_limiter = SimpleRateLimiter(
    max_requests=10,
    window_seconds=60,
    detail="Too many session-start requests. Please wait a moment (10/min).",
)
recruit_session_start_hour_limiter = SimpleRateLimiter(
    max_requests=60,
    window_seconds=3600,
    detail="Too many session-start requests. Please try again later (60/hour).",
)
recruit_session_start_global_limiter = GlobalRateLimiter(
    max_requests=500,
    window_seconds=3600,
    detail="Global session creation limit reached. Please try again later (500/hour).",
)

def recruit_session_start_limiter(request: Request):
    """
    Shared session-start + consent IP bucket:
    - 10 requests/minute/IP
    - 60 requests/hour/IP
    - 500 requests/hour globally
    """
    recruit_session_start_minute_limiter(request)
    recruit_session_start_hour_limiter(request)
    recruit_session_start_global_limiter(request)

recruit_identity_limiter = IdentityRateLimiter()
recruit_sjt_submit_limiter = SJTSubmitRateLimiter()
recruit_telemetry_limiter = TelemetryRateLimiter()
