"""
🧪 SkinMax - Teste Completo do Pipeline
=========================================
Roda TODAS as análises em uma imagem e mostra os resultados detalhados.

Uso:
    python testar.py caminho/para/sua/imagem.jpg

Exemplo:
    python testar.py tests/images/sample.jpg
"""

import sys
import os
import json

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE_DIR)

from pipeline.landmarks import get_landmarks
from pipeline.skin_tone import analyze_skin
from pipeline.lip_color import analyze_lip
from pipeline.face_shape import predict as predict_face_shape, train as train_face_shape
from pipeline.acne_detector import load_model as load_acne_model, detect_acne
from completeec import detect_eye_color
from model import detect_hair_texture
from darkcircle import dark_circles


def testar(image_path):
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║          🧴 SkinMax - Teste Completo do Pipeline         ║")
    print("╚══════════════════════════════════════════════════════════╝")
    print(f"\n  📷 Imagem: {image_path}")
    print()

    if not os.path.exists(image_path):
        print(f"  ❌ Arquivo não encontrado: {image_path}")
        return

    resultados = {}
    erros = []

    # ─────────────────────────────────────────────────────────
    # 1. DETECÇÃO DE ROSTO (MediaPipe)
    # ─────────────────────────────────────────────────────────
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 1. DETECÇÃO DE ROSTO (MediaPipe)                         │")
    print("└──────────────────────────────────────────────────────────┘")
    img, points = get_landmarks(image_path)

    if points is None:
        print("  ❌ Nenhum rosto detectado!")
        print("  💡 Use uma foto frontal com boa iluminação.")
        return

    print(f"  ✅ Rosto detectado — {len(points)} landmarks mapeados")
    resultados["landmarks"] = len(points)

    # ─────────────────────────────────────────────────────────
    # 2. TOM DE PELE & SUBTOM (LAB Colorspace)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 2. TOM DE PELE & SUBTOM (LAB Colorspace)                 │")
    print("└──────────────────────────────────────────────────────────┘")
    skin = analyze_skin(img, points)
    if "error" in skin:
        print(f"  ⚠️  Erro: {skin['error']}")
        erros.append("skin_tone")
    else:
        print(f"  Tom:       {skin['tone']}")
        print(f"  Subtom:    {skin['undertone']}")
        print(f"  Hex:       {skin['hex']}")
        print(f"  LAB:       L={skin['lab']['L']}  a={skin['lab']['a']}  b={skin['lab']['b']}")
        resultados["skin"] = skin

    # ─────────────────────────────────────────────────────────
    # 3. COR DOS LÁBIOS (HSV Analysis)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 3. COR DOS LÁBIOS (HSV Analysis)                         │")
    print("└──────────────────────────────────────────────────────────┘")
    lip = analyze_lip(img, points)
    if "error" in lip:
        print(f"  ⚠️  Erro: {lip['error']}")
        erros.append("lip_color")
    else:
        print(f"  Cor:       {lip['color']}")
        print(f"  Hex:       {lip['hex']}")
        resultados["lip"] = lip

    # ─────────────────────────────────────────────────────────
    # 4. FORMATO DO ROSTO (SVM Classifier)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 4. FORMATO DO ROSTO (SVM Classifier)                     │")
    print("└──────────────────────────────────────────────────────────┘")
    model_path = os.path.join(BASE_DIR, "models", "face_shape.pkl")
    if not os.path.exists(model_path):
        print("  ⏳ Modelo não encontrado, treinando agora...")
        train_face_shape(model_path)

    face = predict_face_shape(points, model_path)
    if "error" in face:
        print(f"  ⚠️  Erro: {face['error']}")
        erros.append("face_shape")
    else:
        print(f"  Formato:   {face['shape']}")
        print(f"  Confiança: {face['confidence']}%")
        resultados["face_shape"] = face

    # ─────────────────────────────────────────────────────────
    # 5. COR DOS OLHOS (Iris Segmentation + HSV/LAB)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 5. COR DOS OLHOS (Iris Segmentation + HSV/LAB)           │")
    print("└──────────────────────────────────────────────────────────┘")
    eye = detect_eye_color(image_path)
    if "error" in eye:
        print(f"  ⚠️  Erro: {eye['error']}")
        erros.append("eye_color")
    else:
        print(f"  Cor:       {eye['eye_color']}")
        print(f"  Confiança: {eye['confidence']}")
        if "hsv" in eye:
            print(f"  HSV:       H={eye['hsv']['hue']}  S={eye['hsv']['saturation']}  V={eye['hsv']['value']}")
        resultados["eye_color"] = eye

    # ─────────────────────────────────────────────────────────
    # 6. TEXTURA DO CABELO (MobileNetV3)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 6. TEXTURA DO CABELO (MobileNetV3)                       │")
    print("└──────────────────────────────────────────────────────────┘")
    hair = detect_hair_texture(image_path)
    if "error" in hair:
        print(f"  ⚠️  Erro: {hair['error']}")
        erros.append("hair_texture")
    else:
        print(f"  Textura:   {hair['hair_texture']}")
        print(f"  Confiança: {hair['confidence']}")
        resultados["hair"] = hair

    # ─────────────────────────────────────────────────────────
    # 7. OLHEIRAS (Dark Circles Detection)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 7. OLHEIRAS (Dark Circles - LAB Comparison)              │")
    print("└──────────────────────────────────────────────────────────┘")
    try:
        dc = dark_circles(image_path)
        if "error" in dc or dc.get("severity") == "N/A":
            print(f"  ⚠️  Não foi possível analisar olheiras")
            erros.append("dark_circles")
        else:
            print(f"  Severidade:     {dc['severity']}")
            print(f"  Score:          {dc.get('severity_score', '?')}")
            print(f"  Queda de luz:   {dc.get('lightness_drop', '?')}")
            print(f"  Dist. de cor:   {dc.get('color_distance', '?')}")
            resultados["dark_circles"] = dc
    except Exception as e:
        print(f"  ⚠️  Erro: {e}")
        erros.append("dark_circles")

    # ─────────────────────────────────────────────────────────
    # 8. DETECÇÃO DE ACNE (YOLOv8-nano)
    # ─────────────────────────────────────────────────────────
    print()
    print("┌──────────────────────────────────────────────────────────┐")
    print("│ 8. DETECÇÃO DE ACNE (YOLOv8-nano)                        │")
    print("└──────────────────────────────────────────────────────────┘")
    acne_model_path = os.path.join(BASE_DIR, "models", "acne", "best.pt")
    if not os.path.exists(acne_model_path):
        print(f"  ⚠️  Modelo não encontrado: {acne_model_path}")
        erros.append("acne (modelo ausente)")
    else:
        acne_model = load_acne_model(acne_model_path)
        acne = detect_acne(image_path, acne_model)
        print(f"  Severidade:  {acne['overall_severity']}")
        print(f"  Detecções:   {acne['count']}")
        if acne['detections']:
            print(f"  Distribuição por região:")
            regions = {}
            for d in acne['detections']:
                r = d['region']
                regions[r] = regions.get(r, 0) + 1
            for region, count in regions.items():
                print(f"    • {region}: {count} detecção(ões)")
            print(f"  Top detecções:")
            for d in acne['detections'][:5]:
                print(f"    [{d['region']:12}] {d['severity']:8} — {d['confidence']}% confiança")
        resultados["acne"] = acne

    # ═══════════════════════════════════════════════════════════
    # RESUMO FINAL
    # ═══════════════════════════════════════════════════════════
    print()
    print("╔══════════════════════════════════════════════════════════╗")
    print("║                    📋 RESUMO FINAL                       ║")
    print("╠══════════════════════════════════════════════════════════╣")
    print(f"║  Rosto:        ✅ Detectado ({resultados.get('landmarks', 0)} landmarks)")
    if "skin" in resultados:
        print(f"║  Pele:         {resultados['skin']['tone']} / {resultados['skin']['undertone']} ({resultados['skin']['hex']})")
    if "lip" in resultados:
        print(f"║  Lábios:       {resultados['lip']['color']} ({resultados['lip']['hex']})")
    if "face_shape" in resultados:
        print(f"║  Rosto:        {resultados['face_shape']['shape']} ({resultados['face_shape']['confidence']}%)")
    if "eye_color" in resultados:
        print(f"║  Olhos:        {resultados['eye_color']['eye_color']} ({resultados['eye_color']['confidence']})")
    if "hair" in resultados:
        print(f"║  Cabelo:       {resultados['hair']['hair_texture']} ({resultados['hair']['confidence']})")
    if "dark_circles" in resultados:
        print(f"║  Olheiras:     {resultados['dark_circles']['severity']} (score: {resultados['dark_circles'].get('severity_score', '?')})")
    if "acne" in resultados:
        print(f"║  Acne:         {resultados['acne']['overall_severity']} ({resultados['acne']['count']} detecções)")
    print("╠══════════════════════════════════════════════════════════╣")

    total_modulos = 7
    sucesso = total_modulos - len(erros)
    print(f"║  Status:       {sucesso}/{total_modulos} módulos OK", end="")
    if erros:
        print(f" — Falhas: {', '.join(erros)}", end="")
    print()
    print("╚══════════════════════════════════════════════════════════╝")

    # Salvar JSON com resultado completo
    output_path = os.path.join(BASE_DIR, "outputs", "ultimo_resultado.json")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(resultados, f, indent=2, ensure_ascii=False)
    print(f"\n  💾 Resultado salvo em: {output_path}")

    print("\n  💡 Dicas para validar:")
    print("     • Os resultados batem visualmente com a foto?")
    print("     • Teste com 3+ fotos diferentes (tons, etnias, iluminação)")
    print("     • Confianças abaixo de 50% indicam que o modelo está inseguro")
    print()


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(__doc__)
        print("  ❌ Passe o caminho da imagem!")
        print("  Exemplo: python testar.py tests/images/sample.jpg")
        sys.exit(1)

    testar(sys.argv[1])
