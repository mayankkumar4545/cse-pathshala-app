import React from "react";
import "./Specialty.css";

const specialtyData = [
  {
    icon: "bi bi-people-fill",
    title: "Best Tutors",
    text: "The best tutors aren’t just brainy — they get you. They know how to turn tricky topics into simple ideas, tough days into breakthroughs, and doubts into confidence. With mad subject knowledge and a vibe that keeps you hooked, our tutors aren’t here just to teach — they’re here to inspire. Whether it’s coding, cracking concepts, or chasing goals, they’ve got your back all the way.",
    color: "yellow",
  },
  {
    icon: "bi bi-mortarboard-fill",
    title: "Best Curriculum",
    text: "A killer curriculum isn’t just about books — it’s a blend of brains, balance, and bold ideas. Ours is designed to be rock-solid yet flexible, giving you the core skills you need and the freedom to explore your tech creativity. Whether you're starting with the basics or diving into advanced stuff, our content grows with you — smart, smooth, and seriously next-level.",
    color: "pink",
  },
  {
    icon: "bi bi-patch-check-fill",
    title: "Certificate",
    // MODIFICATION: Text is now an array to handle the colored span
    text: [
      `More than just paper — it's proof you’ve got the skills to think big, break barriers, and build bold solutions. Our certificates aren’t just for show — they’re earned by those who challenge norms, spark creativity, and bring real impact. Walk away not just with knowledge, but with a badge that says, "`,
      "I’m ready to innovate and lead.",
      `"`,
    ],
    color: "green",
  },
  {
    icon: "bi bi-lightbulb-fill",
    title: "Creative Thinking",
    text: "It’s not just about thinking outside the box — it’s about realizing there is no box. Creative thinking fuels innovation, unlocks bold ideas, and turns challenges into opportunities. At CSE Pathshala, we spark that mindset through hands-on learning that pushes boundaries. Whether you're solving tough problems or building the next big thing, creative thinking is your ultimate power tool — and we’re here to sharpen it.",
    color: "blue",
  },
];

const Card = ({ item, index }) => {
  return (
    <div
      className="col-lg-3 col-md-6 specialty-card-wrapper"
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="specialty-card">
        <div className={`specialty-icon-circle icon-bg-${item.color}`}>
          <i className={item.icon}></i>
        </div>
        <h3 className="specialty-card-title">{item.title}</h3>
        {/* MODIFICATION: This now handles both strings and the array format */}
        <p className="specialty-card-text">
          {Array.isArray(item.text) ? (
            <>
              {item.text[0]}
              <span style={{ color: "#f57c4a", fontWeight: "600" }}>
                {item.text[1]}
              </span>
              {item.text[2]}
            </>
          ) : (
            item.text
          )}
        </p>
      </div>
    </div>
  );
};

const Specialty = () => {
  return (
    <section className="specialty-section">
      <div className="container">
        <div className="specialty-title-container">
          <h4 className="specialty-subtitle">Not Your Regular Classroom</h4>

          <h2 className="specialty-title" style={{ animationDelay: "0.1s" }}>
            Why We’re Not Just Another Tech Stop?
          </h2>
          <h4 className="specialty-subtitle">
            Because boring classes are out, and brain-boosting, project-packed,
            mentor-fueled learning is in. We serve tech with a twist — fun,
            fearless, and future-ready.
          </h4>
        </div>

        <div className="row">
          {specialtyData.map((item, index) => (
            <Card key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialty;
