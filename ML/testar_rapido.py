import sys, os, json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['KERAS_BACKEND'] = 'jax'

from pipeline.landmarks import get_landmarks
from pipeline.skin_tone import analyze_skin
from pipeline.lip_color import analyze_lip
from pipeline.face_shape import predict as predict_face_shape
from pipeline.acne_detector import load_model as load_acne_model, detect_acne
from completeec import detect_eye_color
from model import detect_hair_texture
from darkcircle import dark_circles

image_path = os.path.join(os.path.dirname(__file__), "..", "IMG_1220.jpeg")

results = {}

img, points = get_landmarks(image_path)
if points is None:
    results["error"] = "No face detected"
else:
    results["landmarks"] = len(points)
    results["skin"] = analyze_skin(img, points)
    results["lip"] = analyze_lip(img, points)
    results["face_shape"] = predict_face_shape(points)
    results["eye_color"] = detect_eye_color(image_path)
    results["hair_texture"] = detect_hair_texture(image_path)
    
    try:
        results["dark_circles"] = dark_circles(image_path)
    except Exception as e:
        results["dark_circles"] = {"error": str(e)}
    
    acne_model = load_acne_model(os.path.join(os.path.dirname(__file__), "models", "acne", "best.pt"))
    results["acne"] = detect_acne(image_path, acne_model)

output_path = os.path.join(os.path.dirname(__file__), "outputs", "resultado_completo.json")
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print("DONE:" + output_path)
