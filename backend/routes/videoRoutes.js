const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createVideo,
  getVideos,
  deleteVideo,
} = require("../controllers/videoController");
const { protect } = require("../middleware/authMiddleware");

// --- Multer Configuration for Videos ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ensure you have a folder named 'videos' inside your 'uploads' folder
    cb(null, "uploads/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, "video-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// --- API Routes ---
router
  .route("/")
  .get(getVideos)
  // This line tells Express to use the 'upload' middleware ONLY for POST requests to create a video
  // 'videoFile' is the specific name of the field that will contain the file
  .post(protect, upload.single("videoFile"), createVideo);

router.route("/:id").delete(protect, deleteVideo);

module.exports = router;
