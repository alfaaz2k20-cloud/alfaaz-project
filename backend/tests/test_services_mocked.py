import os
import pytest
import httpx
from unittest.mock import patch, MagicMock
from fastapi import HTTPException

from app.services.email import send_system_email
from app.services.curator import (
    ask_curator_ai,
    _offline_curator_response,
    GEMINI_MODEL,
    GROQ_MODEL,
)

# ==============================================================================
# EMAIL SERVICE TESTS (Mocked & Fault Tolerant)
# ==============================================================================

def test_email_service_without_webhook_configured():
    with patch("app.services.email.MAKE_WEBHOOK_URL", ""):
        # Default behavior: returns False gracefully
        assert send_system_email("user@example.com", "Subject", "Body") is False

        # If raise_on_error=True: raises 503
        with pytest.raises(HTTPException) as exc_info:
            send_system_email("user@example.com", "Subject", "Body", raise_on_error=True)
        assert exc_info.value.status_code == 503

def test_email_service_successful_delivery():
    with patch("app.services.email.MAKE_WEBHOOK_URL", "https://hook.make.com/mock-webhook"):
        mock_response = MagicMock()
        mock_response.status_code = 200

        with patch("requests.post", return_value=mock_response) as mock_post:
            result = send_system_email("artist@alfaaz.test", "Application Received", "Thank you for applying.")
            assert result is True
            mock_post.assert_called_once()
            call_kwargs = mock_post.call_args[1]
            assert call_kwargs["json"] == {
                "to": "artist@alfaaz.test",
                "subject": "Application Received",
                "text": "Thank you for applying."
            }

def test_email_service_webhook_error_and_timeout():
    with patch("app.services.email.MAKE_WEBHOOK_URL", "https://hook.make.com/mock-webhook"):
        # 500 Error
        mock_err_response = MagicMock()
        mock_err_response.status_code = 500
        mock_err_response.text = "Internal Server Error"
        with patch("requests.post", return_value=mock_err_response):
            assert send_system_email("artist@alfaaz.test", "Subject", "Body") is False

            with pytest.raises(HTTPException) as exc_info:
                send_system_email("artist@alfaaz.test", "Subject", "Body", raise_on_error=True)
            assert exc_info.value.status_code == 503

        # Network Exception / Timeout
        with patch("requests.post", side_effect=Exception("Connection timed out")):
            assert send_system_email("artist@alfaaz.test", "Subject", "Body") is False

            with pytest.raises(HTTPException) as exc_info:
                send_system_email("artist@alfaaz.test", "Subject", "Body", raise_on_error=True)
            assert exc_info.value.status_code == 503


# ==============================================================================
# CURATOR AI TESTS (Mocked & 3-Tier Cascade Verification)
# ==============================================================================

def test_curator_model_configuration():
    assert GEMINI_MODEL in {"gemini-1.5-flash", "gemini-2.0-flash", "gemini-3.5-flash-lite"}
    assert GROQ_MODEL == "llama-3.1-8b-instant"

def test_curator_offline_grounded_response():
    resp_kaamil = _offline_curator_response("Tell me about the Kaamil exhibition")
    assert "Kaamil" in resp_kaamil
    assert "exhibition" in resp_kaamil.lower() or "showcase" in resp_kaamil.lower()

    resp_club = _offline_curator_response("What clubs or circles do you have?")
    assert "circles" in resp_club or "Film" in resp_club

    resp_general = _offline_curator_response("Hello, what is Alfaaz?")
    assert "Alfaaz Collective" in resp_general

def test_curator_missing_credentials_fallback_to_offline():
    with patch("app.services.curator.get_gemini_api_key", return_value=None), \
         patch("app.services.curator.get_groq_client", return_value=None):
        reply = ask_curator_ai("Tell me about exhibitions")
        assert "Kaamil" in reply or "Alfaaz" in reply

def test_curator_gemini_success_mocked():
    mock_res = MagicMock()
    mock_res.status_code = 200
    mock_res.json.return_value = {
        "candidates": [
            {
                "content": {
                    "parts": [{"text": "The exhibition Kaamil was a landmark winter showcase in Srinagar."}]
                }
            }
        ]
    }

    mock_client_instance = MagicMock()
    mock_client_instance.post.return_value = mock_res
    mock_client_class = MagicMock()
    mock_client_class.return_value.__enter__.return_value = mock_client_instance

    with patch("app.services.curator.get_gemini_api_key", return_value="mock-gemini-key"), \
         patch("httpx.Client", mock_client_class):
        reply = ask_curator_ai("Tell me about Kaamil")
        assert reply == "The exhibition Kaamil was a landmark winter showcase in Srinagar."

        # Verify the endpoint targeted the configured model
        called_url = mock_client_instance.post.call_args[0][0]
        assert "gemini-1.5-flash" in called_url or "models/" in called_url

def test_curator_gemini_fail_fallback_to_groq_mocked():
    # Gemini throws exception (or returns 500)
    mock_client_class = MagicMock()
    mock_client_class.return_value.__enter__.side_effect = Exception("Gemini rate limit exceeded")

    mock_groq = MagicMock()
    mock_choice = MagicMock()
    mock_choice.message.content = "Groq responded with Kaamil historical details."
    mock_groq.chat.completions.create.return_value = MagicMock(choices=[mock_choice])

    with patch("app.services.curator.get_gemini_api_key", return_value="mock-gemini-key"), \
         patch("httpx.Client", mock_client_class), \
         patch("app.services.curator.get_groq_client", return_value=mock_groq):
        reply = ask_curator_ai("Tell me about Kaamil")
        assert reply == "Groq responded with Kaamil historical details."
        mock_groq.chat.completions.create.assert_called_once()

def test_curator_gemini_and_groq_fail_fallback_to_offline():
    # Gemini fails
    mock_client_class = MagicMock()
    mock_client_class.return_value.__enter__.side_effect = Exception("Gemini down")

    # Groq fails
    mock_groq = MagicMock()
    mock_groq.chat.completions.create.side_effect = Exception("Groq rate limit 429")

    with patch("app.services.curator.get_gemini_api_key", return_value="mock-gemini-key"), \
         patch("httpx.Client", mock_client_class), \
         patch("app.services.curator.get_groq_client", return_value=mock_groq):
        reply = ask_curator_ai("Tell me about clubs")
        assert "circles" in reply or "Film" in reply

def test_curator_gemini_timeout_fallback():
    mock_client_class = MagicMock()
    mock_client_class.return_value.__enter__.side_effect = httpx.TimeoutException("Read timeout after 25.0s")

    with patch("app.services.curator.get_gemini_api_key", return_value="mock-gemini-key"), \
         patch("app.services.curator.get_groq_client", return_value=None), \
         patch("httpx.Client", mock_client_class):
        reply = ask_curator_ai("Who are you?")
        assert "Alfaaz Collective" in reply

def test_curator_gemini_malformed_response_fallback():
    mock_res = MagicMock()
    mock_res.status_code = 200
    mock_res.json.return_value = {"candidates": []}

    mock_client_instance = MagicMock()
    mock_client_instance.post.return_value = mock_res
    mock_client_class = MagicMock()
    mock_client_class.return_value.__enter__.return_value = mock_client_instance

    with patch("app.services.curator.get_gemini_api_key", return_value="mock-gemini-key"), \
         patch("app.services.curator.get_groq_client", return_value=None), \
         patch("httpx.Client", mock_client_class):
        reply = ask_curator_ai("Who are you?")
        assert "Alfaaz Collective" in reply

def test_curator_live_api_distinction():
    """
    Distinguishes mocked verification from live API execution.
    If GEMINI_API_KEY is not set in the live environment, skips network call.
    """
    live_key = os.environ.get("GEMINI_API_KEY")
    if not live_key:
        pytest.skip("Live GEMINI_API_KEY not configured in environment; verified via mocked test suite.")

    reply = ask_curator_ai("What is the mission of Alfaaz Collective?")
    assert isinstance(reply, str)
    assert len(reply) > 10
