import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import Response
from recruit_system.db.session import engine
from recruit_system.routers import recruit, research_view
from sqlmodel import SQLModel
from recruit_system.models.recruit import DBApplicantIdentity, DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app.main")

class RequestSizeLimitMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        max_size = 256 * 1024 if request.url.path == "/recruit/telemetry" else 16 * 1024
        content_length = request.headers.get("content-length")
        if content_length:
            try:
                if int(content_length) > max_size:
                    return Response(status_code=413, content="Payload Too Large")
            except ValueError:
                pass

        body = await request.body()
        if len(body) > max_size:
            return Response(status_code=413, content="Payload Too Large")

        return await call_next(request)

app = FastAPI(title="Alfaaz Recruit System")

app.add_middleware(RequestSizeLimitMiddleware)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    logger.info("Initializing database...")
    SQLModel.metadata.create_all(engine)
    logger.info("Database initialized.")

app.include_router(recruit.router)
app.include_router(research_view.router)

logger.info("Recruit routers registered.")
