import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard"; // Import the reusable card
import "./Blogs.css";

const API_URL = "http://localhost:5000/api/blogs";

const BlogListPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllBlogs();
  }, []);

  return (
    <div
      className="container"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div className="blogs-header" style={{ marginBottom: "3rem" }}>
        <h1 className="blogs-title">All Blog Posts</h1>
        <p>Read our latest articles and insights.</p>
      </div>
      <div className="row justify-content-center">
        {loading ? (
          <p>Loading posts...</p>
        ) : blogs.length > 0 ? (
          blogs.map((post) => <BlogCard key={post._id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
