import base64
import cv2
import numpy as np
from deepface import DeepFace
import os
from .liveness_utils import check_liveness as perform_liveness_check

# Global cache for Haar Cascade to prevent redundant Disk I/O
_face_cascade = None

def get_face_cascade():
    global _face_cascade
    if _face_cascade is None:
        _face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    return _face_cascade

def apply_clahe(image):
    """Applies Contrast Limited Adaptive Histogram Equalization to enhance low-light images."""
    try:
        if image is None: return None
        # Convert to LAB color space
        lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        l, a, b = cv2.split(lab)
        
        # Apply CLAHE to L-channel
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        cl = clahe.apply(l)
        
        # Merge channels and convert back to BGR
        limg = cv2.merge((cl, a, b))
        enhanced_img = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
        return enhanced_img
    except Exception as e:
        print(f"Error applying CLAHE: {e}")
        return image

def decode_image(base64_string: str):
    """Decodes a base64 string into an OpenCV image."""
    try:
        # Remove header if present
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]
        
        encoded_data = base64.b64decode(base64_string)
        nparr = np.frombuffer(encoded_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print(f"Error decoding image: {e}")
        return None

def extract_face(image):
    """Detects and crops the face from an image. Optimized for speed and low light."""
    try:
        if image is None: return None
        
        # 1. Enhance a COPY for better detection in low light
        detect_img = apply_clahe(image.copy())
        
        # Performance optimization: Downscale detection image
        height, width = detect_img.shape[:2]
        max_dim = 640
        scale = 1.0
        if max(height, width) > max_dim:
            scale = max_dim / max(height, width)
            small_detect_img = cv2.resize(detect_img, (int(width * scale), int(height * scale)))
        else:
            small_detect_img = detect_img

        # Use cached Haar Cascade on the enhanced smaller image
        face_cascade = get_face_cascade()
        gray = cv2.cvtColor(small_detect_img, cv2.COLOR_BGR2GRAY)
        
        # Detect on the smaller image
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        if len(faces) == 0:
            return None
            
        # Pick the largest face and rescale coordinates back to original image
        x, y, w, h = max(faces, key=lambda f: f[2] * f[3])
        x, y, w, h = int(x / scale), int(y / scale), int(w / scale), int(h / scale)
        
        # Add padding
        padding_w = int(0.2 * w)
        padding_h = int(0.2 * h)
        y1 = max(0, y - padding_h)
        y2 = min(image.shape[0], y + h + padding_h)
        x1 = max(0, x - padding_w)
        x2 = min(image.shape[1], x + w + padding_w)
        
        # Crop from the ORIGINAL unenhanced image for Liveness/Recognition
        return image[y1:y2, x1:x2]
    except Exception as e:
        print(f"Error extracting face: {e}")
        return None

def get_face_embedding(image, model_name="Facenet"):
    """
    Extracts face embedding using DeepFace.
    """
    try:
        # Note: We rely on DeepFace's internal preprocessing
        # Using 'mediapipe' which is robust for varied lighting
        embeddings = DeepFace.represent(
            img_path=image, 
            model_name=model_name, 
            enforce_detection=False,
            detector_backend='mediapipe'
        )
        if embeddings:
            return embeddings[0]["embedding"]
        return None
    except Exception as e:
        print(f"Error extracting embedding: {e}")
        return None

def preload_models():
    """Pre-loads DeepFace models and Liveness model into memory."""
    try:
        print("Pre-loading models for faster first-response...")
        # Pre-load Facenet
        DeepFace.build_model("Facenet")
        # Trigger liveness model load
        from .liveness_utils import get_liveness_model
        get_liveness_model()
        print("Models successfully cached in memory.")
    except Exception as e:
        print(f"Error pre-loading models: {e}")

def verify_face(probe_embedding, registered_embeddings, threshold=0.4):
    """
    Compares a probe embedding against a list of registered embeddings.
    Returns the index of the best match if it's below the threshold, otherwise None.
    """
    if not registered_embeddings:
        return None, 1.0

    probe_embedding = np.array(probe_embedding)
    best_dist = 1.0
    best_idx = -1

    for i, reg_emb in enumerate(registered_embeddings):
        reg_emb = np.array(reg_emb)
        # Cosine distance
        dist = 1 - (np.dot(probe_embedding, reg_emb) / (np.linalg.norm(probe_embedding) * np.linalg.norm(reg_emb)))
        if dist < best_dist:
            best_dist = dist
            best_idx = i

    if best_dist < threshold:
        return best_idx, float(best_dist)
    return None, float(best_dist)
