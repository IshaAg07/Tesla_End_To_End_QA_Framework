import os
import re
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

# --- DB setup ---
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, "db", "insurance.db")
os.makedirs(os.path.join(BASE_DIR, "db"), exist_ok=True)

app = Flask(__name__)
CORS(app)  # allow UI/tools to call this API locally

# --- Insurance Plans ---
PLANS = [
    {"plan": "Standard", "monthly": 79, "deductible": 1000, "coverage": "Liability + Collision"},
    {"plan": "Premium", "monthly": 109, "deductible": 500, "coverage": "Full coverage + Roadside"},
    {"plan": "Performance", "monthly": 139, "deductible": 250, "coverage": "Full + Glass + Rental"}
]

MODEL_BASE = {
    "Model 3": 80,
    "Model Y": 90,
    "Model S": 120,
    "Model X": 130,
    "Cybertruck": 150
}

# --- Premium Calculation ---
def calc_premium(model: str, zip_code: str) -> float:
    base = MODEL_BASE.get(model, 95)
    first_digit = int(str(zip_code)[0]) if str(zip_code) and str(zip_code)[0].isdigit() else 9
    factor = 1 + (first_digit / 50.0)  # 1.00–1.18
    return round(base * factor, 2)

# --- Save Quote to DB ---
def save_quote_to_db(name: str, email: str, model: str, zip_str: str, premium: float) -> None:
    conn = sqlite3.connect(DB_PATH)
    try:
        conn.execute(
            "INSERT INTO quotes (name, email, model, zip, premium) VALUES (?, ?, ?, ?, ?)",
            (name, email, model, zip_str, premium),
        )
        conn.commit()
    finally:
        conn.close()

# --- Endpoints ---
@app.get("/health")
def health():
    return {"status": "ok"}, 200

@app.get("/insurance-info")
def insurance_info():
    return {"plans": PLANS}, 200

@app.post("/get-quote")
def get_quote():
    data = request.get_json(silent=True) or {}
    required = ["name", "email", "model", "zip"]
    missing = [k for k in required if not data.get(k)]
    if missing:
        return {"status": "error", "message": f"Missing fields: {', '.join(missing)}"}, 400

    # super-light validation
    if not re.match(r"[^@]+@[^@]+\.[^@]+", data["email"]):
        return {"status": "error", "message": "Invalid email"}, 400

    zip_str = str(data["zip"])
    if not zip_str.isdigit() or len(zip_str) not in (5, 6):  # allow US(5) / India(6)
        return {"status": "error", "message": "Invalid zip"}, 400

    premium = calc_premium(data["model"], zip_str)

    # --- Save to DB (Step 2 integration) ---
    save_quote_to_db(data["name"], data["email"], data["model"], zip_str, premium)

    return {
        "status": "success",
        "quoteId": str(uuid.uuid4())[:8],
        "model": data["model"],
        "zip": zip_str,
        "monthlyPremium": premium,
        "message": f"Quote prepared for {data['name']}"
    }, 200

# --- Main entry ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
