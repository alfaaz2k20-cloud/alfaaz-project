import unittest
import json
import hashlib
from pathlib import Path

class SJTImmutabilityTests(unittest.TestCase):
    def test_sjt_immutability(self):
        sjt_path = Path(__file__).resolve().parents[1] / "config" / "sjt_items.json"
        content = sjt_path.read_bytes()
        h = hashlib.sha256(content).hexdigest()
        self.assertEqual(h, "c098b401d37cc30b515139d307fef632047c048584e19771c0e014ef027e391d")
        
        data = json.loads(content)
        scenarios = data.get("scenarios", [])
        self.assertEqual(len(scenarios), 7)
        
        for sc in scenarios:
            opts = sc.get("options", [])
            self.assertEqual(len(opts), 4)
            for o in opts:
                self.assertIn("id", o)
                self.assertIn("text", o)
                self.assertIn("keys", o)
