import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LabDashboard.css";

// Data for the sidebar navigation
const languages = [
  { name: "C", icon: "bi bi-filetype-c", langKey: "c" },
  { name: "C++", icon: "bi bi-filetype-cpp", langKey: "cpp" },
  { name: "Java", icon: "bi bi-filetype-java", langKey: "java" },
  { name: "Python", icon: "bi bi-filetype-py", langKey: "python" },
];

const LabDashboard = () => {
  const [activeLanguage, setActiveLanguage] = useState(languages[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // 1. State to track loading

  const getEditorUrl = (langKey) => {
    return `https://onecompiler.com/embed/${langKey}?theme=dark&hideNew=true&hideLanguageSelection=true`;
  };

  const handleLanguageSelect = (lang) => {
    setIsLoading(true); // 2. Set loading to true when a new language is selected
    setActiveLanguage(lang);
    setIsSidebarOpen(false);
  };

  return (
    <div className="lab-dashboard-container">
      {/* Sidebar for language selection */}
      <aside className={`lab-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="lab-sidebar-header">
          <h1 className="lab-sidebar-title">Coding Lab</h1>
          <button
            className="lab-sidebar-close-btn"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="lab-home-link-wrapper">
          <Link to="/" className="lab-home-btn">
            <i className="bi bi-house-door-fill"></i> Home
          </Link>
        </div>
        <nav className="lab-nav">
          {languages.map((lang) => (
            <button
              key={lang.name}
              className={`lab-nav-item ${
                activeLanguage.name === lang.name ? "active" : ""
              }`}
              onClick={() => handleLanguageSelect(lang)}
            >
              <i className={lang.icon}></i> {lang.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content area for the compiler */}
      <main className="lab-main-content">
        <button
          className="lab-sidebar-open-btn"
          onClick={() => setIsSidebarOpen(true)}
        >
          <i className="bi bi-list"></i>
        </button>
        <div className="compiler-wrapper">
          {/* 3. Show a loading overlay when isLoading is true */}
          {isLoading && (
            <div className="compiler-loading-overlay">
              <div className="compiler-spinner"></div>
              <p>Loading {activeLanguage.name} Compiler...</p>
            </div>
          )}
          <iframe
            key={activeLanguage.name}
            src={getEditorUrl(activeLanguage.langKey)}
            // 4. Hide the iframe while loading and fade it in when ready
            className={`compiler-iframe ${isLoading ? "loading" : "loaded"}`}
            title={`${activeLanguage.name} Compiler`}
            frameBorder="0"
            // 5. Set loading to false only after the iframe has finished loading
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </main>
    </div>
  );
};

export default LabDashboard;
