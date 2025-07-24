import React from "react";
import { useInView } from "react-intersection-observer";
import "./Specialty.css"; // Your existing CSS file is correct

// Data for the specialty cards
const specialtyData = [
  {
    icon: "bi bi-people-fill",
    title: "Best Tutors",
    text: "The best tutor is someone who can connect with their students and motivate them to achieve their goals. They have a deep understanding of the subject matter and can explain...",
    color: "yellow",
  },
  {
    icon: "bi bi-mortarboard-fill",
    title: "Best Curriculum",
    text: "The best curriculum is one that is well-designed, comprehensive, and flexible. It should provide a solid foundation of knowledge and skills, while also allowing for exploration and creativity...",
    color: "pink",
  },
  {
    icon: "bi bi-patch-check-fill",
    title: "Certificate",
    text: "Certificate programs in creative thinking can provide individuals with the knowledge and skills needed to generate innovative solutions, challenge assumptions, and drive positive...",
    color: "green",
  },
  {
    icon: "bi bi-lightbulb-fill",
    title: "Creative Thinking",
    text: "Creative thinking is an essential skill that allows individuals to generate innovative ideas, solve complex problems, and think outside of the box. Certificate programs that focus...",
    color: "blue",
  },
];

// A new, smaller component to handle the animation for each individual card
const AnimatedCard = ({ item, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation re-triggers on every scroll
    threshold: 0.2, // Animate when 20% of the card is visible
  });

  return (
    <div
      ref={ref}
      className={`col-lg-3 col-md-6 specialty-card-wrapper ${
        inView ? "animate-slide-up-right" : ""
      }`}
      style={{ animationDelay: `${0.1 * index}s` }} // Keep a slight stagger
    >
      <div className="specialty-card">
        <div className={`specialty-icon-circle icon-bg-${item.color}`}>
          <i className={item.icon}></i>
        </div>
        <h3 className="specialty-card-title">{item.title}</h3>
        <p className="specialty-card-text">{item.text}</p>
      </div>
    </div>
  );
};

const Specialty = () => {
  // A separate trigger just for the header section
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section className="specialty-section">
      <div className="container">
        {/* Main Title Container with its own animation trigger */}
        <div ref={headerRef} className="specialty-title-container">
          <h4
            className={`specialty-subtitle ${
              headerInView ? "animate-slide-down" : ""
            }`}
          >
            We Are Different
          </h4>
          <h2
            className={`specialty-title ${
              headerInView ? "animate-slide-left" : ""
            }`}
            style={{ animationDelay: "0.1s" }} // Slight delay for the main title
          >
            What Makes Us Different From Others And What Is Our Specialty?
          </h2>
        </div>

        {/* Specialty Cards Grid */}
        <div className="row">
          {specialtyData.map((item, index) => (
            // Render the new animated card component
            <AnimatedCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Specialty;
