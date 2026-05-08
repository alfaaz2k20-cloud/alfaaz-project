from sqlmodel import create_engine, Session
from sqlalchemy.orm import sessionmaker
from app.core.config import SQLALCHEMY_DATABASE_URL

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in SQLALCHEMY_DATABASE_URL else {},
    pool_pre_ping=True,
    pool_recycle=300
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
