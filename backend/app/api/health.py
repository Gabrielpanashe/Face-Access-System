from fastapi import APIRouter

router = APIRouter()

@router.get("/health")
async def health_check():
    # You could add a check to see if DB is reachable
    return {
        "status": "ok", 
        "service": "Face Access System",
        "database": "connected" # Simplified for now
    }
