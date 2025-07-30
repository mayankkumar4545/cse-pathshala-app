const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {
  createMaterial,
  getMaterials,
  deleteMaterial,
} = require("../controllers/materialController");
const { protect } = require("../middleware/authMiddleware");

// --- Multer Configuration for Material Files ---
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // This folder MUST exist in your backend project
    cb(null, "uploads/materials/");
  },
  filename: function (req, file, cb) {
    // Creates a unique filename to prevent overwrites
    cb(null, "material-" + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// --- API Routes ---
router
  .route("/")
  .get(getMaterials)
  // This is the crucial line. It tells Express to use the 'upload' middleware
  // to handle a single file named 'materialFile' before calling 'createMaterial'.
  .post(protect, upload.single("materialFile"), createMaterial);

router.route("/:id").delete(protect, deleteMaterial);

module.exports = router;
