import React from "react";
// import { useInView } from "react-intersection-observer"; // Animation removed
// import CountUp from "react-countup"; // Animation removed
import "./Hero.css";
import heroImage from "/assets/hero-banner.jpeg";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Column: Text Content */}
            <div className="col-lg-6">
              <div className="hero-text-content">
                <h1 className="hero-heading">
                  Welcome to
                  <span className="highlight-text"> CSE Pathshala</span>
                </h1>
                <p className="hero-subheading">
                  Your path to mastering Computer Science starts right here,
                  right now. Dive deep into the world of tech, logic, and
                  innovation as we unlock the future of technology through fun,
                  immersive, and hands-on learning. With CSE Pathshala, you're
                  not just learning — you're leveling up!
                </p>
                <div className="d-flex align-items-center hero-buttons-container">
                  <button
                    className="btn begin-learning-btn me-4"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Begin Learning Today <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-lg-6 text-center">
              <div className="hero-image-container">
                <img
                  src={heroImage}
                  alt="Young learner"
                  className="img-fluid hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section-wrapper">
        <div className="container">
          <div className="row">
            {/* Stat Item 1 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="stat-item">
                <div className="icon-wrapper orange-icon">
                  <i className="bi bi-motherboard"></i>
                </div>
                <div>
                  <h3 className="stat-number">300+</h3>
                  <p className="stat-label">Interactive Modules</p>
                </div>
              </div>
            </div>
            {/* Stat Item 2 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="stat-item" style={{ animationDelay: "0.2s" }}>
                <div className="icon-wrapper yellow-icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <div>
                  <h3 className="stat-number">12+</h3>
                  <p className="stat-label">Years of Expertise</p>
                </div>
              </div>
            </div>
            {/* Stat Item 3 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div className="stat-item" style={{ animationDelay: "0.4s" }}>
                <div className="icon-wrapper blue-icon">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <div>
                  <h3 className="stat-number">25+</h3>
                  <p className="stat-label">Trusted Educators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
