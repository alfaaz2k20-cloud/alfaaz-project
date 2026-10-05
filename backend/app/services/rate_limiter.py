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

