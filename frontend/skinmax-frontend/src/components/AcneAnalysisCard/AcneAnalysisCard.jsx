import "./AcneAnalysisCard.css";

export default function AcneAnalysisCard({
  results = {},
}) {
  const severity =
    results.acne_severity || "N/D";

  const count =
    results.acne_count ?? "N/D";

  return (
    <div className="acne-card">

      <h4 className="section-title">
        ANÁLISE DE ACNE
      </h4>

      <div className="zones-grid">

        <div className="zone-card red">
          <h3>Gravidade</h3>

          <p>{severity}</p>

          <button>
            Analisar
          </button>
        </div>

        <div className="zone-card blue">
          <h3>Pontos detectados</h3>

          <p>{count}</p>

          <button>
            Revisar
          </button>
        </div>

      </div>

      {count === 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px",
            background: "#f4fdf6",
            borderRadius: "12px",
            color: "#0f7a34",
            fontWeight: "600",
          }}
        >
          Nenhuma acne ativa detectada
        </div>
      )}

    </div>
  );
}
