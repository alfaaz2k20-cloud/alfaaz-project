from backend.app.routers import admin, auth, blogs, clubs, curator, events, exhibitions
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

# Import Database Core
from backend.app.db.session import engine, SessionLocal
from backend.app.db.base import Base
from backend.app.models.user import DBUser
from backend.app.core.config import ADMIN_PASSWORD
from backend.app.core.security import get_password_hash

# Import Routers
from backend.app.routers import (
    vault
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Initialize Application
app = FastAPI(title="Alfaaz Collective API", version="2.0")

# Setup CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://alfaazcollective.vercel.app"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect Routers
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(curator.router)
app.include_router(clubs.router)
app.include_router(exhibitions.router)
app.include_router(admin.router)
app.include_router(blogs.router)
app.include_router(vault.router)

# Server Startup Script (Ensures Admin exists)
@app.on_event("startup")
def on_startup():
    try:
        db = SessionLocal()
        master_email = "admin@alfaaz.com"
        
        # Check if master admin exists, if not, create it
        if not db.query(DBUser).filter(DBUser.email == master_email).first():
            master = DBUser(
                email=master_email,
                password=get_password_hash(ADMIN_PASSWORD),
                status="ADMIN",
                full_name="The Curator"
            )
            db.add(master)
            db.commit()
        db.close()
    except Exception as e:
        print(f"CRITICAL DB ERROR: {e}")

# Health Check Route
@app.get("/ping")
def ping():
    return {"status": "ALIVE", "message": "The monolith has been defeated."}