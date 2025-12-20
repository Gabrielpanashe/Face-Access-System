from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import health, verify, enroll, logs
from app.db import models
from app.db.database import engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Face Access System API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(verify.router, prefix="/api", tags=["Access"])
app.include_router(enroll.router, prefix="/api", tags=["Enroll"])
app.include_router(logs.router, prefix="/api", tags=["Logs"])

@app.get("/")
async def root():
    return {"message": "Neural Biometric Gateway Active"}
