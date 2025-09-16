import React from "react";
import "./Features.css"; // Your existing CSS file is correct

// Updated data for all four feature cards
const featureData = [
  {
    icon: "bi bi-person-video3",
    title: "Guest Expert Sessions",
    text: "Get pumped to learn from the best in the biz! Our guest speakers aren’t just book-smart – they’ve got the street cred too, with serious experience in both academia and the ad industry. Every session is packed with real talk, fresh insights, and that extra spark to level up each course like a pro.",
    color: "green",
  },
  {
    icon: "bi bi-reception-4",
    title: "Live Sessions",
    text: "Say goodbye to boring pre-recorded lectures! Dive into 100% live classes with our master trainers, where real-time interaction keeps things buzzing. Ask questions, get instant feedback, and enjoy one-on-one guidance that makes learning anything but dull. Sharpen your skills through fun debates, lively Q&A sessions, and hands-on exercises. Plus, connect with fellow learners, build cool collaborations, and turn every session into an exciting learning adventure.",
    color: "pink",
  },
  {
    icon: "bi bi-kanban",
    title: "Projects",
    text: "Time to turn theory into action! Apply what you learn on real-life projects that mirror real-world challenges. No boring exams here — your skills will be judged based on what you build, how it works, and the impact it creates. Get ready for hands-on experience, honest feedback, and the thrill of creating something that actually matters.",
    color: "blue",
  },
  {
    icon: "bi bi-trophy",
    title: "Scholarship and Rewards",
    // MODIFICATION: The text is now an array to handle the colored span
    text: [
      "Hard work pays off — literally! To keep you hustling, we offer a 50% grant on future courses and exciting cash bonuses for the top 3% performers. It’s our way of saying, “",
      "You crushed it!",
      "”  So stay motivated, aim high, and let your achievements unlock some serious rewards.",
    ],
    color: "yellow",
  },
];

const FeatureCard = ({ feature, index }) => {
  return (
    <div
      className={`feature-card card-${feature.color}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className={`icon-circle icon-${feature.color}`}>
        <i className={feature.icon}></i>
      </div>
      <div className="feature-content">
        <h3 className="feature-name">{feature.title}</h3>
        {/* MODIFICATION: This now handles both strings and the array format */}
        <p className="feature-text">
          {Array.isArray(feature.text) ? (
            <>
              {feature.text[0]}
              <span style={{ color: "#f57c4a", fontWeight: "600" }}>
                {feature.text[1]}
              </span>
              {feature.text[2]}
            </>
          ) : (
            feature.text
          )}
        </p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="features-title-container text-center">
          <h2 className="features-title">
            Online Classes For{" "}
            <span className="highlight">Remote Learning.</span>
          </h2>
          <p className="features-subtitle" style={{ animationDelay: "0.2s" }}>
            Experienced and Certified Trainers: Gain valuable insights from
            certified trainers with extensive experience who understand both
            academic and industry requirements.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-9">
            {featureData.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
