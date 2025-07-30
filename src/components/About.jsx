import React from "react";
import "./PlaceholderPage.css"; // Using a shared CSS for simple pages

const About = () => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <h1 className="placeholder-title">About CSE Pathshala</h1>
        <p className="placeholder-text">
          CSE Pathshala is an innovative online learning platform dedicated to
          providing high-quality computer science education to students
          everywhere. Our mission is to make learning accessible, engaging, and
          practical. We believe in empowering the next generation of tech
          leaders by offering a comprehensive curriculum, hands-on projects, and
          interactive coding labs.
        </p>
        <p className="placeholder-text">
          Founded by a team of passionate educators and industry professionals,
          we strive to bridge the gap between academic theory and real-world
          application. Join our community and start your journey to mastering
          computer science today!
        </p>
      </div>
    </div>
  );
};

export default About;
