import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Face Access System"
    API_V1_STR: str = "/api"
    
    # AI Model Settings
    LIVENESS_MODEL_PATH: str = "app/models/liveness/model.pth"
    FACE_RECOGNITION_MODEL: str = "hog" # or "cnn"
    
    # Storage
    DATASET_PATH: str = "ml/liveness/dataset"
    ENROLLMENT_DB_PATH: str = "app/database/face_db"
    
    class Config:
        env_file = ".env"

settings = Settings()
