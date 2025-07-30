import React, { useState, useEffect } from "react";
import "./ManageVideo.css"; // Using the new dedicated stylesheet

const API_URL = "http://localhost:5000/api";

const ManageVideos = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState("youtube"); // 'youtube' or 'upload'
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const adminToken = localStorage.getItem("adminToken");

  // ... (fetchVideos, handleFileChange, handleUrlChange, handleAddVideo, handleDeleteVideo functions are the same)
  const fetchVideos = async () => {
    try {
      const response = await fetch(`${API_URL}/videos`);
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError("Failed to fetch videos.");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setVideoUrl("");
  };

  const handleUrlChange = (e) => {
    setVideoUrl(e.target.value);
    setFile(null);
    if (document.getElementById("videoFile")) {
      document.getElementById("videoFile").value = null;
    }
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("duration", duration);
    formData.append("sourceType", uploadType);

    if (uploadType === "upload" && file) {
      formData.append("videoFile", file);
    } else if (uploadType === "youtube" && videoUrl) {
      formData.append("videoUrl", videoUrl);
    } else {
      setError("Please provide a video source.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/videos`, {
        method: "POST",
        headers: { Authorization: `Bearer ${adminToken}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add video.");

      setMessage("Video added successfully!");
      setTitle("");
      setVideoUrl("");
      setDuration("");
      setDescription("");
      setFile(null);
      if (document.getElementById("videoFile")) {
        document.getElementById("videoFile").value = null;
      }
      fetchVideos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteVideo = async (videoId) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        const response = await fetch(`${API_URL}/videos/${videoId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        if (!response.ok) throw new Error("Deletion failed");
        setMessage("Video deleted successfully!");
        fetchVideos();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="admin-content-container">
      <h2 className="admin-content-title">Manage Videos</h2>

      <div className="admin-form-container">
        <h3 className="admin-form-title">Create New Video</h3>
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}

        <form onSubmit={handleAddVideo} className="admin-form">
          <div className="form-group">
            <label>Video Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Video Source</label>
            <div className="toggle-switch">
              <button
                type="button"
                className={uploadType === "youtube" ? "active" : ""}
                onClick={() => setUploadType("youtube")}
              >
                YouTube URL
              </button>
              <button
                type="button"
                className={uploadType === "upload" ? "active" : ""}
                onClick={() => setUploadType("upload")}
              >
                Upload File
              </button>
            </div>
          </div>

          {uploadType === "youtube" ? (
            <div className="form-group">
              <label htmlFor="videoUrl">YouTube Embed URL</label>
              <input
                id="videoUrl"
                type="text"
                value={videoUrl}
                onChange={handleUrlChange}
                placeholder="https://www.youtube.com/embed/your_video_id"
                required={uploadType === "youtube"}
                disabled={!!file}
              />
            </div>
          ) : (
            <div className="form-group">
              <label htmlFor="videoFile">Upload Video File</label>
              <input
                id="videoFile"
                type="file"
                onChange={handleFileChange}
                accept="video/*"
                required={uploadType === "upload"}
                disabled={!!videoUrl}
              />
            </div>
          )}

          <div className="form-row">
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
              <label>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="admin-form-button">
            Create Video
          </button>
        </form>
      </div>

      <div className="admin-list-container">
        <h3 className="admin-list-title">Existing Videos</h3>
        <ul className="admin-list">
          {videos.map((video) => (
            <li key={video._id} className="admin-list-item">
              <i className="bi bi-camera-video list-item-icon"></i>
              <div className="item-details">
                <span className="item-title">{video.title}</span>
                <span className="item-subtitle">
                  Duration: {video.duration}
                </span>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleDeleteVideo(video._id)}
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

export default ManageVideos;
