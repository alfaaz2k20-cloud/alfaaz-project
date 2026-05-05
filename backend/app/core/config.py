import os
import sys
import secrets
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Environment Flag
ENV = os.environ.get("ENV", "development")

# Frontend
FRONTEND_URL = os.environ.get("FRONTEND_URL", "https://alfaazcollective.vercel.app").rstrip("/")
FRONTEND_ORIGINS = [
    origin.strip().rstrip("/")
    for origin in os.environ.get("FRONTEND_ORIGINS", FRONTEND_URL).split(",")
    if origin.strip()
]

# Database
DATABASE_URL = os.environ.get("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
SQLALCHEMY_DATABASE_URL = DATABASE_URL or "sqlite:///./alfaaz_data.db"

# JWT Security
_jwt_secret_raw = os.environ.get("JWT_SECRET")
if not _jwt_secret_raw:
    if ENV == "production":
        print("FATAL: JWT_SECRET must be set in production.", file=sys.stderr)
        sys.exit(1)
    else:
        _jwt_secret_raw = secrets.token_hex(32)
        print("[DEV WARNING] Using ephemeral JWT secret.", file=sys.stderr)

JWT_SECRET = _jwt_secret_raw
JWT_ALGORITHM = "HS256"
JWT_EXPIRY_HOURS = 24

# Admin Security
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")
if not ADMIN_PASSWORD:
    if ENV == "production":
        raise RuntimeError("CRITICAL: ADMIN_PASSWORD environment variable must be set in production.")
    else:
        ADMIN_PASSWORD = "AlfaazAdmin2026!" # Safe fallback only for local dev

# Cloudinary
CLOUDINARY_CLOUD_NAME = os.environ.get("CLOUDINARY_CLOUD_NAME", "dmqwjpmjk")
CLOUDINARY_API_KEY = os.environ.get("CLOUDINARY_API_KEY")
CLOUDINARY_API_SECRET = os.environ.get("CLOUDINARY_API_SECRET")

# Email
SMTP_SERVER = os.environ.get("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_EMAIL = os.environ.get("SMTP_EMAIL")
SMTP_PASSWORD = os.environ.get("SMTP_PASSWORD")

# AI & Others
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
PHANTOM_SECRET_TOKEN = os.environ.get("PHANTOM_SECRET_TOKEN")
