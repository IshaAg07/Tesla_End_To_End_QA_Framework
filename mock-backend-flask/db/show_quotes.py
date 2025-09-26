import os, sqlite3

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DB_PATH = os.path.join(BASE_DIR, "db", "insurance.db")

conn = sqlite3.connect(DB_PATH)
conn.row_factory = sqlite3.Row
rows = conn.execute("""
  SELECT id, name, email, model, zip, premium, created_at
  FROM quotes
  ORDER BY id DESC
  LIMIT 10
""").fetchall()
for r in rows:
    print(dict(r))
conn.close()
