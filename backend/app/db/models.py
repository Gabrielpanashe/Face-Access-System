from sqlalchemy import Column, Integer, String, DateTime, JSON
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    # Store face embeddings as a list of floats (JSON serialized)
    # This follows the requirement: "stores numerical face embeddings rather than real faces"
    face_embedding = Column(JSON, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class AccessLog(Base):
    __tablename__ = "access_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    status = Column(String) # e.g., "granted", "denied"
    liveness_score = Column(Integer) # Percentage
    match_confidence = Column(Integer) # Percentage
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
