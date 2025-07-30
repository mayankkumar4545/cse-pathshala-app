import React from "react";
import "./PlaceholderPage.css"; // Using a shared CSS for simple pages

const Contact = () => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-content">
        <h1 className="placeholder-title">Contact Us</h1>
        <p className="placeholder-text">
          We'd love to hear from you! Whether you have a question about our
          courses, need technical support, or just want to give us some
          feedback, please don't hesitate to reach out.
        </p>
        <div className="contact-details">
          <p>
            <strong>Email:</strong> support@csepathshala.com
          </p>
          <p>
            <strong>Phone:</strong> +91 7889100907
          </p>
          <p>
            <strong>Address:</strong> Csl/16 sector 25, jvsdg market, noida
            201301
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
