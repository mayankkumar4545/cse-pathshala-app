const express = require("express");
const router = express.Router();
const {
  saveResult,
  getLeaderboard,
  getMyResults,
  getAllResults,
  deleteResult,
} = require("../controllers/resultController");
const { protect } = require("../middleware/authMiddleware");

// --- Public Routes ---
router.post("/", saveResult);
router.get("/leaderboard/:quizId", getLeaderboard);
router.get("/my-results/:mobileNumber", getMyResults);

// --- Admin Routes ---
router.get("/", protect, getAllResults);
router.delete("/:id", protect, deleteResult);

module.exports = router;
