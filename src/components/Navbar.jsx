import React, { useState } from "react";
import "./Navbar.css"; // Using the updated CSS below

const Navbar = () => {
  // State to track the active navigation link
  const [activeLink, setActiveLink] = useState("Home");
  const navItems = ["Home", "About", "Services", "Contact", "Blog"];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bright-nest-navbar sticky-top">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand fw-bold" href="#">
          <i className="bi bi-book-half me-2"></i>
          CSE Pathshala
        </a>

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
                <a
                  className={`nav-link ${activeLink === item ? "active" : ""}`}
                  href="#"
                  // Set the active link on click
                  onClick={() => setActiveLink(item)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          {/* Login/Enroll Buttons */}
          <div className="d-flex align-items-center auth-buttons">
            <a href="#" className="btn login-btn me-2">
              Login
            </a>
            <a href="#" className="btn enroll-now-btn">
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
