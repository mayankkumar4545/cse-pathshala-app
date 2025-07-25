import React from "react";
import { useInView } from "react-intersection-observer";
import "./Blogs.css"; // We'll create this CSS file next

// --- Sample Data for Blog Posts ---
const blogData = [
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+1",
    title: "Mastering DSA: The Building Blocks of Every Great Developer",
    text: "Unlock the core concepts of Data Structures and Algorithms with practical examples and student-friendly tips. Learn how mastering DSA can sharpen your logic, improve your coding interviews, and open doors to top tech roles.",
  },
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+2",
    title: "How to Stay Consistent in Coding While Managing College Pressure",
    text: "Balancing academics and coding practice is tough — but doable. Discover effective strategies for time management, focused learning, and building a sustainable tech routine without burnout.",
  },
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+3",
    title: "Why Every CSE Student Should Build Real-World Projects Early",
    text: "Theory matters, but projects prove your skills. This blog explores how working on real-world applications can accelerate your growth, boost confidence, and make your resume stand out — even before you graduate.",
  },
];

// --- Individually Animated Components ---

// Animated Header
const AnimatedHeader = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });
  return (
    <div
      ref={ref}
      className={`blogs-header ${inView ? "animate-slide-up" : ""}`}
    >
      <h2 className="blogs-title">Blogs</h2>
    </div>
  );
};

// Animated Blog Card
const AnimatedBlogCard = ({ post, index }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  return (
    <div
      ref={ref}
      className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
    >
      <div
        className={`blog-card ${inView ? "animate-slide-up" : ""}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <img src={post.image} alt={post.title} className="blog-card-image" />
        <div className="blog-card-body">
          <h5 className="blog-card-title">{post.title}</h5>
          <p className="blog-card-text">{post.text}</p>
        </div>
      </div>
    </div>
  );
};

// Animated Decorative Star
const AnimatedStar = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.8 });
  return (
    <div
      ref={ref}
      className={`decorative-star ${inView ? "animate-slide-up" : ""}`}
    >
      *
    </div>
  );
};

// Animated "View All" Button
const AnimatedButton = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.8 });
  return (
    <div
      ref={ref}
      className={`text-center mt-4 ${inView ? "animate-slide-up" : ""}`}
    >
      <button className="btn view-all-btn">View All</button>
    </div>
  );
};

// --- Main Blogs Component ---
const Blogs = () => {
  return (
    <section className="blogs-section">
      <div className="container">
        {/* Animated Header */}
        <AnimatedHeader />

        {/* Blog Cards Grid */}
        <div className="row justify-content-center">
          {blogData.map((post, index) => (
            <AnimatedBlogCard key={index} post={post} index={index} />
          ))}
        </div>

        {/* Animated Decorative Star */}
        <AnimatedStar />

        {/* Animated "View All" Button */}
        <AnimatedButton />
      </div>
    </section>
  );
};

export default Blogs;
