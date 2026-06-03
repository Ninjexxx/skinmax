import "./RoutineCard.css";

export default function RoutineCard() {
  return (
    <div className="routine-card">

      <h4 className="routine-title">
        RECOMMENDED RITUAL
      </h4>

      <div className="routine-grid">

        <div className="routine-column">
          <h3>☀️ Morning Ritual</h3>

          <div className="routine-item">
            <strong>Gentle Foaming Cleanser</strong>
            <p>Removes impurities without stripping moisture.</p>
          </div>

          <div className="routine-item">
            <strong>Niacinamide Serum</strong>
            <p>Targets redness, oiliness and enlarged pores.</p>
          </div>

          <div className="routine-item">
            <strong>Broad-Spectrum SPF 50</strong>
            <p>Essential daily protection against UV damage.</p>
          </div>
        </div>

        <div className="routine-column">
          <h3>🌙 Evening Ritual</h3>

          <div className="routine-item">
            <strong>Salicylic Acid Wash</strong>
            <p>Deeply cleans pores and reduces acne buildup.</p>
          </div>

          <div className="routine-item">
            <strong>Retinol Treatment</strong>
            <p>Supports cell turnover and improves texture.</p>
          </div>

          <div className="routine-item">
            <strong>Ceramide Night Cream</strong>
            <p>Repairs skin barrier while you sleep.</p>
          </div>
        </div>

      </div>

    </div>
  );
}