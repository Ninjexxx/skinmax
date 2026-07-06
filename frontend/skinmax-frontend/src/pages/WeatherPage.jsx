import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/weatherPage.css";

export default function WeatherPage() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY =
    import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } =
            position.coords;

          const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=yes&lang=pt`
          );

          const data = await response.json();

          setWeather(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      },

      (error) => {
        console.error(error);
        setLoading(false);
      }
    );
  }, [API_KEY]);

  if (loading) {
    return (
      <div className="layout">
        <Sidebar />
        <main className="weather-content">
          <h1>Carregando clima...</h1>
        </main>
      </div>
    );
  }

  if (!weather || weather.error) {
    return (
      <div className="layout">
        <Sidebar />
        <main className="weather-content">
          <h1>Erro na API de clima</h1>
          <pre>
            {JSON.stringify(
              weather,
              null,
              2
            )}
          </pre>
        </main>
      </div>
    );
  }

  const temp =
    weather.current.temp_c;

  const humidity =
    weather.current.humidity;

  const uv =
    weather.current.uv;

  const condition =
    weather.current.condition.text;

  const feelsLike =
    weather.current.feelslike_c;

  const wind =
    weather.current.wind_kph;

  const morningRoutine = [];
  const afternoonRoutine = [];
  const nightRoutine = [];

  if (uv >= 6) {
    morningRoutine.push(
      "Aplique protetor solar FPS 50+"
    );

    afternoonRoutine.push(
      "Reaplique o protetor solar a cada 2 horas"
    );
  }

  if (temp >= 30) {
    morningRoutine.push(
      "Use um hidratante leve em gel"
    );

    afternoonRoutine.push(
      "Beba bastante água"
    );

    afternoonRoutine.push(
      "Evite exposição solar excessiva"
    );
  }

  if (humidity >= 60) {
    nightRoutine.push(
      "Limpe bem a pele para remover o excesso de oleosidade"
    );
  }

  if (humidity < 45) {
    nightRoutine.push(
      "Aplique um hidratante mais rico antes de dormir"
    );
  }

  if (
    condition.toLowerCase().includes("chuva") ||
    condition.toLowerCase().includes("rain")
  ) {
    nightRoutine.push(
      "Faça dupla limpeza para remover poluentes"
    );
  }

  if (morningRoutine.length === 0) {
    morningRoutine.push(
      "Siga sua rotina regular de skincare"
    );
  }

  if (afternoonRoutine.length === 0) {
    afternoonRoutine.push(
      "Mantenha a hidratação e proteja sua pele"
    );
  }

  if (nightRoutine.length === 0) {
    nightRoutine.push(
      "Mantenha sua rotina noturna regular"
    );
  }

  return (
    <div className="layout">
      <Sidebar />

      <main className="weather-content">

        <div className="weather-header">
          <h1>Cuidado baseado no clima</h1>

          <p>
            Recomendações personalizadas de skincare
            com base nas condições climáticas atuais.
          </p>
        </div>

        <div className="weather-card">

          <div>
            <h2>
              {weather.location.name},{" "}
              {weather.location.region}
            </h2>

            <p>{condition}</p>

            <p>
              Sensação térmica: {feelsLike}°C
            </p>

            <p>
              Vento: {wind} km/h
            </p>
          </div>

          <div className="weather-stats">

            <div>
              <span>{temp}°C</span>
              <p>Temperatura</p>
            </div>

            <div>
              <span>{humidity}%</span>
              <p>Umidade</p>
            </div>

            <div>
              <span>{uv}</span>
              <p>Índice UV</p>
            </div>

          </div>

        </div>

        <div className="weather-grid">

          <div className="info-card">

            <h3>
              Análise de risco para a pele
            </h3>

            <p>
              <strong>
                Exposição UV:
              </strong>{" "}
              {uv >= 6
                ? "Alta"
                : "Moderada"}
            </p>

            <p>
              <strong>
                Risco de desidratação:
              </strong>{" "}
              {humidity < 45
                ? "Alto"
                : "Moderado"}
            </p>

            <p>
              <strong>
                Risco de oleosidade:
              </strong>{" "}
              {humidity > 60
                ? "Alto"
                : "Moderado"}
            </p>

          </div>

        </div>

        <div className="routine-card">

          <h2>
            Cuidado personalizado de hoje
          </h2>

          <div className="routine-grid">

            <div>
              <h3>Manhã</h3>

              <ul>
                {morningRoutine.map(
                  (
                    item,
                    index
                  ) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3>Tarde</h3>

              <ul>
                {afternoonRoutine.map(
                  (
                    item,
                    index
                  ) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h3>Noite</h3>

              <ul>
                {nightRoutine.map(
                  (
                    item,
                    index
                  ) => (
                    <li key={index}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
