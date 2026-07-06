import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import Sidebar from "../components/Sidebar/Sidebar";
import ScanHeader from "../components/ScanHeader/ScanHeader";
import CameraCard from "../components/CameraCard/CameraCard";
import UploadCard from "../components/UploadCard/UploadCard";
import ScanFooter from "../components/ScanFooter/ScanFooter";

import "../styles/scan.css";

export default function ScanPage() {
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!image?.file) {
      alert("Envie uma imagem antes de continuar.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Entre na sua conta antes de continuar.");
        navigate("/login");
        return;
      }

      const token =
        await user.getIdToken();

      const formData =
        new FormData();

      formData.append(
        "image",
        image.file
      );

      const response =
        await fetch(
          "http://127.0.0.1:5000/api/analysis/scan",
          {
            method: "POST",
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
            body: formData,
          }
        );

      const data =
        await response.json();

      console.log(
        "Resultado da análise:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Falha na análise"
        );
      }

      localStorage.setItem(
        "analysisResults",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "uploadedImage",
        image.preview
      );

      navigate("/analysis");
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Falha na análise"
      );
    }
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
            Analisar minha pele
          </button>

          <div className="tips-row">
            <span>Luz natural</span>
            <span>Expressão neutra</span>
            <span>Remova maquiagem</span>
          </div>

          <ScanFooter />
        </div>
      </main>
    </div>
  );
}
