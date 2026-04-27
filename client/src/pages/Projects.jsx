import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Projects.css";
import "../pages/Home.css";

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

  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1>All Projects</h1>
        <p>{projects.length} projects built</p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            className="project-card"
            onClick={() => axios.patch(`/projects/${project._id}/click`)}
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="card-image"
              />
            )}
            <div className="card-body">
              <h3 className="card-title">{project.title}</h3>
              <p className="card-desc">{project.description}</p>
              <div className="tech-tags">
                {project.techStack?.map((tech) => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;