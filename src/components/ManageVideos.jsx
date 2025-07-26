import React, { useState, useEffect } from "react";
import "./AdminContent.css"; // Using the shared CSS file

const API_URL = "http://localhost:5000/api";

const ManageVideos = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [courseId, setCourseId] = useState("");
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

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/videos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, videoUrl, duration, course: courseId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add video");

      setMessage("Video added successfully!");
      setTitle("");
      setVideoUrl("");
      setDuration("");
      setCourseId("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-content-container">
      <h2 className="admin-content-title">Manage Videos</h2>
      <div className="admin-form-container">
        <h3>Add New Video</h3>
        <form onSubmit={handleAddVideo}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Introduction to Arrays"
              required
            />
          </div>
          <div className="form-group">
            <label>YouTube Embed URL</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/your_video_id"
              required
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 10:45"
              required
            />
          </div>
          <div className="form-group">
            <label>Assign to Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="">Select a Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="admin-form-button">
            Add Video
          </button>
        </form>
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}
      </div>
    </div>
  );
};

export default ManageVideos;
