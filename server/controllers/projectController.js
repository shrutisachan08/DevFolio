const Project = require("../models/Project");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST create project (protected)
const createProject = async (req, res) => {
  try {
    //console.log("Body:", req.body);     
    //console.log("File:", req.file); 
    const { title, description, longDescription, techStack, liveUrl, githubUrl, featured } = req.body;
    const project = await Project.create({
      title,
      description,
      longDescription,
      techStack,
      liveUrl,
      githubUrl,
      featured,
      imageUrl: req.file?.path || "",
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// PUT update project (protected)
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, imageUrl: req.file?.path || project.imageUrl },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// DELETE project (protected)
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    await project.deleteOne();
    res.json({ message: "Project removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH increment clicks (public)
const incrementClicks = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $inc: { clicks: 1 } },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  incrementClicks,
};