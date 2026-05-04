import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from app.core.config import SMTP_SERVER, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD

def send_system_email(to_email: str, subject: str, body: str, raise_on_error: bool = False) -> bool:
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        missing = []
        if not SMTP_EMAIL:
            missing.append("SMTP_EMAIL")
        if not SMTP_PASSWORD:
            missing.append("SMTP_PASSWORD")
        print(f"[EMAIL SKIPPED] Missing {', '.join(missing)} | To: {to_email} | Subject: {subject}")
        if raise_on_error:
            raise HTTPException(status_code=503, detail=f"Email is not configured. Missing: {', '.join(missing)}")
        return False
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=20) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
        print(f"[EMAIL SENT] To: {to_email} | Subject: {subject}")
        return True
    except Exception as e:
        print(f"[SMTP ERROR] {e}")
        if raise_on_error:
            raise HTTPException(status_code=503, detail="Email transmission failed.")
        return False
