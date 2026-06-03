import Sidebar from "../components/Sidebar/Sidebar";

import OverviewCard from "../components/OverviewCard/OverviewCard";
import SkinProfileCard from "../components/SkinProfileCard/SkinProfileCard";
import AcneAnalysisCard from "../components/AcneAnalysisCard/AcneAnalysisCard";
import HealthScoreCard from "../components/HealthScoreCard/HealthScoreCard";
import RoutineCard from "../components/RoutineCard/RoutineCard";

import "../styles/analysis.css";

export default function AnalysisPage() {
  const uploadedImage =
    localStorage.getItem("uploadedImage");

  return (
    <div className="layout">
      <Sidebar />

      <main className="content">
        <div className="dashboard-container">

          <header className="page-header">
            <h1>Skin Analysis Report</h1>

            <p>
              AI-powered assessment of your
              uploaded facial image.
            </p>
          </header>

          <OverviewCard image={uploadedImage} />

          <SkinProfileCard image={uploadedImage} />

          <AcneAnalysisCard />

          <HealthScoreCard />

          <RoutineCard />

        </div>
      </main>
    </div>
  );
}