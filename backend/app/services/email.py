import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from app.core.config import SMTP_SERVER, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD

def send_system_email(to_email: str, subject: str, body: str, raise_on_error: bool = False):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        print(f"[EMAIL SKIPPED] To: {to_email} | Subject: {subject}")
        return
    try:
        msg = MIMEMultipart()
        msg['From'] = SMTP_EMAIL
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain'))
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_EMAIL, SMTP_PASSWORD)
        server.send_message(msg)
        server.quit()
    except Exception as e:
        print(f"[SMTP ERROR] {e}")
        if raise_on_error:
            raise HTTPException(status_code=503, detail="Email transmission failed.")