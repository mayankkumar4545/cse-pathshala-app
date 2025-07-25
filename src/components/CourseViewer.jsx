import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api";

const CourseViewer = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        const data = await response.json();
        setCourses(data);
        // If courses are found, automatically select the first one
        if (data && data.length > 0) {
          handleCourseSelect(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  const handleCourseSelect = async (courseId) => {
    try {
      const response = await fetch(`${API_URL}/courses/${courseId}`);
      const data = await response.json();
      setSelectedCourse(data);
      if (data.videos && data.videos.length > 0) {
        setSelectedVideo(data.videos[0]);
      }
    } catch (error) {
      console.error("Failed to fetch course details:", error);
    }
  };

  if (!selectedCourse) {
    return (
      <div className="dashboard-welcome">
        <h2>Welcome to your Dashboard!</h2>
        <p>Loading your courses...</p>
      </div>
    );
  }

  return (
    <>
      <div className="video-player-wrapper">
        {selectedVideo && (
          <iframe
            src={selectedVideo.videoUrl}
            title={selectedVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div className="video-details">
        <h2 className="video-title">{selectedVideo?.title}</h2>
        <p className="course-description">{selectedCourse.description}</p>
      </div>
      <div className="playlist-wrapper">
        <h3 className="playlist-title">
          Course Playlist ({selectedCourse.videos.length})
        </h3>
        <ul className="playlist">
          {selectedCourse.videos.map((video) => (
            <li
              key={video._id}
              className={`playlist-item ${
                selectedVideo?._id === video._id ? "active" : ""
              }`}
              onClick={() => setSelectedVideo(video)}
            >
              <i className="bi bi-play-circle-fill"></i>
              <span className="playlist-video-title">{video.title}</span>
              <span className="playlist-video-duration">{video.duration}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CourseViewer;
