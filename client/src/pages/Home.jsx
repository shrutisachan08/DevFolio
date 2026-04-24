import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/projects");
      setProjects(data.filter((p) => p.featured));
    };
    fetchProjects();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 0" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Hi, I'm Shruti 👋
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "2rem" }}>
          Full Stack Developer — I build beautiful, functional web apps
        </p>
        <Link to="/projects">
          <button style={{
            padding: "0.8rem 2rem",
            fontSize: "1rem",
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}>
            View My Projects
          </button>
        </Link>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1.5rem" }}>
          Featured Projects
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          {projects.length === 0 ? (
            <p style={{ color: "#888" }}>No featured projects yet.</p>
          ) : (
            projects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id} style={{ textDecoration: "none" }}>
                <div style={{
                  border: "1px solid #eee",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s",
                }}>
                  {project.imageUrl && (
                    <img src={project.imageUrl} alt={project.title}
                      style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                  )}
                  <div style={{ padding: "1rem" }}>
                    <h3 style={{ marginBottom: "0.5rem", color: "#222" }}>{project.title}</h3>
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>{project.description}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;