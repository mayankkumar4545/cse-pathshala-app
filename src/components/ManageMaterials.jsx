import React, { useState, useEffect } from "react";
import "./AdminContent.css"; // Using a shared CSS file for admin pages

const API_URL = "http://localhost:5000/api";

const ManageMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [courseId, setCourseId] = useState("");
  const [courses, setCourses] = useState([]); // To populate the dropdown
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchMaterials();
    fetchCourses();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API_URL}/materials`);
      const data = await response.json();
      setMaterials(data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, fileUrl, course: courseId }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add material");

      setMessage("Material added successfully!");
      fetchMaterials();
      setTitle("");
      setFileUrl("");
      setCourseId("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        const response = await fetch(`${API_URL}/materials/${materialId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to delete material");

        setMessage("Material deleted successfully!");
        fetchMaterials();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="admin-content-container">
      <h2 className="admin-content-title">Manage Materials</h2>
      <div className="admin-form-container">
        <h3>Add New Material</h3>
        <form onSubmit={handleAddMaterial}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>File URL</label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
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
            Add Material
          </button>
        </form>
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}
      </div>
      <div className="admin-list-container">
        <h3>Existing Materials</h3>
        <ul className="admin-list">
          {materials.map((material) => (
            <li key={material._id} className="admin-list-item">
              <span>
                {material.title} (Course: {material.course?.title || "N/A"})
              </span>
              <button
                onClick={() => handleDeleteMaterial(material._id)}
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

export default ManageMaterials;
