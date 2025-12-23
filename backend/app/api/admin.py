from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db import models
import logging
import os

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    """Fetch all registered users."""
    users = db.query(models.User).all()
    
    # Transform to include image URL
    # Assuming we serve 'data/faces' at '/static/faces'
    user_list = []
    for u in users:
        safe_name = "".join([c for c in u.name if c.isalnum() or c in (' ', '-', '_')]).strip()
        user_list.append({
            "id": u.id,
            "name": u.name,
            "created_at": u.created_at,
            "image_url": f"/static/faces/{safe_name}.jpg"
        })
        
    return user_list

@router.delete("/users/{name}")
def delete_user(name: str, db: Session = Depends(get_db)):
    """Delete a user and their face data."""
    user = db.query(models.User).filter(models.User.name == name).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # 1. Remove image from disk
    try:
        faces_dir = "data/faces"
        safe_name = "".join([c for c in name if c.isalnum() or c in (' ', '-', '_')]).strip()
        file_path = os.path.join(faces_dir, f"{safe_name}.jpg")
        if os.path.exists(file_path):
            os.remove(file_path)
    except Exception as e:
        logger.error(f"Failed to delete image for {name}: {e}")
        
    # 2. Remove from DB
    try:
        db.delete(user)
        db.commit()
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete user from database")

    return {"status": "success", "message": f"User {name} deleted"}
