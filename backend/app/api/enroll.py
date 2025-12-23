from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.core.face_utils import decode_image, get_face_embedding, extract_face, perform_liveness_check
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/enroll")
async def enroll_face(name: str = Form(...), image: str = Form(...), db: Session = Depends(get_db)):
    # 1. Decode image
    img = decode_image(image)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image data")

    # 1.5 Liveness Check
    face_img = extract_face(img)
    if face_img is not None:
        is_live, confidence = perform_liveness_check(face_img)
        if not is_live:
            logger.warning(f"Liveness Check Failed during enrollment for {name}. Confidence: {confidence}")
            raise HTTPException(status_code=403, detail="NOT a REAL face")
    
    # 2. Extract facial embeddings using the already-extracted face (FASTER)
    embedding = get_face_embedding(face_img if face_img is not None else img)
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
    
    # SAVE FACE IMAGE FOR ADMIN VERIFICATION
    import cv2
    import os
    try:
        faces_dir = "data/faces"
        if not os.path.exists(faces_dir):
            os.makedirs(faces_dir)
        
        # Determine which image to save (cropped face preferred)
        save_img = face_img if face_img is not None else img
        
        # Ensure name is safe for filesystem
        safe_name = "".join([c for c in name if c.isalnum() or c in (' ', '-', '_')]).strip()
        file_path = os.path.join(faces_dir, f"{safe_name}.jpg")
        
        cv2.imwrite(file_path, save_img)
    except Exception as e:
        logger.error(f"Failed to save reference image: {e}")
        # Don't fail the whole request just for the image

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
