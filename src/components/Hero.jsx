import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import Navbar from "./Navbar";
import "./Hero.css"; // Using the updated CSS below
import heroImage from "/assets/hero-banner.jpeg";

const Hero = () => {
  // Observer for the main content (text and image)
  const { ref: heroRef, inView: heroInView } = useInView({
    triggerOnce: false,
    threshold: 0.2, // Trigger animation when 20% is visible
  });

  // Observer for the stats section
  const { ref: statsRef, inView: statsInView } = useInView({
    triggerOnce: false,
    threshold: 0.5, // Trigger when 50% of the section is visible
  });

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div ref={heroRef} className="row align-items-center">
            {/* Left Column: Text Content */}
            <div className="col-lg-6">
              <div
                className={`hero-text-content ${
                  heroInView ? "animate-fade-in-up" : ""
                }`}
              >
                <h1 className="hero-heading">
                  Welcome to
                  <span className="highlight-text"> CSE Pathshala</span>
                </h1>
                <p className="hero-subheading">
                  Your journey to mastering Computer Science starts here
                  Unlocking the Future of Technology through Immersive learning
                  with CSE Pathshala.
                </p>
                <div className="d-flex align-items-center hero-buttons-container">
                  <button
                    className={`btn begin-learning-btn me-4 ${
                      heroInView ? "animate-fade-in-up" : ""
                    }`}
                    style={{ animationDelay: "0.2s" }}
                  >
                    Begin Learning Today <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="col-lg-6 text-center">
              <div
                className={`hero-image-container ${
                  heroInView ? "animate-fade-in-up" : ""
                }`}
              >
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
          <div ref={statsRef} className="row">
            {/* Stat Item 1 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div
                className={`stat-item ${
                  statsInView ? "animate-fade-in-up" : ""
                }`}
              >
                <div className="icon-wrapper orange-icon">
                  <i className="bi bi-motherboard"></i>
                </div>
                <div>
                  <h3 className="stat-number">
                    {statsInView ? <CountUp end={300} duration={2.5} /> : "0"}+
                  </h3>
                  <p className="stat-label">Interactive Modules</p>
                </div>
              </div>
            </div>
            {/* Stat Item 2 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div
                className={`stat-item ${
                  statsInView ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <div className="icon-wrapper yellow-icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <div>
                  <h3 className="stat-number">
                    {statsInView ? <CountUp end={12} duration={2.5} /> : "0"}+
                  </h3>
                  <p className="stat-label">Years of Expertise</p>
                </div>
              </div>
            </div>
            {/* Stat Item 3 */}
            <div className="col-md-4 d-flex justify-content-center">
              <div
                className={`stat-item ${
                  statsInView ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <div className="icon-wrapper blue-icon">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
                <div>
                  <h3 className="stat-number">
                    {statsInView ? <CountUp end={25} duration={2.5} /> : "0"}+
                  </h3>
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
