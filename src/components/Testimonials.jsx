import React from "react";
import "./Testimonials.css"; // Make sure to use the updated CSS below

// Sample data for the testimonials
const testimonialsData = [
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=OB",
    name: "Ankit Sharma",
    role: "B.Tech CSE 3rd year",
    text: "I have joined CSE Pathshala to develop my Data Structures and Algorithms and it was the correct choice of my academic life. The explanations are as crystal-clear as one can ever get, and the mentors are genuinely concerned with the way you progress. I aced my dream internship at Amazon, and all this with the help of structured learning path!",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=YK",
    name: "Mehak Arora",
    role: "2nd Year Student, Tier-3 College",
    text: "When I came to a less-known college, I always felt a step backward. CSE Pathshala had altered the situation. Live sessions, weekly challenges and one-on-one mentor support made me have the confidence to take part in national level hackathons. It actually brought quality tech ed to a person like me.",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=S",
    name: " Raj Patel ",
    role: "an aspiring Full Stack Developer",
    text: "I did not have any background when I joined their Full Stack Web Development course. Now I have full-fledged projects, my own site deployed, and I am even engaged in freelancing. All the difference was the practical action and real-world orientation.",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=LA",
    name: "Shruti Nair ",
    role: "GATE CS Aspirant",
    text: "I felt very daunting preparing to take GATE until I discovered CSE Pathshala. They have gold courses on GATE. The simulated tests, small theory notes and clarification of doubts are incomparable. And then I could never imagine that online prep can become so intimate and productive!",
  },
  {
    avatar: "https://placehold.co/100x100/EFEFEF/333?text=LA",
    name: "Vivek Raj",
    role: "Career Switcher (Mechanical Engineer to Software developer)",
    text: "I have spent 2 years working in an organisation in a non-technological position but choose to move to software. CSE pathshala did not only teach coding, they trained to think like a programmer. They provided mentorship to me in careers, and now I work as a junior developer at a startup that I look up to.",
  },
];

// A new component to handle the animation for each individual card
const Card = ({ testimonial, index }) => {
  return (
    <div className="col-lg-6 mb-4 testimonial-card-wrapper">
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
  return (
    <div className="testimonials-section">
      <div className="container">
        <div className="testimonials-header-block text-center">
          <h2 className="testimonials-title">
            Real <span className="highlight-text">Stories,</span> Real{" "}
            <span className="highlight-text"> Growth</span>
          </h2>
          <p className="testimonials-subtitle">
            See how families have transformed learning at home with our
            programs.
          </p>
        </div>

        <div className="row">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
