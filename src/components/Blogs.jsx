import React from "react";
import { useInView } from "react-intersection-observer";
import "./Blogs.css"; // We'll create this CSS file next

// --- Sample Data for Blog Posts ---
const blogData = [
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+1",
    title: "How Children Learn Best Through Everyday Play",
    text: "Discover how simple, playful activities help build critical thinking, creativity, and communication skills.",
  },
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+2",
    title: "Study Habits That Help Kids Stay Focused",
    text: "Build daily routines that improve focus, reduce distractions, and make learning feel more enjoyable.",
  },
  {
    image: "https://placehold.co/600x400/E0E0E0/333?text=Blog+3",
    title: "Creating a Productive Home Learning Environment",
    text: "Design a calm, engaging space at home to support focus, structure, and consistent learning.",
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
