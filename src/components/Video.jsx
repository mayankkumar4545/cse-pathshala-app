import React, { useState, useEffect } from "react";
import "./Videos.css";

const API_URL = "http://localhost:5000/api";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${API_URL}/videos`);
        if (!response.ok) {
          throw new Error("Failed to fetch videos.");
        }
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getThumbnailFromUrl = (url) => {
    let videoId;
    try {
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1].split("?")[0];
      } else {
        videoId = new URL(url).searchParams.get("v");
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    } catch (e) {
      // Fallback for invalid URLs
    }
    return "https://placehold.co/600x400/fdeee2/333?text=Video";
  };

  if (loading) {
    return <div className="loading-message">Loading videos...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="videos-page-container">
      <h2 className="videos-page-title">All Available Videos</h2>
      <p className="videos-page-subtitle">
        Browse our full catalog of video lessons.
      </p>

      <div className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video._id}
              className="video-card"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="video-card-thumbnail-wrapper">
                <img
                  src={getThumbnailFromUrl(video.videoUrl)}
                  alt={video.title}
                  className="video-card-thumbnail"
                />
                <div className="play-icon-overlay">
                  <i className="bi bi-play-circle-fill"></i>
                </div>
              </div>
              <div className="video-card-body">
                <h3 className="video-card-title">{video.title}</h3>
                <p className="video-card-duration">
                  <i className="bi bi-clock"></i> {video.duration}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos have been added yet. Please check back later.</p>
        )}
      </div>

      {selectedVideo && (
        <div className="modal-overlay" onClick={() => setSelectedVideo(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-button"
              onClick={() => setSelectedVideo(null)}
            >
              &times;
            </button>
            <div className="video-player-wrapper">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="modal-video-title">{selectedVideo.title}</h3>
            <p className="modal-video-description">
              {selectedVideo.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
