import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "../../api/axios.js";
import "./Dashboard.css";

const Dashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!admin) { navigate("/admin"); return; }
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

  const handleLogout = () => { logout(); navigate("/admin"); };

  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", color: "var(--accent)" }}>
      Loading...
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {admin?.email}</p>
        </div>
        <button onClick={handleLogout} className="btn-danger">Logout</button>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <p>Total Projects</p>
          <h2>{projects.length}</h2>
        </div>
        <div className="analytics-card">
          <p>Total Views</p>
          <h2>{projects.reduce((sum, p) => sum + p.views, 0)}</h2>
        </div>
        <div className="analytics-card">
          <p>Total Clicks</p>
          <h2>{projects.reduce((sum, p) => sum + p.clicks, 0)}</h2>
        </div>
      </div>

      <div className="projects-section-header">
        <h2>Your Projects</h2>
        <button className="btn-add" onClick={() => navigate("/admin/project/new")}>
          + Add Project
        </button>
      </div>

      <table className="projects-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Views</th>
            <th>Clicks</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.title}</td>
              <td>{project.views}</td>
              <td>{project.clicks}</td>
              <td>{project.featured ? "⭐" : "—"}</td>
              <td>
                <button className="btn-edit" onClick={() => navigate(`/admin/project/edit/${project._id}`)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(project._id)}>
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