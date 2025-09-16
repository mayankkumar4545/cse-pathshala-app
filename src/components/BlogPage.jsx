// src/pages/BlogPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Editor from "../components/Editor"; // our reusable editor
import "./BlogPage.css";

const API_URL = "http://localhost:5000/api/blogs";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [draftContent, setDraftContent] = useState("");

  // Fetch blog by ID
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("Blog post not found.");
        const data = await response.json();
        setBlog(data);
        setDraftContent(data.content);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Save updated blog post
  const handleSave = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...blog, content: draftContent }),
      });

      if (!response.ok) throw new Error("Failed to save changes.");

      const updatedBlog = await response.json();
      setBlog(updatedBlog);
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Post not found.</div>;

  const sanitizedHtml = DOMPurify.sanitize(blog.content);

  return (
    <div className="blog-page-container">
      {/* Blog Header with Hero Image */}
      <div
        className="blog-page-header"
        style={{ backgroundImage: `url(${blog.heroImageUrl})` }}
      >
        <h1>{blog.title}</h1>
      </div>

      {/* Blog Content Area */}
      <div className="container blog-page-content">
        <div className="author-info">
          <img
            src={blog.authorAvatar}
            alt={blog.author}
            className="author-avatar"
          />
          <div>
            <strong>By {blog.author}</strong>
            <p>Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Toggle View / Edit */}
        {isEditing ? (
          <div className="editor-section">
            <Editor value={draftContent} onChange={setDraftContent} />
            <div className="editor-actions">
              <button onClick={handleSave} className="btn btn-primary">
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline-primary"
            >
              Edit Post
            </button>
          </div>
        )}

        <Link to="/blogs" className="back-to-blogs-link">
          ← Back to all posts
        </Link>
      </div>
    </div>
  );
};

export default BlogPage;
