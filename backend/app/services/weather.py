import requests
from app.config import Config

def get_weather_advice(lat: float, lon: float) -> dict:
    api_key = Config.WEATHER_API_KEY

    if not api_key:
        return {"error": "Chave da API de clima não configurada"}

    try:
        # UV e clima geral.
        weather_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&lang=pt_br"
        weather_resp = requests.get(weather_url, timeout=5)
        weather_data = weather_resp.json()

        # Poluição do ar.
        pollution_url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
        pollution_resp = requests.get(pollution_url, timeout=5)
        pollution_data = pollution_resp.json()

        humidity = weather_data["main"]["humidity"]
        weather_desc = weather_data["weather"][0]["description"]

        aqi = pollution_data["list"][0]["main"]["aqi"]
        aqi_labels = {1: "bom", 2: "regular", 3: "moderado", 4: "ruim", 5: "muito ruim"}

        advice = []

        if humidity < 30:
            advice.append("O ar está muito seco; use um hidratante mais potente hoje")
        elif humidity > 70:
            advice.append("A umidade está alta; prefira produtos leves e não comedogênicos")

        if aqi >= 4:
            advice.append("A poluição está alta hoje; faça dupla limpeza à noite e use sérum antioxidante")
        elif aqi == 3:
            advice.append("A poluição está moderada; não pule a limpeza noturna")

        return {
            "humidity": humidity,
            "weather": weather_desc,
            "aqi": aqi_labels.get(aqi, "desconhecido"),
            "advice": advice
        }

    except Exception as e:
        print(f"Erro na API de clima: {str(e)}")
        return {"error": "Não foi possível buscar os dados de clima"}
