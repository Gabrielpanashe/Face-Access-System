# Helper script to install dependencies and run the backend server (PowerShell)
# Usage: Open PowerShell in the `backend` folder and run: .\run_backend.ps1

python -m pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
