import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "../../api/axios.js";

const Dashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) {
      navigate("/admin");
      return;
    }
    fetchProjects();
  }, [admin]);

  const fetchProjects = async () => {
    const { data } = await axios.get("/projects");
    setProjects(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await axios.delete(`/projects/${id}`);
    setProjects(projects.filter((p) => p._id !== id));
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "0.2rem" }}>Admin Dashboard</h1>
          <p style={{ color: "#888" }}>Welcome, {admin?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#ff4d4d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Analytics Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ background: "#f0eeff", padding: "1.2rem", borderRadius: "12px" }}>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Total Projects</p>
          <h2 style={{ color: "#6c63ff" }}>{projects.length}</h2>
        </div>
        <div style={{ background: "#f0eeff", padding: "1.2rem", borderRadius: "12px" }}>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Total Views</p>
          <h2 style={{ color: "#6c63ff" }}>
            {projects.reduce((sum, p) => sum + p.views, 0)}
          </h2>
        </div>
        <div style={{ background: "#f0eeff", padding: "1.2rem", borderRadius: "12px" }}>
          <p style={{ color: "#888", fontSize: "0.85rem" }}>Total Clicks</p>
          <h2 style={{ color: "#6c63ff" }}>
            {projects.reduce((sum, p) => sum + p.clicks, 0)}
          </h2>
        </div>
      </div>

      {/* Add Project Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.3rem" }}>Your Projects</h2>
        <button
          onClick={() => navigate("/admin/project/new")}
          style={{
            padding: "0.7rem 1.4rem",
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          + Add Project
        </button>
      </div>

      {/* Projects Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f9f9f9", textAlign: "left" }}>
            <th style={{ padding: "0.8rem", borderBottom: "1px solid #eee" }}>Title</th>
            <th style={{ padding: "0.8rem", borderBottom: "1px solid #eee" }}>Views</th>
            <th style={{ padding: "0.8rem", borderBottom: "1px solid #eee" }}>Clicks</th>
            <th style={{ padding: "0.8rem", borderBottom: "1px solid #eee" }}>Featured</th>
            <th style={{ padding: "0.8rem", borderBottom: "1px solid #eee" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.8rem" }}>{project.title}</td>
              <td style={{ padding: "0.8rem" }}>{project.views}</td>
              <td style={{ padding: "0.8rem" }}>{project.clicks}</td>
              <td style={{ padding: "0.8rem" }}>{project.featured ? "✅" : "—"}</td>
              <td style={{ padding: "0.8rem", display: "flex", gap: "0.5rem" }}>
                <button
                  onClick={() => navigate(`/admin/project/edit/${project._id}`)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    backgroundColor: "#6c63ff",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;