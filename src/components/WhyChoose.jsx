import React from "react";
// import { useInView } from "react-intersection-observer"; // Animation removed
import "./WhyChoose.css";
import chooseUsImage from "/assets/hero-banner.jpeg";

// Sub-component for the header
const Header = () => {
  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="section-title-container">
          <h2 className="section-title">
            Why Choose <span className="bright-sub-head"> CSE PATHSHALA?</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

// Sub-component for the image
const Image = () => {
  return (
    <div className="col-lg-6">
      <div className="choose-us-image-wrapper">
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

// Sub-component for the text
const Text = () => {
  return (
    <div className="col-lg-6">
      <div className="choose-us-text-wrapper">
        <p>
          CSE Pathshala is not just a learning platform – it's your ultimate
          tech career launchpad. Whether you're a beginner eager to learn the
          basics of coding, preparing for competitive exams, or diving into
          advanced topics like Data Structures and Algorithms, Artificial
          Intelligence, or Web Development, we have something for everyone. Our
          curated content is designed to be student-friendly and easy to follow
          at every level.
          <br />
          At CSE Pathshala, you're not judged by marks but by what you create.
          With real-world projects, personal doubt-solving sessions, dedicated
          doubt classes, reverse assessments, and guidance from expert mentors,
          we focus not just on learning but on real progress.
          <br />
          Be part of a community where you grow, code, and build a legacy as a
          future technology leader. Choose CSE Pathshala – because your success
          in tech begins here.
        </p>
      </div>
    </div>
  );
};

const WhyChoose = () => {
  return (
    <section className="why-choose-section pt-3">
      <div className="container">
        <Header />
        <div className="row align-items-center">
          <Image />
          <Text />
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
