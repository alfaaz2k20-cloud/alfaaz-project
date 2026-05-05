import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import HTTPException
from app.core.config import EMAIL_FROM, EMAIL_PROVIDER, RESEND_API_KEY, SMTP_SERVER, SMTP_PORT, SMTP_EMAIL, SMTP_PASSWORD

def _selected_provider() -> str:
    if EMAIL_PROVIDER == "auto":
        return "smtp" if SMTP_EMAIL and SMTP_PASSWORD else "resend"
    return EMAIL_PROVIDER

def send_system_email(
    to_email: str,
    subject: str,
    body: str,
    raise_on_error: bool = False,
    expose_error: bool = False,
) -> bool:
    provider = _selected_provider()

    if provider == "resend":
        if not RESEND_API_KEY:
            print(f"[EMAIL SKIPPED] Missing RESEND_API_KEY | To: {to_email} | Subject: {subject}")
            if raise_on_error:
                raise HTTPException(status_code=503, detail="Email provider is not configured. Missing: RESEND_API_KEY")
            return False
        if not EMAIL_FROM:
            print(f"[EMAIL SKIPPED] Missing EMAIL_FROM | To: {to_email} | Subject: {subject}")
            if raise_on_error:
                raise HTTPException(status_code=503, detail="Email sender is not configured. Missing: EMAIL_FROM")
            return False
        try:
            response = requests.post(
                "https://api.resend.com/emails",
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "from": EMAIL_FROM,
                    "to": [to_email],
                    "subject": subject,
                    "text": body,
                },
                timeout=20,
            )
            if response.status_code >= 400:
                provider_detail = response.text[:500]
                print(f"[RESEND ERROR] {response.status_code} {provider_detail}")
                if raise_on_error:
                    raise HTTPException(
                        status_code=503,
                        detail=f"Email provider rejected the message: {provider_detail}" if expose_error else "Email provider rejected the message.",
                    )
                return False
            print(f"[EMAIL SENT] Provider: Resend | To: {to_email} | Subject: {subject}")
            return True
        except HTTPException:
            raise
        except Exception as e:
            print(f"[RESEND ERROR] {e}")
            if raise_on_error:
                raise HTTPException(status_code=503, detail=f"Email transmission failed: {e}" if expose_error else "Email transmission failed.")
            return False

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
            raise HTTPException(status_code=503, detail=f"Email transmission failed: {e}" if expose_error else "Email transmission failed.")
        return False
