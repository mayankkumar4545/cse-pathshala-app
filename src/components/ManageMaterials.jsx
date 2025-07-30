import React, { useState, useEffect } from "react";
import "./AdminContent.css"; // Using the updated shared CSS

const API_URL = "http://localhost:5000/api";

const ManageMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const adminToken = localStorage.getItem("adminToken");

  const fetchMaterials = async () => {
    try {
      const response = await fetch(`${API_URL}/materials`);
      const data = await response.json();
      setMaterials(data);
    } catch (err) {
      setError("Failed to fetch materials.");
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragEvents = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragEnter = (e) => {
    handleDragEvents(e);
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    handleDragEvents(e);
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    handleDragEvents(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!title || !file) {
      setError("Please provide a title and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("materialFile", file);

    try {
      const response = await fetch(`${API_URL}/materials`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to add material.");

      setMessage("Material added successfully!");
      setTitle("");
      setFile(null);
      document.getElementById("file-input").value = null;
      fetchMaterials();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteMaterial = async (materialId) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      try {
        const response = await fetch(`${API_URL}/materials/${materialId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (!response.ok) throw new Error("Deletion failed");
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
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}

        <form onSubmit={handleAddMaterial} className="admin-form">
          <div className="form-group">
            <label htmlFor="title">Material Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Chapter 1: Lecture Notes"
              required
            />
          </div>

          <div className="form-group">
            <label>Upload File</label>
            <div
              className={`file-drop-zone ${isDragging ? "drag-over" : ""}`}
              onDragEnter={handleDragEnter}
              onDragOver={handleDragEvents}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-input"
                onChange={handleFileChange}
                className="file-input-native"
              />
              <label htmlFor="file-input" className="file-drop-label">
                <i className="bi bi-cloud-arrow-up-fill"></i>
                <span>
                  {file
                    ? `Selected: ${file.name}`
                    : "Drag & drop a file here, or click to select"}
                </span>
              </label>
            </div>
          </div>

          <button type="submit" className="admin-form-button">
            Add Material
          </button>
        </form>
      </div>

      <div className="admin-list-container">
        <h3>Existing Materials</h3>
        <ul className="admin-list">
          {materials.map((material) => (
            <li key={material._id} className="admin-list-item">
              <i className="bi bi-file-earmark-text list-item-icon"></i>
              <div className="item-details">
                <span className="item-title">{material.title}</span>
                <span className="item-subtitle">{material.fileName}</span>
              </div>
              <div className="item-actions">
                <a
                  href={`http://localhost:5000${material.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn view-btn"
                >
                  View
                </a>
                <button
                  onClick={() => handleDeleteMaterial(material._id)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageMaterials;
