from fastapi import APIRouter, Form
import time

router = APIRouter()

@router.post("/enroll")
async def enroll_face(name: str = Form(...), image: str = Form(...)):
    # Placeholder for logic:
    # 1. Decode image
    # 2. Extract facial embeddings
    # 3. Save to database/local storage
    
    time.sleep(1) # Simulate processing
    
    return {
        "status": "success",
        "message": f"Biometric profile for {name} registered."
    }
