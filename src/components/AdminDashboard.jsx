import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import ManageVideos from "./ManageVideos";
import ManageMaterials from "./ManageMaterials";
import ManageQuizzes from "./ManageQuizzes";
import ManageResults from "./ManageResults";
import ManageBlogs from "./ManageBlogs"; // 1. Import the new component

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("videos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const renderContent = () => {
    switch (activeView) {
      case "videos":
        return <ManageVideos />;
      case "materials":
        return <ManageMaterials />;
      case "quizzes":
        return <ManageQuizzes />;
      case "results":
        return <ManageResults />;
      case "blogs": // 2. Add the new case
        return <ManageBlogs />;
      default:
        return <ManageVideos />;
    }
  };

  const navItems = [
    {
      id: "home",
      icon: "bi-house-door-fill",
      label: "Home",
      isLink: true,
      path: "/",
    },
    { id: "videos", icon: "bi-camera-video-fill", label: "Manage Videos" },
    {
      id: "materials",
      icon: "bi-file-earmark-text-fill",
      label: "Manage Materials",
    },
    {
      id: "quizzes",
      icon: "bi-patch-question-fill",
      label: "Manage Quizzes",
    },
    {
      id: "results",
      icon: "bi-bar-chart-line-fill",
      label: "Manage Results",
    },
    {
      id: "blogs", // 3. Add the new navigation item
      icon: "bi-pencil-square",
      label: "Manage Blogs",
    },
  ];

  return (
    <div className="admin-dashboard-container">
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <h1 className="admin-sidebar-title">Admin Panel</h1>
          <button
            className="admin-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            ×
          </button>
        </div>
        <nav className="admin-dashboard-nav">
          {navItems.map((item) =>
            item.isLink ? (
              <Link key={item.id} to={item.path} className="admin-sidebar-link">
                <i className={`bi ${item.icon}`}></i> {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeView === item.id ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView(item.id);
                  setIsSidebarOpen(false);
                }}
              >
                <i className={`bi ${item.icon}`}></i> {item.label}
              </a>
            )
          )}
        </nav>
        <div className="admin-sidebar-footer">
          <button onClick={handleLogout} className="admin-logout-btn">
            <i className="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </aside>

      <main className="admin-dashboard-main">
        <button
          className="admin-sidebar-open-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
