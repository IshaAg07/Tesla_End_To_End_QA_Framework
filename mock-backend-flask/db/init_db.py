import os, sqlite3

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(__file__))  # .../mock-backend-flask
DB_DIR = os.path.join(BASE_DIR, "db")
os.makedirs(DB_DIR, exist_ok=True)
DB_PATH = os.path.join(DB_DIR, "insurance.db")

# Create table
conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()
cur.execute("""
CREATE TABLE IF NOT EXISTS quotes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  model TEXT NOT NULL,
  zip TEXT NOT NULL,
  premium REAL NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
""")
conn.commit()
conn.close()
print(f"✅ Initialized DB at {DB_PATH}")
