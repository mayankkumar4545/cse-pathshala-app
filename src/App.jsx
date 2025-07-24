import React from "react";
import Hero from "./components/Hero";
import "./App.css";
import WhyChoose from "./components/WhyChoose";
import Features from "./components/Features";
import Specialty from "./components/Specialty";
import PopularCourses from "./components/PopularCourses";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="page-container">
      <Hero />
      {/* background-color: rgba(255, 236, 213, 0.7); /* #ffecd5 with 70% opacity */}
      <WhyChoose />
      <Features />
      <Specialty />
      <PopularCourses />
      <Testimonials />
      <Blogs />
      <Footer />
      {/* You can add other page sections here */}
    </div>
  );
}

export default App;
