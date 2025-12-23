import tensorflow as tf
import tf2onnx
import onnx
import os

def export_to_onnx(model_path, onnx_path):
    """
    Converts a Keras/TensorFlow model to ONNX format.
    """
    if not os.path.exists(model_path):
        print(f"Error: Model file {model_path} not found.")
        return

    # Load the Keras model
    model = tf.keras.models.load_state_dict(model_path) if os.path.isdir(model_path) else tf.keras.models.load_model(model_path)
    
    # Define input signature
    spec = (tf.TensorSpec((None, 224, 224, 3), tf.float32, name="input"),)
    
    print(f"Converting {model_path} to ONNX...")
    
    model_proto, _ = tf2onnx.convert.from_keras(model, input_signature=spec, opset=13)
    
    # Save ONNX model
    with open(onnx_path, "wb") as f:
        f.write(model_proto.SerializeToString())
    
    print(f"Model exported successfully to {onnx_path}")

if __name__ == "__main__":
    MODEL_H5 = 'backend/ml_model/liveness_model.h5'
    ONNX_PATH = 'backend/ml_model/liveness_model.onnx'
    
    export_to_onnx(MODEL_H5, ONNX_PATH)
