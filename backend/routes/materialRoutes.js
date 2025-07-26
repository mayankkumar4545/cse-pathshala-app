const express = require("express");
const router = express.Router();
const {
  getAllMaterials,
  createMaterial,
  deleteMaterial,
} = require("../controllers/materialController");
const { protect } = require("../middleware/authMiddleware");

// Public route to get all materials
router.get("/", getAllMaterials);

// Protected admin routes
router.post("/", protect, createMaterial);
router.delete("/:id", protect, deleteMaterial);

module.exports = router;
