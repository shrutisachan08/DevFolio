import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get("/projects");
      setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>All Projects</h1>
      <p style={{ color: "#666", marginBottom: "2rem" }}>
        {projects.length} projects built
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "1.5rem"
      }}>
        {projects.map((project) => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            style={{ textDecoration: "none" }}
            onClick={() => axios.patch(`/projects/${project._id}/click`)}
          >
            <div style={{
              border: "1px solid #eee",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              cursor: "pointer"
            }}>
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  style={{ width: "100%", height: "180px", objectFit: "cover" }}
                />
              )}
              <div style={{ padding: "1rem" }}>
                <h3 style={{ marginBottom: "0.4rem", color: "#222" }}>
                  {project.title}
                </h3>
                <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                  {project.description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {project.techStack?.map((tech) => (
                    <span key={tech} style={{
                      background: "#f0eeff",
                      color: "#6c63ff",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem"
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;