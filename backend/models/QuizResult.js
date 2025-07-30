const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    quizTitle: {
      type: String,
      required: true,
    },
    participantName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
    },
    // We can store the detailed answers as well, if needed for review.
    results: [
      {
        questionText: String,
        submittedAnswer: String,
        correctAnswer: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
