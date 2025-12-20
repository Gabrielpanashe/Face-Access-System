from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.core.face_utils import decode_image, get_face_embedding
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/enroll")
async def enroll_face(name: str = Form(...), image: str = Form(...), db: Session = Depends(get_db)):
    # 1. Decode image
    img = decode_image(image)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image data")

    # 2. Extract facial embeddings
    embedding = get_face_embedding(img)
    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected or could not extract embedding")

    # 3. Check if user already exists
    existing_user = db.query(models.User).filter(models.User.name == name).first()
    if existing_user:
        # Update existing user's embedding
        existing_user.face_embedding = embedding
        message = f"Biometric profile for {name} updated."
    else:
        # Create new user
        new_user = models.User(name=name, face_embedding=embedding)
        db.add(new_user)
        message = f"Biometric profile for {name} registered."
    
    try:
        db.commit()
    except Exception as e:
        db.rollback()
        logger.error(f"Database error: {e}")
        raise HTTPException(status_code=500, detail="Failed to save profile")
    
    return {
        "status": "success",
        "message": message
    }
