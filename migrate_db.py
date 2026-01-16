import sqlite3
import os

db_path = "backend/data/face_access.db"

if not os.path.exists(db_path):
    print(f"Database not found at {db_path}")
    exit(1)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Check if pin column exists
    cursor.execute("PRAGMA table_info(users)")
    columns = [column[1] for column in cursor.fetchall()]
    
    if "pin" not in columns:
        print("Adding 'pin' column to 'users' table...")
        cursor.execute("ALTER TABLE users ADD COLUMN pin TEXT")
        conn.commit()
        print("Column added successfully.")
    else:
        print("'pin' column already exists.")

except Exception as e:
    print(f"Error during migration: {e}")
finally:
    conn.close()
