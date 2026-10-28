import time
from starlette.datastructures import Headers
from fastapi import Request
from starlette.middleware.cors import CORSMiddleware
from app.main import app
from app.services.curator import GEMINI_MODEL
from app.services.rate_limiter import SimpleRateLimiter, get_client_ip

def test_cors_allows_patch_method():
    cors_middleware = None
    for middleware in app.user_middleware:
        if middleware.cls == CORSMiddleware:
            cors_middleware = middleware
            break
    assert cors_middleware is not None, "CORSMiddleware must be registered"
    allow_methods = cors_middleware.kwargs.get("allow_methods", [])
    assert "PATCH" in allow_methods, f"PATCH method must be in CORS allow_methods: {allow_methods}"

def test_curator_gemini_model_is_valid():
    assert GEMINI_MODEL in {"gemini-1.5-flash", "gemini-2.0-flash", "gemini-3.5-flash-lite"}, f"Invalid Gemini model: {GEMINI_MODEL}"

def test_rate_limiter_prunes_expired_entries():
    limiter = SimpleRateLimiter(max_requests=5, window_seconds=1)
    # Populate with old requests
    old_time = time.time() - 10
    for i in range(550):
        limiter._requests[f"old-ip-{i}"] = [old_time]

    assert len(limiter._requests) == 550

    # Make request with a mock Request object
    class DummyClient:
        host = "10.0.0.1"
    class DummyRequest:
        client = DummyClient()
        headers = {}

    req = DummyRequest()
    limiter(req)

    # After triggering __call__, expired keys should be pruned
    assert len(limiter._requests) < 500, f"Expected keys to be pruned below 500, got {len(limiter._requests)}"
    assert "10.0.0.1" in limiter._requests
