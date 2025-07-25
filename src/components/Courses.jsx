import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Courses.css"; // Using the dedicated dashboard CSS

const API_URL = "http://localhost:5000/api";

// Reusable component for each animated card
const AnimatedCourseCard = ({ course, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
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
        <div className="course-card-image-container">
          <img
            src={
              course.thumbnailUrl ||
              "https://placehold.co/600x400/fdeee2/333?text=Course"
            }
            alt={course.title}
            className="course-card-image"
          />
        </div>
        <div className="course-card-body">
          <h5 className="course-card-title">{course.title}</h5>
          <p className="course-card-description">{course.description}</p>
          <div className="course-card-stats">
            <span>
              <i className="bi bi-camera-video"></i>{" "}
              {course.videos?.length || 0} Videos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Courses component for the dashboard
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/courses`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="courses-dashboard-view">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`courses-header-container ${
          headerInView ? "animate-slide-up" : ""
        }`}
      >
        <h2 className="courses-title">All Available Courses</h2>
        <p className="courses-subtitle">
          Browse our full catalog of expert-led courses.
        </p>
      </div>

      {/* Course Cards Grid */}
      <div className="row">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <AnimatedCourseCard
              key={course._id}
              course={course}
              index={index}
            />
          ))
        ) : (
          <p>No courses available at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
