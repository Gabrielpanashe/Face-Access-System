import base64
import cv2
import numpy as np
from deepface import DeepFace
import os

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

def get_face_embedding(image):
    """Extracts face embedding using DeepFace."""
    try:
        # We'll use VGG-Face as default, but can be changed
        # enforce_detection=True ensures we only get embeddings for valid faces
        embeddings = DeepFace.represent(img_path=image, model_name="VGG-Face", enforce_detection=True)
        if embeddings:
            return embeddings[0]["embedding"]
        return None
    except Exception as e:
        print(f"Error extracting embedding: {e}")
        return None

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
