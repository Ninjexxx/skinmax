import "./AcneAnalysisCard.css";

const zones = [
  {
    zone: "Forehead",
    severity: "Moderate Acne",
    action: "Manage",
    color: "yellow",
  },

  {
    zone: "Cheeks",
    severity: "Mild Acne",
    action: "Treat",
    color: "red",
  },

  {
    zone: "Nose",
    severity: "Blackheads",
    action: "Exfoliate",
    color: "blue",
  },

  {
    zone: "Chin",
    severity: "Healthy",
    action: "Optimal",
    color: "green",
  },
];

export default function AcneAnalysisCard() {
  return (
    <div className="acne-card">
      <h4 className="section-title">TARGET ZONES</h4>

      <div className="zones-grid">
        {zones.map((zone) => (
          <div
            key={zone.zone}
            className={`zone-card ${zone.color}`}
          >
            <h3>{zone.zone}</h3>

            <p>{zone.severity}</p>

            <button>{zone.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}