import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import os
import time

def train_liveness_model(data_dir, model_save_path, num_epochs=20, batch_size=32):
    """
    Trains a liveness detection model using TensorFlow/Keras and MobileNetV2.
    """
    # 1. Data Augmentation and Loaders
    # We use ImageDataGenerator for real-time augmentation
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode='nearest'
    )

    val_test_datagen = ImageDataGenerator(rescale=1./255)

    train_generator = train_datagen.flow_from_directory(
        os.path.join(data_dir, 'train'),
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='binary'
    )

    val_generator = val_test_datagen.flow_from_directory(
        os.path.join(data_dir, 'val'),
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='binary'
    )

    test_generator = val_test_datagen.flow_from_directory(
        os.path.join(data_dir, 'test'),
        target_size=(224, 224),
        batch_size=batch_size,
        class_mode='binary',
        shuffle=False
    )

    # 2. Build Model (Transfer Learning with MobileNetV2)
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    
    # Freeze the base model
    base_model.trainable = False

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.2),
        layers.Dense(1, activation='sigmoid') # Binary: 0=Real, 1=Spoof (depending on folder order)
    ])

    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )

    # 3. Callbacks
    callbacks = [
        tf.keras.callbacks.ModelCheckpoint(
            model_save_path, save_best_only=True, monitor='val_accuracy', mode='max'
        ),
        tf.keras.callbacks.EarlyStopping(
            monitor='val_loss', patience=5, restore_best_weights=True
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss', factor=0.2, patience=3, min_lr=0.00001
        )
    ]

    # 4. Training
    start_time = time.time()
    print(f"\n--- Starting Training (TensorFlow) ---")
    history = model.fit(
        train_generator,
        epochs=num_epochs,
        validation_data=val_generator,
        callbacks=callbacks
    )

    duration = time.time() - start_time
    print(f"\nTraining complete in {duration/60:.2f} minutes.")

    # 5. Evaluate on Test Set
    print("\n--- Final Test Set Evaluation ---")
    test_loss, test_acc = model.evaluate(test_generator)
    print(f"Test Accuracy: {test_acc:.4f}")

    # Note: Model is already saved via ModelCheckpoint to 'model_save_path'
    # but we can save the final one as well
    model.save(model_save_path)
    print(f"Model saved to {model_save_path}")

if __name__ == "__main__":
    DATA_PATH = 'backend/ml_model/data/processed'
    SAVE_PATH = 'backend/ml_model/liveness_model.h5' # Or .keras
    
    if os.path.exists(DATA_PATH):
        train_liveness_model(DATA_PATH, SAVE_PATH)
    else:
        print("Error: Processed data not found. Run preprocess.py first.")
