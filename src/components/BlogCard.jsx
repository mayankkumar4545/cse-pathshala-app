import React from "react";
import { Link } from "react-router-dom";
import "./Blogs.css"; // The styles for the card are in Blogs.css

const BlogCard = ({ post }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4 d-flex align-items-stretch">
      <div className="blog-card">
        <img
          src={post.thumbnailUrl}
          alt={post.title}
          className="blog-card-image"
        />
        <div className="blog-card-body">
          <h5 className="blog-card-title">{post.title}</h5>
          <p className="blog-card-text">{post.summary}</p>
          <Link to={`/blog/${post._id}`} className="read-more-btn mt-auto">
            Read More <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
