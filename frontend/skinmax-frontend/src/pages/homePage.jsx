import "../styles/homePage.css";
import modelImage from "../assets/model.jpg";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Firebase";
import { auth } from "../Firebase";
window.getToken = async () => {
  console.log(
    await auth.currentUser.getIdToken()
  );
};


export default function HomePage() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleAnalysis = () => {
    if (isLoggedIn) {
      navigate("/scan");
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        "/scan"
      );

      navigate("/login");
    }
  };

  const handleProtectedNavigation = (
    path
  ) => {
    if (isLoggedIn) {
      navigate(path);
    } else {
      localStorage.setItem(
        "redirectAfterLogin",
        path
      );

      navigate("/login");
    }
  };
  

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem(
        "isLoggedIn"
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "redirectAfterLogin"
      );

      navigate("/home");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <header className="navbar">
        <div className="logo">SkinMax</div>

        <nav>
          <button
            className="nav-link"
            onClick={handleAnalysis}
          >
            Análise
          </button>

          <button
            className="nav-link"
            onClick={() =>
              handleProtectedNavigation(
                "/routines"
              )
            }
          >
            Rotinas
          </button>

          <button
            className="nav-link"
            onClick={() =>
              handleProtectedNavigation(
                "/progress"
              )
            }
          >
            Progresso
          </button>

          <button
            className="nav-link"
            onClick={() =>
              handleProtectedNavigation(
                "/weather"
              )
            }
          >
            Cuidado Climático
          </button>
        </nav>

        <div className="actions">
          {isLoggedIn ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Perfil"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#e6c3aa",
                  }}
                />
              )}

              <span
                style={{
                  fontWeight: "600",
                  color: "#111",
                }}
              >
                {user?.displayName}
              </span>

              <button
                className="login-btn"
                onClick={handleLogout}
              >
                Sair
              </button>
            </div>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() => navigate("/login")}
              >
                Entrar
              </button>

              <button
                className="signup-btn"
                onClick={() => navigate("/login")}
              >
                Criar conta
              </button>
            </>
          )}
        </div>
      </header>

      <section className="hero">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <span className="badge">
          VISÃO COMPUTACIONAL AVANÇADA
        </span>

        <h1>
          Descubra sua melhor pele
          <br />
          com IA
        </h1>

        <p>
          Análise facial avançada com visão
          computacional e inteligência artificial.
          Precisão personalizada no conforto da sua
          casa.
        </p>

        <div className="hero-buttons">
          <button
            className="primary-btn"
            onClick={handleAnalysis}
          >
            Começar análise
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              handleProtectedNavigation(
                "/analysis"
              )
            }
          >
            Ver relatório exemplo
          </button>
        </div>

        <div className="hero-card">
          <img src={modelImage} alt="Análise com IA" />

          <div className="floating-card hydration">
            <h4>Nível de hidratação</h4>

            <div className="bar">
              <div className="fill"></div>
            </div>

            <span>82% ideal</span>
          </div>

          <div className="floating-card recommendation">
            <h4>Recomendação da IA</h4>

            <p>
              Troque para um limpador com
              ceramidas para reparo noturno.
            </p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Precisão aliada ao ritual</h2>

        <p>
          Além da superfície. Analisamos
          múltiplos marcadores para montar sua
          rotina.
        </p>

        <div className="bento-grid">
          <div className="card large">
            <h3>Análise precisa</h3>

            <p>
              Diagnóstico de pele com IA
              e insights detalhados.
            </p>
          </div>

          <div className="card tall">
            <h3>Acompanhamento</h3>

            <p>
              Acompanhe melhorias ao longo
              de semanas e meses.
            </p>
          </div>

          <div className="card">
            <h3>Chat com IA</h3>

            <p>
              Tire dúvidas sobre sua
              rotina em tempo real.
            </p>
          </div>

          <div className="card wide">
            <h3>Rotinas personalizadas</h3>

            <p>
              Protocolos da manhã e da noite
              adaptados à sua pele.
            </p>
          </div>
        </div>
      </section>

      <section className="flow">
        <h2>Fluxo do ritual</h2>

        <div className="steps">
          <div className="step">
            <span>01</span>
            <h3>Tire uma selfie</h3>
          </div>

          <div className="step">
            <span>02</span>
            <h3>Processamento com IA</h3>
          </div>

          <div className="step">
            <span>03</span>
            <h3>Protocolo diário</h3>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Vozes de clareza</h2>

        <div className="testimonial-grid">
          <div className="testimonial">
            <p>
              "A análise da IA foi
              surpreendentemente precisa."
            </p>

            <h4>Elena R.</h4>
          </div>

          <div className="testimonial">
            <p>
              "Minha rotina agora é simples
              e eficaz."
            </p>

            <h4>Marcus T.</h4>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>
          Pronto para sua consulta
          personalizada?
        </h2>

        <p>
          Comece seu primeiro escaneamento hoje e
          experimente o futuro do skincare.
        </p>

        <button
          className="primary-btn"
          onClick={handleAnalysis}
        >
          Começar análise
        </button>
      </section>

      <footer className="footer">
        <div>
          <h3>SkinMax</h3>
          <p>© 2026 SkinMax</p>
        </div>

        <div className="footer-links">
          <a href="#">Política de privacidade</a>
          <a href="#">Termos de serviço</a>
          <a href="#">Contato</a>
        </div>
      </footer>
    </div>
  );
}
