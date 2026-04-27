import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios.js";
import "./ProjectForm.css";

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    techStack: "",
    liveUrl: "",
    githubUrl: "",
    featured: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If editing, fetch existing project data
  useEffect(() => {
    if (isEditing) {
      const fetchProject = async () => {
        const { data } = await axios.get(`/projects/${id}`);
        setFormData({
          title: data.title,
          description: data.description,
          longDescription: data.longDescription || "",
          techStack: data.techStack.join(", "),
          liveUrl: data.liveUrl || "",
          githubUrl: data.githubUrl || "",
          featured: data.featured,
        });
      };
      fetchProject();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("longDescription", formData.longDescription);
      data.append("liveUrl", formData.liveUrl);
      data.append("githubUrl", formData.githubUrl);
      data.append("featured", formData.featured);

      // Convert "React, Node.js" → ["React", "Node.js"]
      formData.techStack.split(",").forEach((tech) => {
        data.append("techStack", tech.trim());
      });

      if (image) data.append("image", image);

      if (isEditing) {
        await axios.put(`/projects/${id}`, data);
      } else {
        await axios.post("/projects", data);
      }

      navigate("/admin/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.7rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    boxSizing: "border-box",
    marginTop: "0.4rem",
  };

  const labelStyle = {
    display: "block",
    fontWeight: "500",
    marginBottom: "0.2rem",
  };

 return (
    <div className="form-page">
      <button onClick={() => navigate("/admin/dashboard")} className="form-back-btn">
        ← Back to Dashboard
      </button>

      <h1>{isEditing ? "Edit Project" : "Add New Project"}</h1>

      {error && <div className="error-msg">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title}
            onChange={handleChange} required className="form-input"
            placeholder="My Awesome Project" />
        </div>

        <div className="form-group">
          <label>Short Description *</label>
          <input type="text" name="description" value={formData.description}
            onChange={handleChange} required className="form-input"
            placeholder="A brief one-liner about the project" />
        </div>

        <div className="form-group">
          <label>Long Description</label>
          <textarea name="longDescription" value={formData.longDescription}
            onChange={handleChange} rows={4}
            className="form-input form-textarea"
            placeholder="Detailed description..." />
        </div>

        <div className="form-group">
          <label>Tech Stack (comma separated)</label>
          <input type="text" name="techStack" value={formData.techStack}
            onChange={handleChange} className="form-input"
            placeholder="React, Node.js, MongoDB" />
        </div>

        <div className="form-group">
          <label>Live URL</label>
          <input type="url" name="liveUrl" value={formData.liveUrl}
            onChange={handleChange} className="form-input"
            placeholder="https://myproject.vercel.app" />
        </div>

        <div className="form-group">
          <label>GitHub URL</label>
          <input type="url" name="githubUrl" value={formData.githubUrl}
            onChange={handleChange} className="form-input"
            placeholder="https://github.com/shruti/project" />
        </div>

        <div className="form-group">
          <label>Project Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-input" />
        </div>

        <div className="form-checkbox-group">
          <input type="checkbox" name="featured" id="featured"
            checked={formData.featured} onChange={handleChange} />
          <label htmlFor="featured">Mark as Featured (shows on Home page)</label>
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;