const express = require("express");
const {
  getCourses,
  getCourseById,
} = require("../controllers/courseController");
const router = express.Router();

// Route to get all courses
router.get("/", getCourses);

// Route to get a single course by its ID, with populated video details
router.get("/:id", getCourseById);

module.exports = router;
