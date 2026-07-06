# SkinMax

SkinMax é uma aplicação web para análise personalizada de pele e cabelo. O projeto usa visão computacional e modelos de machine learning treinados para avaliar características faciais, gerar rotinas de skincare, acompanhar progresso e sugerir cuidados com base no clima.

## Recursos

| Recurso | Descrição |
|---|---|
| Análise de pele e cor | Detecta tom, subtom, cor dos olhos e cor dos lábios com OpenCV, MediaPipe e espaços de cor HSV/LAB. |
| Modelos próprios de ML | Inclui detecção de acne, textura do cabelo e classificação do formato do rosto. |
| Rotinas personalizadas | Gera rotinas da manhã e da noite com base nos resultados da análise. |
| Chat contextual | Assistente de IA para dúvidas sobre skincare e cuidados capilares. |
| Acompanhamento de progresso | Salva análises para acompanhar evolução ao longo do tempo. |
| Cuidados pelo clima | Usa dados de UV, umidade e poluição para ajustar recomendações. |
| Lembretes inteligentes | Notificações AM/PM para rotina de skincare via Firebase Cloud Messaging. |

## Pipeline de ML

O pipeline principal roda em Python e combina modelos e etapas de visão computacional. Cada etapa retorna sua predição e, quando aplicável, um valor de confiança.

### Visão computacional

- Tom e subtom de pele com análise LAB em regiões da bochecha e testa.
- Cor dos olhos com segmentação da íris por landmarks refinados do MediaPipe.
- Cor dos lábios por contornos do OpenCV em landmarks labiais.

### Modelos treinados

- Detecção de acne: YOLOv8 nano, com classificação de gravidade e zonas faciais.
- Textura do cabelo: MobileNetV3 com fine-tuning em Keras.
- Formato do rosto: SVM com proporções entre landmarks faciais.

## Arquitetura

```text
React Frontend
  -> Go Gateway / Chatbot / Firebase JWT
  -> Flask Backend
      -> Pipeline de ML
      -> Motor de recomendações
      -> Serviços de clima e histórico
  -> SQLite
```

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Frontend | React, Vite, CSS |
| Backend | Flask, Go |
| Autenticação | Firebase Google OAuth e JWT |
| Notificações | Firebase Cloud Messaging e cron |
| Tempo real | WebSockets em Go |
| Banco de dados | SQLite |
| CV / ML | MediaPipe, OpenCV, YOLOv8, Keras, scikit-learn |
| APIs externas | OpenWeatherMap e WeatherAPI |

## Estrutura do projeto

```text
skinmax/
  frontend/skinmax-frontend/   Aplicação React
  backend/                     Backend Flask
  backend-go/                  Gateway Go, autenticação e chatbot
  ML/                          Scripts e pipeline de ML
  assets/                      Modelos e arquivos visuais
```

## Como rodar

### Pré-requisitos

- Python 3.10+
- Node.js 18+
- Go 1.22+
- Projeto Firebase para autenticação e notificações
- Chave de API de clima

### Backend Flask

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
flask run
```

### Frontend

```bash
cd frontend/skinmax-frontend
npm install
npm run dev
```

### Gateway Go

```bash
cd backend-go
go run .
```

## Variáveis de ambiente

Crie um arquivo `.env` conforme necessário para cada serviço:

```text
OPENWEATHER_API_KEY=sua_chave
VITE_WEATHER_API_KEY=sua_chave
FIREBASE_PROJECT_ID=seu_projeto
FIREBASE_CREDENTIALS=caminho/para/firebase.json
SECRET_KEY=sua_chave_flask
FLASK_BACKEND_URL=http://127.0.0.1:5000
PORT=8080
```

## Equipe

- naina
- utkarsh
- reyhan
- daksh
- shourya
- sunidhi
