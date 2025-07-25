const Course = require("../models/Course");

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single course by ID with all its video details
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("videos");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
