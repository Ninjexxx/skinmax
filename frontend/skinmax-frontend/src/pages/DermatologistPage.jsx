import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";

export default function DermatologistsPage() {
  const [loading, setLoading] = useState(false);

  const findDermatologists = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      window.open(
        "https://www.google.com/maps/search/dermatologista+perto+de+mim",
        "_blank"
      );

      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } =
          position.coords;

        const url =
          `https://www.google.com/maps/search/dermatologista/@${latitude},${longitude},14z`;

        window.open(url, "_blank");

        setLoading(false);
      },

      () => {
        window.open(
          "https://www.google.com/maps/search/dermatologista+perto+de+mim",
          "_blank"
        );

        setLoading(false);
      }
    );
  };

  return (
    <div className="layout">
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "40px",
          background: "#f8f6f3",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "16px",
            }}
          >
            Encontrar dermatologistas
          </h1>

          <p
            style={{
              color: "#666",
              fontSize: "18px",
              marginBottom: "40px",
            }}
          >
            Encontre dermatologistas qualificados
            perto da sua localização para consulta
            e tratamento profissional.
          </p>

          <div
            style={{
              background: "#fff",
              borderRadius: "30px",
              padding: "50px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.05)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "80px",
                marginBottom: "20px",
              }}
            >
              +
            </div>

            <h2
              style={{
                marginBottom: "16px",
              }}
            >
              Localizar dermatologistas próximos
            </h2>

            <p
              style={{
                color: "#777",
                marginBottom: "30px",
              }}
            >
              Usaremos sua localização atual
              para encontrar dermatologistas próximos
              no Google Maps.
            </p>

            <button
              onClick={findDermatologists}
              disabled={loading}
              style={{
                background: "#e6c3aa",
                border: "none",
                padding: "16px 32px",
                borderRadius: "999px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {loading
                ? "Procurando profissionais..."
                : "Encontrar dermatologistas próximos"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
