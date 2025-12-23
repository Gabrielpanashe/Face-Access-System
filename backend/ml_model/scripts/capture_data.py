import cv2
import os
import time

def capture_images(label, num_images=500, save_dir="backend/ml_model/data/raw"):
    """
    Captures images from webcam and saves them to a label-specific directory.
    label: 'real' or 'spoof'
    """
    # Create directory structure
    target_dir = os.path.join(save_dir, label)
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        print(f"Created directory: {target_dir}")

    cap = cv2.VideoCapture(0)
    
    # Increase resolution for better training data quality
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

    print(f"\n--- Starting {label.upper()} Data Collection ---")
    print(f"Target: {num_images} images.")
    print("INSTRUCTIONS:")
    print("1. Look at the window displayed.")
    print("2. Move your head slowly (up, down, left, right).")
    print("3. Change your distance from the camera.")
    print("4. Vary your expressions.")
    if label == 'spoof':
        print("5. Move the phone/photo around to create reflections/glare.")
    
    for i in range(5, 0, -1):
        print(f"Starting in {i}...")
        time.sleep(1)

    count = 0
    while count < num_images:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame.")
            break

        # Display window (User should see this)
        display_frame = frame.copy()
        
        # UI Overlays
        progress = int((count / num_images) * 100)
        cv2.rectangle(display_frame, (50, 50), (450, 150), (0, 0, 0), -1)
        cv2.putText(display_frame, f"LABEL: {label.upper()}", (70, 90), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255, 255, 255), 2)
        cv2.putText(display_frame, f"Progress: {count}/{num_images} ({progress}%)", (70, 130), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        
        if count % 50 == 0 and count > 0:
            cv2.putText(display_frame, "CHANGE POSITION!", (400, 360), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 0, 255), 4)

        # Save actual frame (no overlays)
        filename = f"{label}_{int(time.time() * 1000)}.jpg"
        filepath = os.path.join(target_dir, filename)
        cv2.imwrite(filepath, frame)
        
        cv2.imshow('DATA COLLECTION - DO NOT CLOSE', display_frame)
        
        count += 1

        # High-speed capture (waitKey(1) means almost instant)
        # We use a small delay to ensure variety
        if cv2.waitKey(30) & 0xFF == ord('q'):
            print("Capture interrupted by user.")
            break

    cap.release()
    cv2.destroyAllWindows()
    print(f"\nDONE! Successfully captured {count} images.")
    print(f"Files saved in: {target_dir}")

if __name__ == "__main__":
    print("========================================")
    print("   DEEP LEARNING DATA CAPTURE TOOL     ")
    print("========================================\n")
    print("Select Category:")
    print("1. REAL (Live person)")
    print("2. SPOOF (Phone screen / Printed photo)")
    
    choice = input("\nEnter choice (1 or 2): ")
    
    # Let user decide count, default to 500 for better training
    try:
        requested_count = int(input("How many images to capture? (Recommended: 500-1000): ") or 500)
    except:
        requested_count = 500

    if choice == '1':
        capture_images('real', num_images=requested_count)
    elif choice == '2':
        capture_images('spoof', num_images=requested_count)
    else:
        print("Exiting...")
