import cv2
import os
import numpy as np
import random
import shutil

def preprocess_face(image_path, target_size=(224, 224)):
    """
    Load an image, detect the face, crop it with padding, and resize it.
    """
    # Load Haar Cascade
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    img = cv2.imread(image_path)
    if img is None:
        return None
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    # If no face is detected, we take a center crop to avoid losing data
    if len(faces) == 0:
        h, w = img.shape[:2]
        size = min(h, w)
        start_x = (w - size) // 2
        start_y = (h - size) // 2
        face_roi = img[start_y:start_y+size, start_x:start_x+size]
    else:
        # Pick the largest face detected
        x, y, w, h = max(faces, key=lambda f: f[2] * f[3])
        
        # Add 20% padding around the face for context (hair, ears)
        padding_w = int(0.2 * w)
        padding_h = int(0.2 * h)
        y1 = max(0, y - padding_h)
        y2 = min(img.shape[0], y + h + padding_h)
        x1 = max(0, x - padding_w)
        x2 = min(img.shape[1], x + w + padding_w)
        face_roi = img[y1:y2, x1:x2]
    
    # Resize to model input size
    face_img = cv2.resize(face_roi, target_size)
    
    return face_img

def split_and_preprocess(raw_dir, processed_dir, train_ratio=0.7, val_ratio=0.15):
    """
    Splits raw images into Train, Val, and Test sets and preprocesses them.
    Defaults to 70% Train, 15% Val, 15% Test.
    """
    if os.path.exists(processed_dir):
        print(f"Cleaning existing directory: {processed_dir}")
        shutil.rmtree(processed_dir)
        
    for category in ['real', 'spoof']:
        raw_category_path = os.path.join(raw_dir, category)
        if not os.path.exists(raw_category_path):
            print(f"Skipping {category}: Directory not found.")
            continue
            
        images = [f for f in os.listdir(raw_category_path) if f.lower().endswith(('.jpg', '.png', '.jpeg'))]
        random.shuffle(images)
        
        # Calculate split indices
        num_images = len(images)
        train_end = int(num_images * train_ratio)
        val_end = train_end + int(num_images * val_ratio)
        
        splits = {
            'train': images[:train_end],
            'val': images[train_end:val_end],
            'test': images[val_end:]
        }
        
        for phase, img_list in splits.items():
            phase_path = os.path.join(processed_dir, phase, category)
            os.makedirs(phase_path, exist_ok=True)
            
            print(f"Processing {len(img_list)} images for {phase}/{category}...")
            
            for i, img_name in enumerate(img_list):
                src = os.path.join(raw_category_path, img_name)
                dst = os.path.join(phase_path, f"{category}_{i}.jpg")
                
                face = preprocess_face(src)
                if face is not None:
                    cv2.imwrite(dst, face)
                
                if (i + 1) % 100 == 0:
                    print(f"  > {i + 1} images done...")

if __name__ == "__main__":
    import time
    start_time = time.time()
    
    RAW_PATH = 'backend/ml_model/data/raw'
    PROC_PATH = 'backend/ml_model/data/processed'
    
    print("--- Starting Advanced Preprocessing ---")
    split_and_preprocess(RAW_PATH, PROC_PATH)
    
    duration = time.time() - start_time
    print(f"\n--- Processing Complete in {duration:.2f}s ---")
    print(f"Data is ready in: {PROC_PATH}")
