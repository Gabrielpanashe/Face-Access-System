from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api import enroll, verify
from fastapi.staticfiles import StaticFiles
import os

app.include_router(enroll.router, prefix="/api", tags=["Enrollment"])
app.include_router(verify.router, prefix="/api", tags=["Verification"])

from app.api import admin
app.include_router(admin.router, prefix="/api", tags=["Admin"])

# Ensure data directory exists
os.makedirs("data/faces", exist_ok=True)

# Mount static directory to serve face images
app.mount("/static", StaticFiles(directory="data"), name="static")

@app.get("/")
def read_root():
    return {"message": "Face Access System Backend is Running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}
