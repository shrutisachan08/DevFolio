const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  incrementClicks,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);
router.patch("/:id/click", incrementClicks);

// Protected routes (admin only)
router.post("/", protect,upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"),updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;