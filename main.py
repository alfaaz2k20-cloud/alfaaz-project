from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# ==========================================
# 1. THE VAULT (Database Setup)
# ==========================================
# This creates a file named 'alfaaz_data.db' in your folder
SQLALCHEMY_DATABASE_URL = "sqlite:///./alfaaz_data.db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# ==========================================
# 2. THE BLUEPRINT (Database Tables)
# ==========================================
# ==========================================
# 2. THE BLUEPRINT (Database Tables)
# ==========================================
class DBUser(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String) # Note: Still plain text for testing. We will lock this down later!
    full_name = Column(String, nullable=True)
    status = Column(String, default="PENDING_CLEARANCE") # Everyone starts here
    
    # NEW: Terminal Data Columns
    exhibitions = Column(String, default="0")        # Track number of exhibitions
    club_affiliation = Column(String, default="N/A") # Track their specific club
    credits = Column(Integer, default=0)             # Track collective credits

# This line actually builds the table inside the file
Base.metadata.create_all(bind=engine)

# ==========================================
# 3. API SETUP & VALIDATION
# ==========================================
app = FastAPI(title="Alfaaz Collective API")

# Tell the API to accept requests from our HTML file
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This means "allow any website to talk to us" (we'll lock this down later)
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# A little helper function to open and close the vault door safely
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# These make sure the data coming from the website is formatted correctly
class UserRegister(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

# NEW: The blueprint for Admin approvals
class UserApprove(BaseModel):
    email: str

# ==========================================
# 4. THE ENDPOINTS
# ==========================================
@app.post("/auth/register", status_code=status.HTTP_201_CREATED)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    
    # 1. Check if email already exists in the database
    existing_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Sequence already registered in the collective.")
    
    # 2. Create the new user identity
    new_user = DBUser(
        email=user.email, 
        password=user.password, 
        full_name=user.full_name,
        status="PENDING_CLEARANCE"
    )
    
    # 3. Save them to the Vault
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # 4. Return the exact same success package as login
    return {
        "message": "Registration successful", 
        "user": {"email": new_user.email, "status": new_user.status}
    }

@app.post("/auth/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    
    # 1. Search the database for the email
    db_user = db.query(DBUser).filter(DBUser.email == user.email).first()
    
    # 2. Check if user exists and password matches
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
   # 3. Return success (Now with extra data)
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

# Fetch all users
@app.get("/admin/users")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(DBUser).all()
    # Return safe data only (no passwords)
    return [{"email": u.email, "status": u.status} for u in users]

# Approve a user
@app.post("/admin/approve")
def approve_user(target: UserApprove, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target.email).first()
    
    if not db_user:
        raise HTTPException(status_code=404, detail="Sequence not found")
        
    db_user.status = "ACTIVE_MEMBER"
    db.commit()
    
    return {"message": f"Clearance granted for {target.email}"}

# God Mode (Temporary backdoor to promote yourself)
@app.get("/godmode/{target_email}")
def activate_god_mode(target_email: str, db: Session = Depends(get_db)):
    db_user = db.query(DBUser).filter(DBUser.email == target_email).first()
    
    if not db_user:
        return {"error": "User sequence not found in the vault."}
        
    db_user.status = "ADMIN"
    db.commit()
    return {"message": f"GOD MODE ACTIVATED: {target_email} is now an ADMIN."}