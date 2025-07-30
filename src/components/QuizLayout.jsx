import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import "./QuizLayout.css";

const QuizLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to close sidebar on link click, useful for mobile view
  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="quiz-layout-container">
      {/* Sidebar Navigation */}
      <aside className={`quiz-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="quiz-sidebar-header">
          <Link to="/" className="quiz-sidebar-brand" onClick={handleLinkClick}>
            CSE Pathshala Quiz
          </Link>
          <button
            className="quiz-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="quiz-sidebar-header">
          <Link
            to="/home"
            className="quiz-sidebar-brand-home"
            onClick={handleLinkClick}
          >
            <i className="bi bi-house-door-fill"></i> Home
          </Link>
          <button
            className="quiz-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <nav className="quiz-sidebar-nav">
          {/* The `end` prop ensures this link is only active on the exact path "/quiz" */}
          <NavLink
            to="/quiz"
            end
            className="quiz-nav-link"
            onClick={handleLinkClick}
          >
            <i className="bi bi-grid-1x2-fill"></i> All Quizzes
          </NavLink>
          {/* --- ACTIVATE THIS LINK --- */}
          <NavLink
            to="/quiz/my-results"
            className="quiz-nav-link"
            onClick={handleLinkClick}
          >
            <i className="bi bi-patch-check-fill"></i> My Results
          </NavLink>
          {/* --- ACTIVATE THIS LINK --- */}
          <NavLink
            to="/quiz/leaderboard"
            className="quiz-nav-link"
            onClick={handleLinkClick}
          >
            <i className="bi bi-trophy-fill"></i> Leaderboard
          </NavLink>
        </nav>
        <div className="quiz-sidebar-footer">
          <p>&copy; 2025 CSE Pathshala</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="quiz-main-content">
        <button
          className="quiz-sidebar-open-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        {/* Child routes like MyResults and Leaderboard will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
};

export default QuizLayout;
