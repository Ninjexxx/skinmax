from completeec import detect_eye_color
from model import detect_hair_texture

def analyze_face(image_path: str) -> dict:
    """
    Single function that runs eye and hair   modules.
    Flask calls this with an image path.
    Returns combined result.
    """
    eye_result  = detect_eye_color(image_path)
    hair_result = detect_hair_texture(image_path)

    return {
        "eye_color": {
            "color":      eye_result.get("eye_color"),
           
        },
        "hair_texture": {
            "type":       hair_result.get("hair_texture"),
            
        }
    }

if __name__ == "__main__":
    result = analyze_face("testing.webp")
    print(result)