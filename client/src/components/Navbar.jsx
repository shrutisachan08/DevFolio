import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";
const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "#6c63ff", margin: 0, fontSize: "1.4rem" }}>
          Dev<span style={{ color: "#222" }}>Folio</span>
        </h2>
      </Link>

      {/* Links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#444", fontWeight: "500" }}>
          Home
        </Link>
        <Link to="/projects" style={{ textDecoration: "none", color: "#444", fontWeight: "500" }}>
          Projects
        </Link>

        {admin ? (
          <>
            <Link to="/admin/dashboard" style={{ textDecoration: "none", color: "#444", fontWeight: "500" }}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1.2rem",
                backgroundColor: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/admin"
            style={{
              padding: "0.5rem 1.2rem",
              backgroundColor: "#6c63ff",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "500"
            }}
          >
            Admin
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;