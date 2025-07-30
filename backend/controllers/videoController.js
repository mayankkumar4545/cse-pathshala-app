const Video = require("../models/Video");

// Get all videos
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new video (handles both URL and file upload)
exports.createVideo = async (req, res) => {
  const { title, description, duration, videoUrl, sourceType } = req.body;
  const file = req.file; // The uploaded file from Multer

  try {
    let finalVideoUrl;

    // Check which source type was selected
    if (sourceType === "upload" && file) {
      finalVideoUrl = `/uploads/videos/${file.filename}`;
    } else if (sourceType === "youtube" && videoUrl) {
      finalVideoUrl = videoUrl;
    } else {
      return res
        .status(400)
        .json({
          message: "Please provide either a video URL or upload a file.",
        });
    }

    const newVideo = new Video({
      title,
      description,
      duration,
      videoUrl: finalVideoUrl,
      sourceType,
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error("Video creation error:", error);
    res.status(500).json({ message: "Server error creating video." });
  }
};

// Delete a video
exports.deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    await video.deleteOne();
    res.json({ message: "Video removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
