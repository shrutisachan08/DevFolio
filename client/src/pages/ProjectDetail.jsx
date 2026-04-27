import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import "./ProjectDetail.css";
import "./Home.css";

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

  const handleClick = async (url) => {
    await axios.patch(`/projects/${id}/click`);
    window.open(url, "_blank");
  };

  if (loading) return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      color: "var(--accent)",
      fontSize: "1.1rem"
    }}>
      Loading...
    </div>
  );

  if (!project) return (
    <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>
      Project not found.
    </div>
  );

  return (
    <div className="detail-page">
      <Link to="/projects" className="back-btn">← Back to Projects</Link>

      {project.imageUrl && (
        <img src={project.imageUrl} alt={project.title} className="detail-image" />
      )}

      <h1 className="detail-title">{project.title}</h1>

      <div className="detail-stats">
        <span>👁 {project.views} views</span>
        <span>🖱 {project.clicks} clicks</span>
      </div>

      <p className="detail-description">{project.description}</p>

      {project.longDescription && (
        <p className="detail-long-desc">{project.longDescription}</p>
      )}

      {project.techStack?.length > 0 && (
        <div className="detail-tech-section">
          <h3>Tech Stack</h3>
          <div className="tech-tags">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      )}

      <div className="detail-buttons">
        {project.liveUrl && (
          <button className="btn-live" onClick={() => handleClick(project.liveUrl)}>
            🚀 Live Demo
          </button>
        )}
        {project.githubUrl && (
          <button className="btn-github" onClick={() => handleClick(project.githubUrl)}>
            GitHub Repo
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;