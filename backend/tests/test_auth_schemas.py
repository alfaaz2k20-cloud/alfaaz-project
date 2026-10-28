import pytest
from app.schemas.auth import UserRegister, UserLogin, ForgotPassword, ResetPassword

def test_user_register_normalizes_email():
    u = UserRegister(email="  TEST@Example.COM  ", password="StrongPassword123")
    assert u.email == "test@example.com"

def test_user_register_rejects_short_password():
    with pytest.raises(ValueError, match="Password must be at least 8 characters"):
        UserRegister(email="user@example.com", password="abc")

def test_user_register_rejects_numeric_password():
    with pytest.raises(ValueError, match="Password cannot be all numbers"):
        UserRegister(email="user@example.com", password="123456789")

def test_user_login_normalizes_email():
    login = UserLogin(email="  ALICE@DOMain.org  ", password="mypassword")
    assert login.email == "alice@domain.org"

def test_forgot_password_normalizes_email():
    fp = ForgotPassword(email="  Bob@Test.Co  ")
    assert fp.email == "bob@test.co"

def test_reset_password_validates_new_password():
    # Valid
    rp = ResetPassword(token="sample-token", new_password="NewSecurePassword123")
    assert rp.new_password == "NewSecurePassword123"

    # Too short
    with pytest.raises(ValueError, match="Password must be at least 8 characters"):
        ResetPassword(token="sample-token", new_password="short")

    # All numbers
    with pytest.raises(ValueError, match="Password cannot be all numbers"):
        ResetPassword(token="sample-token", new_password="1234567890")
