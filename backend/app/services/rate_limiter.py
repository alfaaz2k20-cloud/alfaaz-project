import time
from collections import defaultdict
from fastapi import HTTPException, Request


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
        ip = request.client.host if request.client else "127.0.0.1"
        now = time.time()
        window_start = now - self.window_seconds
        self._requests[ip] = [t for t in self._requests[ip] if t > window_start]
        if len(self._requests[ip]) >= self.max_requests:
            raise HTTPException(status_code=429, detail=self.detail)
        self._requests[ip].append(now)


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
