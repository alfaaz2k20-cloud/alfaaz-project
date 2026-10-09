import logging
from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker
from recruit_system.core.config import SQLALCHEMY_DATABASE_URL

logger = logging.getLogger("app.db")
logger.info("Initializing database engine...")

connect_args = (
    {"check_same_thread": False}
    if "sqlite" in SQLALCHEMY_DATABASE_URL
    else {
        "connect_timeout": 10,
        "options": "-c lock_timeout=5000 -c statement_timeout=15000",
    }
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
    pool_recycle=300
)

_masked_url = engine.url.render_as_string(hide_password=True)
logger.info("Database engine initialized: %s", _masked_url)

def init_db(target_engine=engine):
    try:
        from sqlmodel import SQLModel
        from recruit_system.models.recruit import DBApplicantIdentity
        SQLModel.metadata.create_all(target_engine)
        from sqlalchemy import text
        with target_engine.connect() as conn:
            conn.execute(text("ALTER TABLE applicant_identities ADD COLUMN linkedin_url VARCHAR(500);"))
            conn.commit()
    except Exception:
        pass

init_db(engine)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
