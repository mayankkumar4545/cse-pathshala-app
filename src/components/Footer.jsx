import React from "react";
import "./Footer.css"; // We'll create this CSS file next

const footerData = {
  columns: [
    {
      title: "Cse Pathshala",
      links: [
        "Your Journey to mastering Computer Science starts here. Join our community of learners and excel in your career.",
      ],
    },
    {
      title: "About",
      links: ["Contact Us", "About Us"],
    },
    {
      title: "Quick Link",
      links: ["Facebook", "Twitter", "Instagram", "Linkedin"],
    },
    {
      title: "Resources",
      links: ["Student Reviews", "FAQ", "Blog"],
    },
    {
      title: "Contact Us",
      links: [
        "Email: support@csepathshala.com",
        "Calling: 7889100907",
        "WhatsApp: +91 7889153352",
        "Address: Csl/16 sector 25 jvsas market noida 201301",
      ],
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
