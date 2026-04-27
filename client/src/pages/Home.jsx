import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import "./Home.css";

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
    <div className="home">

      <section className="hero">
        <div className="hero-content">
          <p className="hero-greeting">// hello world, I am</p>
          <h1 className="hero-name">Shruti Sachan</h1>
          <h2 className="hero-role">
            Full Stack <span>Developer</span>
          </h2>
          <p className="hero-desc">
            I build modern, scalable web applications with clean code
            and great user experiences. Passionate about turning ideas into reality.
          </p>
          <div className="hero-buttons">
            <Link to="/projects" className="hero-btn-primary">
              View My Projects
            </Link>
            <a href="https://github.com/shrutisachan08" target="_blank" className="hero-btn-secondary">
              GitHub Profile
            </a>
          </div>
        </div>
        <div className="hero-glow" />
      </section>

      <section className="tech-strip">
        <p className="tech-strip-label">Tech I work with</p>
        <div className="tech-strip-tags">
          {["React", "Node.js", "Express", "MongoDB", "JavaScript", "Python", "Git"].map((tech) => (
            <span key={tech} className="tech-tag">{tech}</span>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <Link to="/projects" className="see-all">See all</Link>
        </div>

        {projects.length === 0 ? (
          <div className="empty-featured">
            <div className="empty-icon">🚀</div>
            <h3>Projects Coming Soon</h3>
            <p>Go to your dashboard and mark projects as featured to show them here!</p>
            <Link to="/projects" className="hero-btn-primary" style={{ display: "inline-block", marginTop: "1rem" }}>
              Browse All Projects
            </Link>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <Link to={`/projects/${project._id}`} key={project._id} className="project-card">
                {project.imageUrl && (
                  <img src={project.imageUrl} alt={project.title} className="card-image" />
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
        )}
      </section>

      <section className="contact-strip">
        <h2>Let's Work Together</h2>
        <p>Open to internships, freelance projects and collaborations</p>
        <a href="mailto:sachan.shruti08@gmail.com" className="hero-btn-primary">
          Get In Touch
        </a>
      </section>

    </div>
  );
};

export default Home;