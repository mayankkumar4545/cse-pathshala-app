const mongoose = require("mongoose");

// This sub-schema defines the structure for a single question within a quiz.
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text cannot be empty."],
  },
  options: {
    type: [String],
    required: true,
    // It's good practice to validate that there are at least two options.
    validate: [
      (val) => val.length >= 2,
      "A question must have at least two options.",
    ],
  },
  correctAnswer: {
    type: String,
    required: [true, "A correct answer must be specified."],
  },
  timer: {
    type: Number,
    required: [true, "A timer duration is required for each question."],
    default: 30, // Default timer is 30 seconds.
    min: [5, "Timer cannot be less than 5 seconds."], // Minimum timer duration.
  },
});

// This is the main schema for the entire quiz.
const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Quiz title is required."],
      trim: true, // Removes whitespace from both ends of a string.
    },
    questions: [questionSchema], // An array of questions using the schema defined above.
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Establishes a reference to the Admin model.
      required: true,
    },
  },
  {
    // Automatically adds `createdAt` and `updatedAt` fields.
    timestamps: true,
  }
);

module.exports = mongoose.model("Quiz", quizSchema);
