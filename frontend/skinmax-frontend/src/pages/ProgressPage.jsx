import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/ProgressPage.css";

export default function ProgressPage() {
  const history = [
    {
      date: "May 10",
      score: 72,
      acne: "Moderate",
    },
    {
      date: "May 20",
      score: 76,
      acne: "Mild",
    },
    {
      date: "June 1",
      score: 80,
      acne: "Mild",
    },
  ];

  return (
    <div className="layout">
      <Sidebar />

      <main className="progress-content">
        <div className="progress-header">
          <h1>Progress Tracker</h1>

          <p>
            Monitor your skin health
            journey over time.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Skin Score</h3>

            <div className="stat-value score-value">
              80
            </div>
          </div>

          <div className="stat-card">
            <h3>Acne Severity</h3>

            <div className="stat-value">
              Mild
            </div>
          </div>

          <div className="stat-card">
            <h3>Last Scan</h3>

            <div className="stat-value">
              Today
            </div>
          </div>
        </div>

        <div className="history-card">
          <h2>Scan History</h2>

          {history.map(
            (scan, index) => (
              <div
                key={index}
                className="history-item"
              >
                <div>
                  📅 {scan.date}
                </div>

                <div>
                  Score:{" "}
                  {scan.score}
                </div>

                <div>
                  Acne:{" "}
                  {scan.acne}
                </div>
              </div>
            )
          )}
        </div>

        <div className="achievement-card">
          <h2>Achievements</h2>

          <ul>
            <li>
              ✅ Completed First
              Scan
            </li>

            <li>
              ✅ Built a Daily
              Routine
            </li>

            <li>
              ✅ Started Tracking
              Progress
            </li>

            <li>
              🔥 Skin Score Above
              75
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}