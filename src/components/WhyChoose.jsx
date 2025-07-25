import React from "react";
import { useInView } from "react-intersection-observer";
import "./WhyChoose.css"; // Using the updated CSS below
import chooseUsImage from "/assets/hero-banner.jpeg";

// Sub-component for the animated header
const AnimatedHeader = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="row justify-content-center">
      <div className="col-lg-8">
        <div
          className={`section-title-container ${
            inView ? "animate-fade-in-up" : ""
          }`}
        >
          <h2 className="section-title">
            Why Choose <span className="bright-sub-head"> CSE PATHSHALA?</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

// Sub-component for the animated image
const AnimatedImage = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  return (
    <div ref={ref} className="col-lg-6">
      <div
        className={`choose-us-image-wrapper ${
          inView ? "animate-slide-in-left" : ""
        }`}
      >
        <img
          src={chooseUsImage}
          alt="Teacher helping a child"
          className="img-fluid choose-us-image"
        />
        <div className="sparkle"></div>
      </div>
    </div>
  );
};

// Sub-component for the animated text
const AnimatedText = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  return (
    <div ref={ref} className="col-lg-6">
      <div
        className={`choose-us-text-wrapper ${
          inView ? "animate-slide-in-right" : ""
        }`}
      >
        <p>
          CSE Pathshala is not a learning platform and it is your tech career
          launchpad. Being a learner who wants to learn the basics of coding, a
          competitive exam or those advanced topics like DSA, Artificial
          Intelligence or Web Development, we have it all for every level, and
          curated content is student friendly. <br />
          Judged by actual projects, personal doubt-breaking, special doubts
          classes, reverse assessments, and superior mentors, CSE Pathshala sets
          you not to learn but to progress. Be part of a community, grow, code,
          and leave a legacy as a creator of future technology leaders. <br />
          Select CSE Pathshala – because your success in tech begins here.
        </p>
      </div>
    </div>
  );
};

const WhyChoose = () => {
  return (
    <section className="why-choose-section pt-3">
      <div className="container">
        {/* Animated Section Title */}
        <AnimatedHeader />

        {/* Content Row */}
        <div className="row align-items-center">
          {/* Left Column: Animated Image */}
          <AnimatedImage />

          {/* Right Column: Animated Text */}
          <AnimatedText />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
