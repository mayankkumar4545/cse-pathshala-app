const Material = require("../models/Material");

// Get all materials (Public)
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find();
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// --- ADMIN FUNCTIONS ---

// Create a new material (Protected)
exports.createMaterial = async (req, res) => {
  const { title, description, fileUrl, fileType } = req.body;
  try {
    const newMaterial = new Material({ title, description, fileUrl, fileType });
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(400).json({ message: "Failed to create material", error });
  }
};

// Delete a material (Protected)
exports.deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
