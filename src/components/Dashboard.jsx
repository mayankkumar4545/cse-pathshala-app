import React, { useState } from "react";
import { NavLink, Routes, Route, useNavigate, Link } from "react-router-dom";
import "./Dashboard.css";
import Videos from "./Video";
import Materials from "./Materials";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const studentId = localStorage.getItem("studentId");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/login");
  };

  const navItems = [
    { name: "Home", icon: "bi bi-house-door-fill", path: "/" },
    {
      name: "Videos",
      icon: "bi bi-camera-video-fill",
      path: "/dashboard/videos",
    },
    {
      name: "Materials",
      icon: "bi bi-file-earmark-text-fill",
      path: "/dashboard/materials",
    },
  ];

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
          {navItems.map((item) =>
            item.path.startsWith("/") ? (
              <Link to={item.path} key={item.name} className="sidebar-link">
                <i className={item.icon}></i> {item.name}
              </Link>
            ) : (
              <NavLink
                to={item.path}
                key={item.name}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                onClick={() => setIsSidebarOpen(false)}
              >
                <i className={item.icon}></i> {item.name}
              </NavLink>
            )
          )}
        </nav>
        {/* --- NEW FOOTER SECTION --- */}
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
        <Routes>
          <Route index element={<Videos />} />
          <Route path="videos" element={<Videos />} />
          <Route path="materials" element={<Materials />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
