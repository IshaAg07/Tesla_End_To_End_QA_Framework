import os
import requests

# Allow overriding in CI: BASE_URL=http://127.0.0.1:5050 pytest -q
BASE = os.getenv("BASE_URL", "http://127.0.0.1:5050")

def test_get_quote_success():
    """POST /get-quote returns success for valid input."""
    payload = {
        "name": "Isha",
        "email": "isha@example.com",
        "model": "Model Y",
        "zip": "94016",
    }
    r = requests.post(f"{BASE}/get-quote", json=payload, timeout=5)
    assert r.status_code == 200
    body = r.json()
    assert body["status"] == "success"
    assert body["model"] == "Model Y"
    assert isinstance(body["monthlyPremium"], (int, float))
    assert "quoteId" in body and body["quoteId"]
