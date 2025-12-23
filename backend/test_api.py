import requests
import base64
import os

# Configuration
# Note: backend exposes `/` and `/health` (not under `/api`). Use root URL below.
API_URL = "http://127.0.0.1:8000"
TEST_NAME = "Test_User"

def test_health():
    print("Testing Health Endpoint...")
    try:
        response = requests.get(f"{API_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Connection failed: {e}")

def simulate_enrollment():
    print("\nTesting Enrollment...")
    # This is a sample base64 string (a tiny gray pixel)
    # real tests would require a proper face image
    dummy_image = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAABAAEBAREA/8QAFAABAAAAAAAAAAAAAAAAAAAAAP/EABQQAQAAAAAAAAAAAAAAAAAAAAD/2gAIAQEAAD8AP//Z"
    
    data = {
        "name": TEST_NAME,
        "image": dummy_image
    }
    
    try:
        response = requests.post(f"{API_URL}/enroll", data=data)
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    print("NB: Ensure the server is running (uvicorn app.main:app --reload) before running this test.")
    test_health()
    # Note: Enrollment/Verification will fail if the dummy image doesn't contain a face
    # because DeepFace enforces detection.
    # simulate_enrollment()
