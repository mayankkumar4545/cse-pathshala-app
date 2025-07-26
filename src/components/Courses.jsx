import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom"; // Import Link for routing
import "./Courses.css"; // Using the dedicated dashboard CSS

const API_URL = "http://localhost:5000/api";

// Reusable component for each animated card
const AnimatedCourseCard = ({ course, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
          <div className="course-card-price">${course.price}</div>
        </div>
        <div className="course-card-body">
          <h5 className="course-card-title">{course.title}</h5>
          <p className="course-card-description">{course.description}</p>
          {/* --- Display New Data --- */}
          <div className="course-card-stats">
            <span>
              <i className="bi bi-clock-history"></i> {course.duration}
            </span>
            <span>
              <i className="bi bi-calendar-check"></i> Enroll by:{" "}
              {formatDate(course.enrollDate)}
            </span>
            <span>
              <i className="bi bi-calendar-event"></i> Exam:{" "}
              {formatDate(course.examDate)}
            </span>
            <span>
              <i className="bi bi-camera-video"></i>{" "}
              {course.videos?.length || 0} Videos
            </span>
          </div>
          {/* --- Functional Buttons --- */}
          <div className="course-card-buttons">
            <Link to={`/buy/${course._id}`} className="buy-now-btn">
              Buy Now
            </Link>
            <Link to={`/course/${course._id}`} className="explore-btn">
              Explore Course
            </Link>
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
