import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Materials.css"; // We will create this CSS file next

const API_URL = "http://localhost:5000/api";

// Reusable component for each animated material item
const AnimatedMaterialItem = ({ material, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`material-item-wrapper ${inView ? "animate-slide-up" : ""}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="material-item">
        <div className="material-icon">
          <i className="bi bi-file-earmark-arrow-down-fill"></i>
        </div>
        <div className="material-details">
          <h4 className="material-title">{material.title}</h4>
          <p className="material-description">{material.description}</p>
          <span className="material-course-tag">
            Course: {material.course.title}
          </span>
        </div>
        <a
          href={material.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="material-download-btn"
          download
        >
          <i className="bi bi-download"></i> Download
        </a>
      </div>
    </div>
  );
};

const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_URL}/materials`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      }
    };
    fetchMaterials();
  }, []);

  return (
    <div className="materials-dashboard-view">
      {/* Section Header */}
      <div
        ref={headerRef}
        className={`materials-header-container ${
          headerInView ? "animate-slide-up" : ""
        }`}
      >
        <h2 className="materials-title">Downloadable Materials</h2>
        <p className="materials-subtitle">
          Access lecture notes, project files, and other resources.
        </p>
      </div>

      {/* Materials List */}
      <div className="materials-list">
        {materials.length > 0 ? (
          materials.map((material, index) => (
            <AnimatedMaterialItem
              key={material._id}
              material={material}
              index={index}
            />
          ))
        ) : (
          <p>No materials available at the moment. Please check back later.</p>
        )}
      </div>
    </div>
  );
};

export default Materials;
