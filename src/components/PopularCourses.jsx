import React from "react";
import { useInView } from "react-intersection-observer";
import "./PopularCourses.css"; // Make sure to use the updated CSS

// Sample Data for Courses
const coursesData = [
  {
    image: "https://placehold.co/600x400/C8E6C9/333?text=Course+1",
    title: "Freelance Course",
    students: "1,892",
    reviews: "8,000",
    hours: "230.00",
    bgColor: "#e9f7f1",
  },
  {
    image: "https://placehold.co/600x400/FFF9C4/333?text=Course+2",
    title: "Language Course",
    students: "1,000",
    reviews: "76,000",
    hours: "3,200",
    bgColor: "#fff9e6",
  },
  {
    image: "https://placehold.co/600x400/E1BEE7/333?text=Course+3",
    title: "Public Health",
    students: "3,000",
    reviews: "1,00,000",
    hours: "3,800",
    bgColor: "#f3e5f5",
  },
  {
    image: "https://placehold.co/600x400/E1BEE7/333?text=Course+4",
    title: "Public Health",
    students: "3,000",
    reviews: "1,00,000",
    hours: "3,800",
    bgColor: "#d8cbdaff",
  },
  {
    image: "https://placehold.co/600x400/C8E6C9/333?text=Course+1",
    title: "Public Health",
    students: "3,000",
    reviews: "1,00,000",
    hours: "3,800",
    bgColor: "#e9f7f1",
  },
  {
    image: "https://placehold.co/600x400/FFF9C4/333?text=Course+2",
    title: "Public Health",
    students: "3,000",
    reviews: "1,00,000",
    hours: "3,800",
    bgColor: "#fff9e6",
  },
];

// New component to handle animation for each individual card
const AnimatedCourseCard = ({ course, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`col-lg-4 col-md-6 mb-4 course-card-wrapper ${
        inView ? "animate-slide-up" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="course-card">
        <div
          className="course-card-image-container"
          style={{ backgroundColor: course.bgColor }}
        >
          <img
            src={course.image}
            alt={course.title}
            className="course-card-image"
          />
        </div>
        <div className="course-card-body">
          <h5 className="course-card-title">{course.title}</h5>
          <div className="course-card-stats">
            <span>
              <i className="bi bi-people-fill"></i> {course.students} Students
            </span>
            <span>
              <i className="bi bi-star-fill"></i> {course.reviews} Reviews
            </span>
            <span>
              <i className="bi bi-clock-fill"></i> {course.hours} Hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <div className="popular-courses-section">
      <div className="container">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`popular-courses-header-container ${
            headerInView ? "animate-slide-up" : ""
          }`}
        >
          <div className="popular-courses-subtitle">Popular Course</div>
          <h2 className="popular-courses-title">
            Most Popular Course On Our Website
          </h2>
        </div>
        <hr
          className={`header-divider ${headerInView ? "animate-slide-up" : ""}`}
          style={{ animationDelay: "0.1s" }}
        />

        {/* Course Cards Grid */}
        <div className="row">
          {coursesData.map((course, index) => (
            <AnimatedCourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCourses;
