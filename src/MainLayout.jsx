import React from "react";
import WhyChoose from "./components/WhyChoose";
import Features from "./components/Features";
import Specialty from "./components/Specialty";
import PopularCourses from "./components/PopularCourses";
import Testimonials from "./components/Testimonials";
import Blogs from "./components/Blogs";
import Hero from "./components/Hero";

const MainLayout = () => {
  return (
    <>
      <Hero />
      <WhyChoose />
      <Features />
      <Specialty />
      <PopularCourses />
      <Testimonials />
      <Blogs />
      {/*<Footer />*/}
    </>
  );
};

export default MainLayout;
