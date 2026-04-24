import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../api/axios.js";

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
    <div style={{ fontFamily: "sans-serif", maxWidth: "700px", margin: "0 auto", padding: "2rem" }}>

      <button
        onClick={() => navigate("/admin/dashboard")}
        style={{ background: "none", border: "none", color: "#6c63ff", cursor: "pointer", marginBottom: "1rem" }}
      >
        ← Back to Dashboard
      </button>

      <h1 style={{ fontSize: "1.8rem", marginBottom: "2rem" }}>
        {isEditing ? "Edit Project" : "Add New Project"}
      </h1>

      {error && (
        <div style={{ background: "#fff0f0", color: "#e00", padding: "0.8rem", borderRadius: "8px", marginBottom: "1rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="My Awesome Project"
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Short Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="A brief one-liner about the project"
          />
        </div>

        {/* Long Description */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Long Description</label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={4}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Detailed description of the project..."
          />
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Tech Stack (comma separated)</label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            style={inputStyle}
            placeholder="React, Node.js, MongoDB"
          />
        </div>

        {/* Live URL */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Live URL</label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            style={inputStyle}
            placeholder="https://myproject.vercel.app"
          />
        </div>

        {/* GitHub URL */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>GitHub URL</label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            style={inputStyle}
            placeholder="https://github.com/shruti/project"
          />
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: "1.2rem" }}>
          <label style={labelStyle}>Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={{ ...inputStyle, padding: "0.4rem" }}
          />
        </div>

        {/* Featured */}
        <div style={{ marginBottom: "2rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            id="featured"
          />
          <label htmlFor="featured">Mark as Featured (shows on Home page)</label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.9rem",
            backgroundColor: "#6c63ff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Saving..." : isEditing ? "Update Project" : "Add Project"}
        </button>

      </form>
    </div>
  );
};

export default ProjectForm;