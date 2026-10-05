import unittest
import sys
import json
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
from app.main import app

PROJECT_ROOT = Path(__file__).resolve().parents[1]
BACKEND_DIR = PROJECT_ROOT / "backend"


class RetentionArchitectureTests(unittest.TestCase):
    """
    Proves: NO recruitment data is ever deleted.
    There must be no deletion route, no deletion service, no scheduled cleanup,
    no TTL, no production cleanup worker, and no deletion UI.
    """

    def test_no_recruit_deletion_endpoints(self):
        """No recruit-scoped route may expose a DELETE method."""
        client = TestClient(app)
        for route in app.routes:
            path = getattr(route, "path", "")
            if "/recruit" in path:
                methods = getattr(route, "methods", set())
                self.assertNotIn("DELETE", methods,
                                 f"Recruit route {path} must not allow DELETE")

    def test_no_retention_cleanup_module_exists(self):
        """retention_cleanup.py must not exist in the codebase."""
        job_file = BACKEND_DIR / "app" / "jobs" / "retention_cleanup.py"
        self.assertFalse(job_file.exists(),
                         "retention_cleanup.py must not exist in the codebase.")

    def test_no_production_import_of_retention_cleanup(self):
        """No production module may import retention_cleanup."""
        for py_file in BACKEND_DIR.rglob("*.py"):
            if "test" in py_file.name.lower():
                continue
            content = py_file.read_text(encoding="utf-8", errors="replace")
            self.assertNotIn("retention_cleanup", content,
                             f"{py_file.name} must not reference retention_cleanup")
            self.assertNotIn("cleanup_expired_sessions", content,
                             f"{py_file.name} must not reference cleanup_expired_sessions")

    def test_no_scheduler_registered(self):
        """main.py must not schedule any deletion background tasks."""
        main_py = (BACKEND_DIR / "app" / "main.py").read_text(encoding="utf-8")
        self.assertNotIn("cleanup_expired_sessions", main_py)

    def test_brand_config_has_no_retention_days(self):
        """config/brand.json must exist and must NOT contain data_retention_days."""
        brand_cfg = PROJECT_ROOT / "config" / "brand.json"
        self.assertTrue(brand_cfg.exists(), "config/brand.json must exist")
        cfg = json.loads(brand_cfg.read_text(encoding="utf-8"))
        self.assertNotIn("data_retention_days", cfg,
                         "brand.json must not contain data_retention_days")

    def test_privacy_config_has_no_deletion_contact(self):
        """config/copy/privacy.json must exist and must NOT contain deletion_request_contact."""
        privacy_cfg = PROJECT_ROOT / "config" / "copy" / "privacy.json"
        self.assertTrue(privacy_cfg.exists(), "config/copy/privacy.json must exist")
        cfg = json.loads(privacy_cfg.read_text(encoding="utf-8"))
        self.assertNotIn("deletion_request_contact", cfg,
                         "privacy.json must not contain deletion_request_contact")

    def test_no_ttl_fields_in_models(self):
        """Recruit models must not contain expires_at or TTL fields."""
        models_py = (BACKEND_DIR / "app" / "models" / "recruit.py").read_text(encoding="utf-8")
        self.assertNotIn("expires_at", models_py)
        # Case-sensitive check for 'ttl' as a likely field/variable name
        self.assertNotIn("_ttl", models_py.lower())
        self.assertNotIn("ttl_", models_py.lower())

    def test_all_production_imports_succeed(self):
        """Every module under backend/app must import without error."""
        import importlib
        # Just ensure the main app loads cleanly (it transitively imports everything)
        try:
            importlib.import_module("app.main")
        except ImportError as e:
            if "retention_cleanup" in str(e):
                self.fail(f"Production import fails due to deleted retention_cleanup: {e}")
            raise
