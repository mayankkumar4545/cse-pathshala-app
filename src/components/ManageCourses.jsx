import React, { useState, useEffect } from "react";
import "./AdminContent.css";

const API_URL = "http://localhost:5000/api";

const ManageCourses = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // --- New State for New Fields ---
  const [duration, setDuration] = useState("");
  const [examDate, setExamDate] = useState("");
  const [enrollDate, setEnrollDate] = useState("");
  const [price, setPrice] = useState("");

  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          thumbnailUrl,
          duration,
          examDate,
          enrollDate,
          price,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create course");

      setMessage("Course created successfully!");
      // Clear form
      setTitle("");
      setDescription("");
      setThumbnailUrl("");
      setDuration("");
      setExamDate("");
      setEnrollDate("");
      setPrice("");
      fetchCourses(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await fetch(`${API_URL}/courses/${courseId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to delete course");
        setMessage("Course deleted successfully!");
        fetchCourses(); // Refresh the list
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="admin-content-container">
      <h2 className="admin-content-title">Manage Courses</h2>

      {/* Create Course Form */}
      <div className="admin-form-container">
        <h3>Create New Course</h3>
        <form onSubmit={handleCreateCourse}>
          {/* ... (title, description, thumbnailUrl inputs are the same) ... */}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to React"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short summary of the course content."
              required
            />
          </div>
          <div className="form-group">
            <label>Thumbnail URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              required
            />
          </div>

          {/* --- New Form Fields --- */}
          <div className="form-group">
            <label>Duration (e.g., 8 Weeks)</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price ($)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Enrollment Deadline</label>
            <input
              type="date"
              value={enrollDate}
              onChange={(e) => setEnrollDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Exam Date</label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-form-button">
            Create Course
          </button>
        </form>
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}
      </div>

      {/* Existing Courses List */}
      {/* ... (the list part of the component is the same) ... */}
      <div className="admin-list-container">
        <h3>Existing Courses</h3>
        <ul className="admin-list">
          {courses.map((course) => (
            <li key={course._id} className="admin-list-item">
              <span>{course.title}</span>
              <button
                onClick={() => handleDeleteCourse(course._id)}
                className="admin-delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageCourses;
