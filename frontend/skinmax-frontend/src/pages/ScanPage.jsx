import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import ScanHeader from "../components/ScanHeader/ScanHeader";
import CameraCard from "../components/CameraCard/CameraCard";
import UploadCard from "../components/UploadCard/UploadCard";
import ScanFooter from "../components/ScanFooter/ScanFooter";

import "../styles/scan.css";

export default function ScanPage() {
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    localStorage.setItem("uploadedImage", image);

    navigate("/analysis");
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="scan-content">
        <div className="scan-page">
          <ScanHeader />

          <div className="scan-grid">
            <CameraCard image={image} />

            <UploadCard
              image={image}
              setImage={setImage}
            />
          </div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
          >
            Analyze My Skin
          </button>

          <div className="tips-row">
            <span>☀ Natural Lighting</span>
            <span>😊 Neutral Expression</span>
            <span>🚫 Remove Makeup</span>
          </div>

          <ScanFooter />
        </div>
      </main>
    </div>
  );
}