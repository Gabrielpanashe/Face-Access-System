import tensorflow as tf
import numpy as np
import cv2
import os

# Define the model path relative to the backend root
# In production, this might be an absolute path or from environment variables
MODEL_PATH = os.path.join(os.path.dirname(__file__), "../../ml_model/liveness_model.h5")

# Global variable to hold the loaded model
_model = None

def get_liveness_model():
    """Lazy load the liveness model."""
    global _model
    if _model is None:
        if os.path.exists(MODEL_PATH):
            try:
                _model = tf.keras.models.load_model(MODEL_PATH)
                print(f"Liveness model loaded successfully from {MODEL_PATH}")
            except Exception as e:
                print(f"Error loading liveness model: {e}")
        else:
            print(f"Liveness model not found at {MODEL_PATH}")
    return _model

def check_liveness(face_img):
    """
    Analyzes a cropped face image for liveness.
    Returns: (is_live, confidence)
    """
    model = get_liveness_model()
    if model is None:
        # If model is missing, we fail-safe by allowing (or you could reject)
        # For security, you might want to return (False, 0.0)
        return True, 1.0 

    try:
        # 1. Standardize size to 224x224 (matching training)
        img = cv2.resize(face_img, (224, 224))
        
        # 2. Normalize pixel values
        img = img.astype("float32") / 255.0
        
        # 3. Add batch dimension (1, 224, 224, 3)
        img = np.expand_dims(img, axis=0)
        
        # 4. Predict
        prediction = model.predict(img, verbose=0)[0][0]
        
        # Based on training folder order (usually alphabetical):
        # real = 0, spoof = 1
        # If prediction < 0.5, it's likely "Real"
        is_live = prediction < 0.5
        confidence = 1.0 - prediction if is_live else prediction
        
        return bool(is_live), float(confidence)
    except Exception as e:
        print(f"Error during liveness check: {e}")
        return True, 0.0 # Fail-safe
