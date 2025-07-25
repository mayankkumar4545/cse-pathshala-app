const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

module.exports = mongoose.model("Course", courseSchema);
