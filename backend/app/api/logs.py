from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models

router = APIRouter()

@router.get("/logs")
async def get_access_logs(db: Session = Depends(get_db)):
    logs = db.query(models.AccessLog).order_by(models.AccessLog.timestamp.desc()).limit(50).all()
    # Join with users to get names
    result = []
    for log in logs:
        user = db.query(models.User).filter(models.User.id == log.user_id).first()
        result.append({
            "id": log.id,
            "user_name": user.name if user else "Unknown",
            "status": log.status,
            "match_confidence": log.match_confidence,
            "timestamp": log.timestamp
        })
    return result
