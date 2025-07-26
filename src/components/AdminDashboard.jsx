import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import ManageVideos from "./ManageVideos";
import ManageMaterials from "./ManageMaterials";

const AdminDashboard = () => {
  const [activeView, setActiveView] = useState("courses"); // Default view
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
  ];

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Navigation */}
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

      {/* Main Content */}
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
