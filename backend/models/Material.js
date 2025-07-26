const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: {
      type: String,
      required: true,
      enum: ["PDF", "ZIP", "DOC", "IMAGE"],
    }, // Example types
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
