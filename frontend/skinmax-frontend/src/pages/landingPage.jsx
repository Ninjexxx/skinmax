import "../styles/landingPage.css";
import heroImage from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-logo">
        <h1>SKINMAX</h1>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Seu brilho,
          <br />
          sob medida.
        </h1>

        <p className="hero-subtitle">
          Recomendações de skincare com IA para uma pele limpa,
          equilibrada e bem cuidada.
        </p>

        <button
          className="hero-btn"
          onClick={() => navigate("/home")}
        >
          ANALISAR AGORA
        </button>
      </div>
    </section>
  );
}
