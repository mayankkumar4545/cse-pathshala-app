import React from "react";
import "./PopularCourses.css"; // Make sure to create this CSS file

// Sample Data for Courses to match the design
const coursesData = [
  {
    image: "https://placehold.co/600x400/dff9e8/333?text=Freelance",
    bgColor: "#dff9e8", // Soft Green
    title: "Freelance Course",
    students: "1,612",
    reviews: "8,000",
    hours: "232.00",
  },
  {
    image: "https://placehold.co/600x400/fff8d6/333?text=Language",
    bgColor: "#fff8d6", // Soft Yellow
    title: "Language Course",
    students: "1,000",
    reviews: "76,000",
    hours: "3,200",
  },
  {
    image: "https://placehold.co/600x400/f3e5f5/333?text=Health",
    bgColor: "#f3e5f5", // Soft Purple
    title: "Public Health",
    students: "3,000",
    reviews: "100,000",
    hours: "3,800",
  },
  {
    image: "https://placehold.co/600x400/f3e5f5/333?text=Health",
    bgColor: "#f3e5f5", // Soft Purple
    title: "Public Health",
    students: "3,000",
    reviews: "100,000",
    hours: "3,800",
  },
  {
    image: "https://placehold.co/600x400/dff9e8/333?text=Freelance",
    bgColor: "#dff9e8", // Soft Green
    title: "Freelance Course",
    students: "1,612",
    reviews: "8,000",
    hours: "232.00",
  },
  {
    image: "https://placehold.co/600x400/fff8d6/333?text=Language",
    bgColor: "#fff8d6", // Soft Yellow
    title: "Language Course",
    students: "1,000",
    reviews: "76,000",
    hours: "3,200",
  },
];

// Reusable component for each animated card
const CourseCard = ({ course, index }) => {
  return (
    <div
      className="col-lg-4 col-md-6 mb-4 course-card-wrapper"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="popular-course-card">
        <div
          className="popular-course-image-frame"
          style={{ backgroundColor: course.bgColor }}
        >
          <img
            src={course.image}
            alt={course.title}
            className="popular-course-image"
          />
        </div>
        <div className="popular-course-body">
          <h5 className="popular-course-title">{course.title}</h5>
          <div className="popular-course-stats">
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
  return (
    <div className="popular-courses-section">
      <div className="container">
        <div className="popular-courses-header-container">
          <div className="popular-courses-subtitle">Popular Course</div>
          <h2 className="popular-courses-main-title">
            Most Popular Course On Our Website
          </h2>
        </div>
        <hr
          className="popular-header-divider"
          style={{ animationDelay: "0.1s" }}
        />

        <div className="row">
          {coursesData.map((course, index) => (
            <CourseCard key={index} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCourses;
