import "./HealthScoreCard.css";

export default function HealthScoreCard() {
  return (
    <div className="health-card">

      <div className="score-circle">
        <span>86</span>
      </div>

      <div className="score-info">
        <h3>Health Score</h3>

        <p>
          Your skin barrier is performing optimally.
        </p>
      </div>

      <div className="score-status">
        Radiant Skin
      </div>

    </div>
  );
}