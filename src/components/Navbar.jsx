import React from "react";
import { NavLink, Link } from "react-router-dom"; // 1. Import NavLink
import "./Navbar.css";

const Navbar = () => {
  // 2. We can remove useState because NavLink handles the active state for us.
  const navItems = ["Home", "About", "Services", "Contact", "Quiz", "Lab"];

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
                {/* 3. Use NavLink for automatic active class styling */}
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <div className="d-flex align-items-center auth-buttons">
            <Link to="/login" className="btn login-btn me-2">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
