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
        <p>Premium AI Skincare</p>
      </div>

      <nav className="nav-links">
        <NavLink to="/home">
          Home
        </NavLink>

        <NavLink to="/scan">
          Scan
        </NavLink>

        <NavLink to="/analysis">
          Analysis
        </NavLink>

        <a href="#">Progress</a>

        <a href="#">Routines</a>

        <a href="#">AI Chat</a>

        <a href="#">Community</a>
      </nav>

      <button
        className="scan-btn"
        onClick={handleNewScan}
      >
        New Scan
      </button>

      <div className="bottom-links">
        <a href="#">Settings</a>
        <a href="#">Support</a>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}