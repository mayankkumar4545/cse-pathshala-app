const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    videoUrl: { type: String, required: true },
    sourceType: { type: String, required: true, enum: ["youtube", "upload"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
