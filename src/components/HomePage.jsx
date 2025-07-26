import React from "react";
import Hero from "./Hero";
import WhyChoose from "./WhyChoose";
import Features from "./Features";
import Specialty from "./Specialty";
import PopularCourses from "./PopularCourses";
import Testimonials from "./Testimonials";
import Blogs from "./Blogs";

// This component simply groups all the sections of your main landing page.
const HomePage = () => {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Features />
      <Specialty />
      <PopularCourses />
      <Testimonials />
      <Blogs />
    </>
  );
};

export default HomePage;
