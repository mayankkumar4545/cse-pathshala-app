import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link
import "./Dashboard.css";
import Videos from "./Video";
import Courses from "./Courses"; // Use the correct Courses component for the dashboard

const Dashboard = () => {
  const [activeView, setActiveView] = useState("courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeView) {
      case "courses":
        return <Courses />; // Use the dashboard-specific Courses component

      case "videos":
        return <Videos />;

      default:
        return <Courses />; // Default to the dashboard courses view
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar Navigation */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Cse Pathshala</h1>
          <button
            className="sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav className="dashboard-nav">
          {/* --- NEW HOME BUTTON --- */}
          <Link to="/" className="sidebar-link">
            <i className="bi bi-house-door-fill"></i> Home
          </Link>

          <a
            href="#courses"
            className={activeView === "courses" ? "active" : "sidebar-link"}
            onClick={() => {
              setActiveView("courses");
              setIsSidebarOpen(false);
            }}
          >
            <i className="bi bi-journal-bookmark-fill"></i> Courses
          </a>
          <a
            href="#videos"
            className={activeView === "videos" ? "active" : "sidebar-link"}
            onClick={() => {
              setActiveView("videos");
              setIsSidebarOpen(false);
            }}
          >
            <i className="bi bi-camera-video-fill"></i> Videos
          </a>
        </nav>
        <div className="sidebar-footer">
          <div className="user-info">
            Welcome, <strong>{studentId || "Student"}</strong>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        <button
          className="sidebar-open-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
