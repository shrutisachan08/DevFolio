import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await axios.get(`/projects/${id}`);
      setProject(data);
      setLoading(false);
    };
    fetchProject();
  }, [id]);

  const handleClick = async (url, type) => {
    await axios.patch(`/projects/${id}/click`);
    window.open(url, "_blank");
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!project) return <div style={{ padding: "2rem" }}>Project not found.</div>;

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      
      {/* Back Button */}
      <Link to="/projects" style={{ color: "#6c63ff", textDecoration: "none", fontSize: "0.9rem" }}>
        ← Back to Projects
      </Link>

      {/* Project Image */}
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          style={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            borderRadius: "12px",
            marginTop: "1.5rem"
          }}
        />
      )}

      {/* Title */}
      <h1 style={{ fontSize: "2rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
        {project.title}
      </h1>

      {/* Stats */}
      <div style={{ display: "flex", gap: "1.5rem", color: "#888", fontSize: "0.9rem", marginBottom: "1rem" }}>
        <span>👁 {project.views} views</span>
        <span>🖱 {project.clicks} clicks</span>
      </div>

      {/* Description */}
      <p style={{ color: "#444", lineHeight: "1.7", fontSize: "1rem", marginBottom: "1rem" }}>
        {project.description}
      </p>

      {project.longDescription && (
        <p style={{ color: "#555", lineHeight: "1.8", marginBottom: "1.5rem" }}>
          {project.longDescription}
        </p>
      )}

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "0.8rem" }}>Tech Stack</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {project.techStack.map((tech) => (
              <span key={tech} style={{
                background: "#f0eeff",
                color: "#6c63ff",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                fontSize: "0.85rem"
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div style={{ display: "flex", gap: "1rem" }}>
        {project.liveUrl && (
          <button
            onClick={() => handleClick(project.liveUrl)}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#6c63ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            🚀 Live Demo
          </button>
        )}
        {project.githubUrl && (
          <button
            onClick={() => handleClick(project.githubUrl)}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#222",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            GitHub Repo
          </button>
        )}
      </div>

    </div>
  );
};

export default ProjectDetail;