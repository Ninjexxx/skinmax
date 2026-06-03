import tensorflow as tf
from tensorflow import keras
import numpy as np
import cv2

CLASSES    = ["straight", "textured"]
IMG_SIZE   = 224
MODEL_PATH = "models/hair_mobilenetv3.keras"

# Load model once when file is imported
# Loading takes ~1 second — you don't want to reload every request
model = keras.models.load_model(MODEL_PATH)

def detect_hair_texture(image) -> dict:
    """
    Input:  path to a face/hair photo
    Output: { hair_texture, confidence, all_scores }
    """
    img = cv2.imread(image)
    if img is None:
        return {"error": "Could not read image"}

    # Preprocess EXACTLY as during training
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)   # BGR → RGB
    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))   # resize to 224x224
    img = img / 255.0                             # normalise to 0-1
    img = np.expand_dims(img, axis=0)             # add batch dim: (224,224,3) → (1,224,224,3)

    # Run prediction
    preds = model.predict(img, verbose=0)   # shape: (1, 4)
    probs = preds[0]                        # shape: (4,) — one prob per class

    idx        = int(np.argmax(probs))      # index of highest probability
    hair_type  = CLASSES[idx]
    confidence = round(float(probs[idx]), 2)

    return {
        "hair_texture": hair_type,
        "confidence":   confidence,
        
    }

