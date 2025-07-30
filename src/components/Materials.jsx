import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./Materials.css"; // Using the new CSS file

const API_URL = "http://localhost:5000/api";

// Reusable animated item component with a bug fix
const AnimatedMaterialItem = ({ material, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // --- THIS IS THE FIX ---
  // If the material data hasn't loaded yet, don't render anything.
  if (!material) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`col-lg-4 col-md-6 mb-4 material-card-wrapper ${
        inView ? "animate-slide-up" : ""
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="material-card">
        <div className="material-icon">
          <i className="bi bi-file-earmark-text-fill"></i>
        </div>
        <div className="material-card-body">
          <h5 className="material-item-title">{material.title}</h5>
          <p className="material-item-filename">{material.fileName}</p>
        </div>
        <a
          href={`${API_URL}/materials/download/${material._id}`}
          className="material-download-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-download"></i> Download
        </a>
      </div>
    </div>
  );
};

// Main Materials component for the dashboard
const Materials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(`${API_URL}/materials`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Failed to fetch materials:", error);
      } finally {
        setLoading(false);
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

      {/* Materials Grid */}
      <div className="row">
        {loading ? (
          <p>Loading materials...</p>
        ) : materials.length > 0 ? (
          materials.map((item, index) => (
            <AnimatedMaterialItem
              key={item._id}
              material={item}
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
