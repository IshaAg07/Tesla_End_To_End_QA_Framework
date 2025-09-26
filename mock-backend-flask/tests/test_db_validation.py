import os, sqlite3

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "db", "insurance.db")
DB_PATH = os.path.abspath(DB_PATH)

def test_quote_row_exists():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    row = conn.execute(
        "SELECT name, email, model, zip, premium FROM quotes WHERE email=? ORDER BY id DESC LIMIT 1",
        ("isha@example.com",)
    ).fetchone()
    conn.close()

    assert row is not None
    assert row["name"] == "IshaAgrawal"
    assert row["model"] == "Model Y"
    assert isinstance(row["premium"], (int, float))
