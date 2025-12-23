from fastapi import APIRouter, Form, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
from app.core.face_utils import decode_image, get_face_embedding, verify_face, extract_face, perform_liveness_check
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/verify")
async def verify_user(image: str = Form(...), db: Session = Depends(get_db)):
    # 1. Decode image
    img = decode_image(image)
    if img is None:
        raise HTTPException(status_code=400, detail="Invalid image data")

    # 1.5 Liveness Check
    face_img = extract_face(img)
    if face_img is not None:
        is_live, liveness_conf = perform_liveness_check(face_img)
        if not is_live:
            logger.warning(f"Spoof Attempt Detected! Liveness confidence: {liveness_conf}")
            return {
                "status": "denied",
                "identity": "Spoof Machine",
                "message": "NOT a REAL face",
                "access": False,
                "liveness_confidence": float(liveness_conf)
            }
    
    # 2. Extract embedding from probe image (FASTER)
    probe_embedding = get_face_embedding(face_img if face_img is not None else img)
    if probe_embedding is None:
        return {
            "status": "denied",
            "identity": "Unknown",
            "message": "Access denied, unregistered face",
            "access": False
        }

    # 3. Fetch all registered users
    users = db.query(models.User).all()
    if not users:
        return {
            "status": "denied",
            "identity": "Unknown",
            "message": "Access denied, unregistered face",
            "access": False
        }

    # 4. Compare embeddings
    registered_embeddings = [u.face_embedding for u in users]
    match_idx, distance = verify_face(probe_embedding, registered_embeddings)

    if match_idx is not None:
        matched_user = users[match_idx]
        confidence = 1.0 - distance
        
        # Log access
        access_log = models.AccessLog(
            user_id=matched_user.id,
            status="granted",
            match_confidence=int(confidence * 100)
        )
        db.add(access_log)
        db.commit()

        return {
            "status": "success",
            "identity": matched_user.name,
            "match_confidence": float(confidence),
            "access": True
        }
    else:
        # Log denied access
        return {
            "status": "denied",
            "identity": "Unknown",
            "message": "Access denied, unregistered face",
            "match_confidence": (1.0 - distance),
            "access": False
        }
