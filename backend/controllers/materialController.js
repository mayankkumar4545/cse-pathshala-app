const Material = require("../models/Material");

// Get all materials
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new material from a file upload
exports.createMaterial = async (req, res) => {
  const { title } = req.body;
  const file = req.file; // This comes from the multer middleware

  // Check if a file was actually uploaded
  if (!file) {
    return res.status(400).json({ message: "Please upload a material file." });
  }

  try {
    // Construct the URL path that the frontend will use to access the file
    const fileUrl = `/uploads/materials/${file.filename}`;

    const newMaterial = new Material({
      title,
      fileUrl,
    });

    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    console.error("Material creation error:", error);
    res.status(500).json({ message: "Server error while creating material." });
  }
};

// Delete a material
exports.deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }
    await material.deleteOne();
    res.json({ message: "Material removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
