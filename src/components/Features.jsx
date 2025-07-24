import React from "react";
import { useInView } from "react-intersection-observer";
import "./Features.css"; // Your existing CSS file is correct

// Updated data for all four feature cards
const featureData = [
  {
    icon: "bi bi-person-video3",
    title: "Guest Expert Sessions",
    text: "Be motivated to learn by the best guest speakers, who are regarded as being rich in both academic and ad industry experience in the augmentation of each course.",
    color: "green",
  },
  {
    icon: "bi bi-reception-4",
    title: "Live Sessions",
    text: "Interact with our master trainers in 100% live classes, where you have the advantage to discuss in real time and with one on one instructions make your learning experience exciting. refine your knowledge through exciting debates, Q/Asessions, and practical exercises, build up partnerships and enhance learning experience.",
    color: "pink",
  },
  {
    icon: "bi bi-kanban",
    title: "Projects",
    text: "Practice what you learn in real life on real life projects, and critiques of the projects will be judged non your projects and their effects",
    color: "blue",
  },
  {
    icon: "bi bi-trophy",
    title: "Scholarship and Rewards",
    text: "Motivation and achievement shall encourage you to do your best with a 50 % grant to future courses and cash bonuses to the top 3% students.",
    color: "yellow",
  },
];

// A new, smaller component to handle the animation for each individual card
const AnimatedFeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Re-triggers animation on each scroll
    threshold: 0.2, // Animate when 20% of the card is visible
  });

  // Alternate animation direction based on card index (even/odd)
  const animationClass =
    index % 2 === 0 ? "animate-slide-left" : "animate-slide-right";

  return (
    <div
      ref={ref}
      className={`feature-card card-${feature.color} ${
        inView ? animationClass : ""
      }`}
      style={{ animationDelay: "0.1s" }} // A subtle delay for all cards
    >
      <div className={`icon-circle icon-${feature.color}`}>
        <i className={feature.icon}></i>
      </div>
      <div className="feature-content">
        <h3 className="feature-name">{feature.title}</h3>
        <p className="feature-text">{feature.text}</p>
      </div>
    </div>
  );
};

const Features = () => {
  // A separate trigger for the header section
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <section className="features-section">
      <div className="container">
        {/* Main Title with its own animation trigger */}
        <div ref={headerRef} className="features-title-container text-center">
          {/* The h2 and p tags will animate based on the headerInView state */}
          <h2
            className={`features-title ${
              headerInView ? "animate-slide-down" : ""
            }`}
          >
            Online Classes For{" "}
            <span className="highlight">Remote Learning.</span>
          </h2>
          <p
            className={`features-subtitle ${
              headerInView ? "animate-slide-left" : ""
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Experienced and Certified Trainers: Gain valuable insights from
            certified trainers with extensive experience who understand both
            academic and industry requirements.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            {featureData.map((feature, index) => (
              // Render the new animated card component for each feature
              <AnimatedFeatureCard
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
