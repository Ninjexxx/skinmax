import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Firebase";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleNewScan = () => {
    localStorage.removeItem("uploadedImage");
    navigate("/scan");
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      localStorage.removeItem("redirectAfterLogin");
      localStorage.removeItem("uploadedImage");

      navigate("/home");

      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>SkinMax</h2>
        <p>Skincare premium com IA</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/home">
          Início
        </NavLink>

        <NavLink to="/scan">
          Escanear
        </NavLink>

        <NavLink to="/analysis">
          Análise
        </NavLink>

        <NavLink to="/weather">
          Cuidado climático
        </NavLink>

        <NavLink to="/dermatologists">
          Dermatologistas
        </NavLink>

        <div className="nav-divider"></div>

        <NavLink to="/progress">
          Progresso
        </NavLink>

        <NavLink to="/routines">
          Rotinas
        </NavLink>

        <NavLink to="/chat">
          Assistente de IA
        </NavLink>

      </nav>

      <button
        className="scan-btn"
        onClick={handleNewScan}
      >
        Novo escaneamento
      </button>

      <div className="bottom-links">
        <a href="#">Configurações</a>

        <a href="#">Suporte</a>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Sair
        </button>
      </div>
    </aside>
  );
}
