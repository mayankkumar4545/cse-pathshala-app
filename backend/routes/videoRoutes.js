const express = require("express");
const router = express.Router();
const {
  getAllVideos,
  createVideo,
  deleteVideo,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

// Public route to get all videos
router.get("/", getAllVideos);

// Protected admin routes
router.post("/", protect, createVideo);
router.delete("/:id", protect, deleteVideo);

module.exports = router;
