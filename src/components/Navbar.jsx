import React, { useState } from "react"; // 1. Import useState
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // 2. Add state to manage whether the navbar is collapsed or not
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navItems = ["Home", "About", "Services", "Contact", "Quiz", "Lab"];

  // This function will be called by the button and the links
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  const closeNav = () => setIsNavCollapsed(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bright-nest-navbar sticky-top">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNav}>
          <i className="bi bi-book-half me-2"></i>
          CSE Pathshala
        </Link>

        {/* 3. Update the toggler button to use the React state */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse} // Use the React state handler
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 4. Make the collapsible div's class dynamic based on state */}
        <div
          className={`collapse navbar-collapse ${
            !isNavCollapsed ? "show" : ""
          }`}
          id="navbarNav"
        >
          {/* Navigation Links */}
          <ul className="navbar-nav mx-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item}>
                <NavLink
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                  to={item === "Home" ? "/home" : `/${item.toLowerCase()}`}
                  onClick={closeNav} // 5. Add an onClick to each link to close the menu
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Login Button */}
          <div className="d-flex align-items-center auth-buttons">
            <Link to="/login" className="btn login-btn me-2" onClick={closeNav}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
