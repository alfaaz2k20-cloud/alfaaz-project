from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
# NEW: The Cryptography Tools
from passlib.context import CryptContext

# ==========================================
# 0. SECURITY SETUP (The Cipher)
# ==========================================
# This tells Python to use the 'bcrypt' algorithm to scramble passwords
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# ==========================================
# 1. THE VAULT (Database Setup)
# ==========================================
SQLALCHEMY_DATABASE_URL = "sqlite:///./alfaaz_data.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 2. THE BLUEPRINT
# ==========================================
class DBUser(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String) # This will now hold the scrambled hash!
    full_name = Column(String, nullable=True)
    status = Column(String, default="PENDING_CLEARANCE") 
    
    exhibitions = Column(String, default="0")      
    club_affiliation = Column(String, default="N/A") 
    credits = Column(Integer, default=0)             

Base.metadata.create_all(bind=engine)

# ==========================================
# 3. API SETUP & VALIDATION
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class UserApprove(BaseModel):
    email: str

# ==========================================
# 4. THE SECURE ENDPOINTS
# ==========================================
@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    
    existing_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Sequence already registered in the collective.")
    
    # SECURITY UPGRADE: Scramble the password before saving
    hashed_password = get_password_hash(user.password)
    
    new_user = DBUser(
        email=user.email, 
        password=hashed_password, # Saving the hash, NOT the real password
        full_name=user.full_name,
        status="PARTICIPANT"
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "Registration successful", 
        "user": {"email": new_user.email, "status": new_user.status}
    }

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    
    # SECURITY UPGRADE: Verify the typed password against the saved hash
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return {
        "message": "Login successful", 
        "user": {
            "email": db_user.email, 
            "status": db_user.status,
            "exhibitions": db_user.exhibitions,
            "club": db_user.club_affiliation,
            "credits": db_user.credits
        }
    }

# ==========================================
# 5. ADMIN PROTOCOLS
# ==========================================
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    return [{"email": u.email, "status": u.status} for u in users]

@app.post("/admin/approve")
def approve_user(target: UserApprove, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Sequence not found")
        
    db_user.status = "ACTIVE_MEMBER"
    db.commit()
    return {"message": f"Clearance granted for {target.email}"}

@app.get("/godmode/{target_email}")
def activate_god_mode(target_email: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target_email).first()
    if not db_user:
        return {"error": "User sequence not found in the vault."}
        
    db_user.status = "ADMIN"
    db.commit()
    return {"message": f"GOD MODE ACTIVATED: {target_email} is now an ADMIN."}