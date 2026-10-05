import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine
from app.routers import recruit, research_view
from sqlmodel import SQLModel
from app.models.recruit import DBApplicantIdentity, DBSession, DBTelemetryEvent, DBFeature, DBDataQualityFlag

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("app.main")

app = FastAPI(title="Alfaaz Recruit System")

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
