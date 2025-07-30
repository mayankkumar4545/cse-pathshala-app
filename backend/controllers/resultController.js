const QuizResult = require("../models/QuizResult");
const Quiz = require("../models/Quiz"); // To get quiz title

// @desc    Save a new quiz result
// @route   POST /api/results
// @access  Public
exports.saveResult = async (req, res) => {
  try {
    const { quizId, participantName, mobileNumber, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found." });
    }

    let score = 0;
    const totalQuestions = quiz.questions.length;
    const detailedResults = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      if (isCorrect) {
        score++;
      }
      detailedResults.push({
        questionText: question.questionText,
        submittedAnswer: answers[index] || "Not Answered",
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    });

    const percentage = Math.round((score / totalQuestions) * 100);

    const newResult = new QuizResult({
      quiz: quizId,
      quizTitle: quiz.title,
      participantName,
      mobileNumber,
      score,
      totalQuestions,
      percentage,
      results: detailedResults,
    });

    await newResult.save();

    res.status(201).json({
      message: "Result saved successfully!",
      resultId: newResult._id,
      score,
      totalQuestions,
      results: detailedResults,
    });
  } catch (error) {
    console.error("Error saving result:", error);
    res.status(500).json({ message: "Server error while saving result." });
  }
};

// @desc    Get leaderboard for a specific quiz
// @route   GET /api/results/leaderboard/:quizId
// @access  Public
exports.getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;
    const leaderboard = await QuizResult.find({ quiz: quizId })
      .sort({ score: -1, createdAt: 1 }) // Highest score first, then oldest entry
      .select("participantName score percentage createdAt")
      .limit(20); // Get top 20

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc    Get results for a specific mobile number
// @route   GET /api/results/my-results/:mobileNumber
// @access  Public
exports.getMyResults = async (req, res) => {
  try {
    const { mobileNumber } = req.params;
    const results = await QuizResult.find({ mobileNumber }).sort({
      createdAt: -1,
    }); // Newest first

    res.status(200).json(results);
  } catch (error) {
    console.error("Error fetching my results:", error);
    res.status(500).json({ message: "Server error." });
  }
};

// @desc    Get all results (for admin)
// @route   GET /api/results
// @access  Private/Admin
exports.getAllResults = async (req, res) => {
  try {
    const results = await QuizResult.find().sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

// @desc    Delete a quiz result
// @route   DELETE /api/results/:id
// @access  Private/Admin
exports.deleteResult = async (req, res) => {
  try {
    const result = await QuizResult.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Result not found." });
    }
    await result.deleteOne();
    res.status(200).json({ message: "Result deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
