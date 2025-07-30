const express = require("express");
const router = express.Router();

// Import the controller functions that will handle the logic for each route.
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz,
  updateQuiz, // 1. Import the new updateQuiz function.
} = require("../controllers/quizController");

// Import the middleware to protect admin-only routes.
const { protect } = require("../middleware/authMiddleware");

// --- Route Definitions ---

// This route handles GETTING all quizzes and CREATING a new quiz.
router.route("/").get(getAllQuizzes).post(protect, createQuiz);

// This route now handles GETTING, DELETING, and UPDATING a single quiz.
router
  .route("/:id")
  .get(getQuizById)
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz); // 2. Add the .put() method for updates.

// This route handles a student submitting their answers for a specific quiz.
router.route("/:id/submit").post(submitQuiz);

module.exports = router;
