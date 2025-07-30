const Quiz = require("../models/Quiz");

/**
 * @desc    Create a new quiz
 * @route   POST /api/quizzes
 * @access  Private/Admin
 */
exports.createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;

    // --- Input Validation ---
    if (
      !title ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message: "Quiz title and at least one question are required.",
      });
    }

    // Validate each question to ensure it has the required fields.
    for (const q of questions) {
      if (!q.questionText || !q.options || !q.correctAnswer || !q.timer) {
        return res.status(400).json({
          message:
            "Each question must have text, options, a correct answer, and a timer.",
        });
      }
      if (!q.options.includes(q.correctAnswer)) {
        return res.status(400).json({
          message: `The correct answer for question "${q.questionText}" must be one of the provided options.`,
        });
      }
    }

    // Create a new Quiz instance
    const newQuiz = new Quiz({
      title,
      questions,
      createdBy: req.admin.id, // The admin's ID is attached to the request by the 'protect' middleware
    });

    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz); // Respond with the newly created quiz
  } catch (error) {
    console.error("Error creating quiz:", error);
    // Handle potential validation errors from Mongoose
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error while creating the quiz." });
  }
};

/**
 * @desc    Get all available quizzes
 * @route   GET /api/quizzes
 * @access  Public (for both students and admins)
 */
exports.getAllQuizzes = async (req, res) => {
  try {
    // Fetch all quizzes, but exclude the correct answers to prevent cheating.
    // Also, populate the 'createdBy' field to show which admin created the quiz.
    const quizzes = await Quiz.find()
      .select("-questions.correctAnswer")
      .populate("createdBy", "email");
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error while fetching quizzes." });
  }
};

/**
 * @desc    Get a single quiz by its ID for attempting it
 * @route   GET /api/quizzes/:id
 * @access  Public
 */
exports.getQuizById = async (req, res) => {
  try {
    // Find the quiz by the ID provided in the URL parameters.
    // Exclude the correct answers from the response.
    const quiz = await Quiz.findById(req.params.id).select(
      "-questions.correctAnswer"
    );

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * @desc    Submit a quiz and calculate the score
 * @route   POST /api/quizzes/:id/submit
 * @access  Public (for students)
 */
exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // Expecting an array of the user's selected answers.
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    if (
      !answers ||
      !Array.isArray(answers) ||
      answers.length !== quiz.questions.length
    ) {
      return res
        .status(400)
        .json({ message: "A complete set of answers is required." });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;
    const results = []; // To store detailed results for each question.

    // Loop through each question to check the answer.
    quiz.questions.forEach((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      if (isCorrect) {
        score++;
      }
      // Build a result object for each question.
      results.push({
        questionText: question.questionText,
        submittedAnswer: answers[index] || "Not Answered",
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    });

    // Respond with the final score and detailed results.
    res.status(200).json({
      message: "Quiz submitted successfully!",
      score,
      totalQuestions,
      results,
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting the quiz." });
  }
};

/**
 * @desc    Delete a quiz by its ID
 * @route   DELETE /api/quizzes/:id
 * @access  Private/Admin
 */
exports.deleteQuiz = async (req, res) => {
  try {
    // Find the quiz using the ID from the URL parameter
    const quiz = await Quiz.findById(req.params.id);

    // If no quiz is found with that ID, return a 404 error
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Remove the quiz from the database
    await quiz.deleteOne();

    // Send a success response
    res.status(200).json({ message: "Quiz removed successfully." });
  } catch (error) {
    // Log the error for debugging and send a generic server error message
    console.error("Error deleting quiz:", error);
    res.status(500).json({ message: "Server error while deleting the quiz." });
  }
};

/**
 * @desc    Update an existing quiz
 * @route   PUT /api/quizzes/:id
 * @access  Private/Admin
 */
exports.updateQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // --- Add validation, similar to createQuiz ---
    if (
      !title ||
      !questions ||
      !Array.isArray(questions) ||
      questions.length === 0
    ) {
      return res.status(400).json({
        message: "Quiz title and at least one question are required.",
      });
    }

    for (const q of questions) {
      if (!q.questionText || !q.options || !q.correctAnswer || !q.timer) {
        return res.status(400).json({
          message:
            "Each question must have text, options, a correct answer, and a timer.",
        });
      }
      // Ensure the correct answer is actually one of the options provided
      if (!q.options.includes(q.correctAnswer)) {
        return res.status(400).json({
          message: `The correct answer for question "${q.questionText}" must be one of the provided options.`,
        });
      }
    }
    // --- End of validation ---

    // Update the quiz fields
    quiz.title = title;
    quiz.questions = questions;

    const updatedQuiz = await quiz.save();
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({ message: "Server error while updating quiz." });
  }
};
