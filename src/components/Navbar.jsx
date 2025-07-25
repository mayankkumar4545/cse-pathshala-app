import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Using the updated CSS below

const Navbar = () => {
  // State to track the active navigation link
  const [activeLink, setActiveLink] = useState("Home");
  const navItems = ["Home", "About", "Services", "Contact", "Blog"];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bright-nest-navbar sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-book-half me-2"></i>
          CSE Pathshala
        </Link>

        {/* Responsive Toggler Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links and Buttons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  className={`nav-link ${activeLink === item ? "active" : ""}`}
                  to="/navItems"
                  // Set the active link on click
                  onClick={() => setActiveLink(item)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>

          {/* Login/Enroll Buttons */}
          <div className="d-flex align-items-center auth-buttons">
            <Link to="/login" className="btn login-btn me-2">
              Login
            </Link>
            <Link to="/enroll" className="btn enroll-now-btn">
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
