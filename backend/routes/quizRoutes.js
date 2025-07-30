const express = require("express");
const router = express.Router();

// Import the controller functions that will handle the logic for each route.
const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  submitQuiz,
  deleteQuiz, // 1. Import the new deleteQuiz function from the controller.
} = require("../controllers/quizController");

// Import the middleware to protect admin-only routes.
const { protect } = require("../middleware/authMiddleware");

// --- Route Definitions ---

// This route handles GETTING all quizzes and CREATING a new quiz.
// GET /api/quizzes -> getAllQuizzes()
// POST /api/quizzes -> protect() -> createQuiz()
router.route("/").get(getAllQuizzes).post(protect, createQuiz);

// This route now handles GETTING a single quiz and DELETING a single quiz.
// GET /api/quizzes/:id -> getQuizById()
// DELETE /api/quizzes/:id -> protect() -> deleteQuiz()
router.route("/:id").get(getQuizById).delete(protect, deleteQuiz); // 2. Add the .delete() method here.

// This route handles a student submitting their answers for a specific quiz.
// POST /api/quizzes/:id/submit -> submitQuiz()
router.route("/:id/submit").post(submitQuiz);

module.exports = router;
