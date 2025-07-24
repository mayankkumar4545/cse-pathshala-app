import React from "react";
import "./Footer.css"; // We'll create this CSS file next

const footerData = {
  columns: [
    {
      title: "Educational",
      links: ["Copyright@2023 Ratul"],
    },
    {
      title: "About",
      links: ["Contact Us", "About Us"],
    },
    {
      title: "Quick Link",
      links: ["Facebook", "Twitter", "Instagram", "Linkedin", "Pinterest"],
    },
    {
      title: "Our Service",
      links: [
        "Freelancing Courses",
        "Language Courses",
        "Skills & IT Courses",
        "Creative Courses",
      ],
    },
    {
      title: "Company",
      links: ["Coursera", "Udemy", "Duolingo", "Skillshare"],
    },
    {
      title: "Policy",
      links: ["Return Policy", "Terms & Condition"],
    },
  ],
};

const Footer = () => {
  return (
    <footer className="footer-section mt-0">
      <div className="container">
        <div className="row footer-main-content">
          {footerData.columns.map((column, index) => (
            <div className="col-lg-2 col-md-4 col-6 mb-4" key={index}>
              <h5 className="footer-title">{column.title}</h5>
              <ul className="footer-links">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
