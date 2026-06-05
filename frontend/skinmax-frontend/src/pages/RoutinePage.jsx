import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/routinePage.css";

export default function RoutinePage() {
  const morningRoutine = [
    "Gentle Cleanser",
    "Vitamin C Serum",
    "Lightweight Moisturizer",
    "SPF 50+ Sunscreen",
  ];

  const nightRoutine = [
    "Gentle Cleanser",
    "Niacinamide Serum",
    "Moisturizer",
    "Lip Balm",
  ];

  const weeklyTips = [
    "Exfoliate 1–2 times per week",
    "Change pillow covers regularly",
    "Stay hydrated",
    "Avoid touching your face frequently",
  ];

  return (
    <div className="layout">
      <Sidebar />

      <main className="routine-content">
        <div className="routine-header">
          <h1>Personalized Skincare Routine</h1>

          <p>
            Tailored recommendations to
            maintain healthy skin.
          </p>
        </div>

        <div className="routine-grid">
          <div className="routine-card">
            <h2>🌅 Morning Routine</h2>

            <ul>
              {morningRoutine.map(
                (step, index) => (
                  <li key={index}>
                    {step}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="routine-card">
            <h2>🌙 Night Routine</h2>

            <ul>
              {nightRoutine.map(
                (step, index) => (
                  <li key={index}>
                    {step}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="product-card">
          <h2>
            Recommended Products
          </h2>

          <div className="product-grid">
            <div className="product-item">
              Cleanser
            </div>

            <div className="product-item">
              Moisturizer
            </div>

            <div className="product-item">
              Sunscreen
            </div>

            <div className="product-item">
              Serum
            </div>
          </div>
        </div>

        <div className="tips-card">
          <h2>📅 Weekly Tips</h2>

          <ul>
            {weeklyTips.map(
              (tip, index) => (
                <li key={index}>
                  {tip}
                </li>
              )
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}