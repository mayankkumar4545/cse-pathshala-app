import React from "react";
import { useParams } from "react-router-dom";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  return (
    <div style={{ padding: "5rem", textAlign: "center" }}>
      <h1>Course Detail Page</h1>
      <p>
        Details for course with ID: <strong>{courseId}</strong>
      </p>
      <p>
        This is where you would show all the detailed information about the
        selected course.
      </p>
    </div>
  );
};

export default CourseDetailPage;
