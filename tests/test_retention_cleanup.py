import unittest
import sys
from pathlib import Path
from fastapi.testclient import TestClient

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))
from app.main import app

class RetentionArchitectureTests(unittest.TestCase):
    def test_no_deletion_endpoints(self):
        client = TestClient(app)
        # Check that there are no routes with 'delete' in the path or method
        for route in app.routes:
            self.assertNotIn("delete", getattr(route, 'path', '').lower())
            if hasattr(route, 'methods'):
                self.assertNotIn("DELETE", route.methods)

    def test_no_retention_cleanup_module_exists(self):
        # We physically removed retention_cleanup.py to ensure it cannot be imported or run
        backend_dir = Path(__file__).resolve().parents[1] / "backend"
        job_file = backend_dir / "app" / "jobs" / "retention_cleanup.py"
        self.assertFalse(job_file.exists(), "retention_cleanup.py must not exist in the codebase.")

    def test_no_scheduler_registered(self):
        # The main app should not have background tasks for deletion
        # Check main.py content
        main_py = (Path(__file__).resolve().parents[1] / "backend" / "app" / "main.py").read_text()
        self.assertNotIn("cleanup_expired_sessions", main_py)
        self.assertNotIn("BackgroundTasks", main_py)
        
    def test_permanent_retention_config(self):
        import json
        brand_cfg = Path(__file__).resolve().parents[1] / "config" / "brand.json"
        if brand_cfg.exists():
            cfg = json.loads(brand_cfg.read_text())
            self.assertNotIn("data_retention_days", cfg)
            
        privacy_cfg = Path(__file__).resolve().parents[1] / "config" / "copy" / "privacy.json"
        if privacy_cfg.exists():
            cfg = json.loads(privacy_cfg.read_text())
            self.assertNotIn("deletion_request_contact", cfg)
            
    def test_no_ttl_fields_in_models(self):
        models_py = (Path(__file__).resolve().parents[1] / "backend" / "app" / "models" / "recruit.py").read_text()
        self.assertNotIn("expires_at", models_py)
        self.assertNotIn("ttl", models_py.lower())
