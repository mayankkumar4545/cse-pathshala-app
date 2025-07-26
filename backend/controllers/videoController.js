const Video = require("../models/Video");

// Get all videos (Public)
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- ADMIN FUNCTIONS ---

// Create a new video (Protected)
exports.createVideo = async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, duration } = req.body;
  try {
    const newVideo = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      duration,
    });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(400).json({ message: "Failed to create video", error });
  }
};

// Delete a video (Protected)
exports.deleteVideo = async (req, res) => {
  try {
    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
