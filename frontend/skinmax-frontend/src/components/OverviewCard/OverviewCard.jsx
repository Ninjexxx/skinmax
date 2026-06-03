import "./OverviewCard.css";

import hero from "../../assets/sample-image.jpg";
import FaceViewer from "../FaceHeatmap/FaceViewer";

export default function OverviewCard({ image }) {
  return (
    <div className="overview-card">
      <div className="overview-left">
        <h3>Original Scan</h3>

        <div className="image-wrapper">
          <img
            src={image || hero}
            alt="Original Face Scan"
          />
        </div>

        <p className="scan-date">
          Scan Date: June 1, 2026
        </p>
      </div>

      <div className="overview-right">
        <h3>AI Analysis</h3>

        <div className="viewer-wrapper">
          <FaceViewer />
        </div>
      </div>
    </div>
  );
}