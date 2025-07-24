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
            Why Choose <span className="bright-sub-head">BrightNest?</span>
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
          BrightNest is an interactive learning platform that supports
          children's academic and emotional development. We teach core subjects
          like Math, Science, and Language Arts through engaging, fun
          activities, while also fostering creativity with art, music, writing,
          and craft. Our platform emphasizes emotional growth, helping children
          build confidence, resilience, and critical thinking skills. With
          personalized lessons, BrightNest ensures every child learns and
          thrives at their own pace.
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
