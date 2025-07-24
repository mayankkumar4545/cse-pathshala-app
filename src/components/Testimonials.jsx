import React from "react";
import { useInView } from "react-intersection-observer";
import "./Testimonials.css"; // Make sure to use the updated CSS below

// Sample data for the testimonials
const testimonialsData = [
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=OB",
    name: "Olivia Bennett",
    role: "Grade 3 Student",
    text: "I love the science games and stories! They make learning feel like an adventure, not homework. I used to be scared to answer questions in class, but now I feel excited to share what I know. I even made my own volcano at home.",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=YK",
    name: "Yuna Kim",
    role: "Parent",
    text: "This platform is a lifesaver for working parents. I no longer feel guilty about not being able to help with homework. The lessons are interactive, the feedback is instant, and my child has become much more confident and curious.",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=S",
    name: "Stephanie",
    role: "Parent",
    text: "Before I started using this platform, I thought math was the worst subject ever. Now, the puzzles and quizzes make it feel like a fun challenge. I finally understand fractions and even help my classmates sometimes.",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=LA",
    name: "Liam Anderson",
    role: "Parent",
    text: "This platform is a lifesaver for working parents. I no longer feel guilty about not sitting with my daughter all day. The lessons are interactive, and she's become much more confident and curious. It's amazing to see her love learning again.",
  },
];

// A new component to handle the animation for each individual card
const AnimatedCard = ({ testimonial, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation re-triggers on scroll
    threshold: 0.2, // Card is 20% visible
  });

  const direction =
    index % 2 === 0 ? "animate-slide-left" : "animate-slide-right";

  return (
    <div
      ref={ref}
      className={`col-lg-6 mb-4 testimonial-card-wrapper ${
        inView ? direction : ""
      }`}
    >
      <div className="testimonial-card">
        <div className="testimonial-quote-icon">“</div>
        <div className="testimonial-header">
          <div className="avatar-container">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="testimonial-avatar"
            />
            <button className="play-icon-overlay">
              <i className="bi bi-play-fill"></i>
            </button>
          </div>
        </div>
        <div className="testimonial-body">
          <p className="testimonial-text">{testimonial.text}</p>
          <div className="testimonial-author">
            <h5 className="author-name">{testimonial.name}</h5>
            <p className="author-role">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div className="testimonials-section">
      <div className="container">
        {/* Section Header with updated, specific class names */}
        <div
          ref={headerRef}
          className={`testimonials-header-block text-center ${
            headerInView ? "animate-slide-up" : ""
          }`}
        >
          <h2 className="testimonials-title">
            Real <span className="highlight-text">Stories,</span> Real{" "}
            <span className="highlight-text"> Growth</span>
          </h2>
          <p className="testimonials-subtitle">
            See how families have transformed learning at home with our
            programs.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="row">
          {testimonialsData.map((testimonial, index) => (
            <AnimatedCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
