import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import styles
import "./AdminContent.css"; // Reuse shared styles

const API_URL = "http://localhost:5000/api/blogs";

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [heroPosition, setHeroPosition] = useState("Top");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState(""); // For React Quill editor
  const [isPublic, setIsPublic] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("adminToken");

  // In a real app, you'd have a separate admin route to fetch all blogs (public or not)
  const fetchAdminBlogs = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError("Failed to fetch blogs.");
    }
  };

  useEffect(() => {
    fetchAdminBlogs();
  }, []);

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setAuthorAvatar("");
    setThumbnailUrl("");
    setHeroImageUrl("");
    setHeroPosition("Top");
    setSummary("");
    setContent("");
    setIsPublic(false);
    setIsEditing(false);
    setCurrentBlogId(null);
  };

  const handleEdit = (blog) => {
    setIsEditing(true);
    setCurrentBlogId(blog._id);
    setTitle(blog.title);
    setAuthor(blog.author);
    setAuthorAvatar(blog.authorAvatar);
    setThumbnailUrl(blog.thumbnailUrl);
    setHeroImageUrl(blog.heroImageUrl);
    setHeroPosition(blog.heroPosition);
    setSummary(blog.summary);
    setContent(blog.content);
    setIsPublic(blog.isPublic);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const blogData = {
      title,
      author,
      authorAvatar,
      thumbnailUrl,
      heroImageUrl,
      heroPosition,
      summary,
      content,
      isPublic,
    };

    const url = isEditing ? `${API_URL}/${currentBlogId}` : API_URL;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Operation failed");
      }

      setMessage(`Blog ${isEditing ? "updated" : "created"} successfully!`);
      clearForm();
      fetchAdminBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`${API_URL}/${blogId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Deletion failed");
        setMessage("Blog post deleted successfully.");
        fetchAdminBlogs();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="admin-content-container">
      <h2 className="admin-content-title">Manage Blogs</h2>

      {/* Form Section */}
      <div className="admin-form-container">
        <h3>{isEditing ? "Edit Blog Post" : "Create New Blog Post"}</h3>
        {error && <p className="admin-error-message">{error}</p>}
        {message && <p className="admin-success-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Author Avatar URL</label>
            <input
              type="text"
              value={authorAvatar}
              onChange={(e) => setAuthorAvatar(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Thumbnail URL *</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Hero Image URL *</label>
            <input
              type="text"
              value={heroImageUrl}
              onChange={(e) => setHeroImageUrl(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Hero Position</label>
            <select
              value={heroPosition}
              onChange={(e) => setHeroPosition(e.target.value)}
            >
              <option value="Top">Top</option>
              <option value="Middle">Middle</option>
              <option value="Bottom">Bottom</option>
            </select>
          </div>
          <div className="form-group">
            <label>Summary *</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Content *</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </div>
          <div className="form-group form-group-inline">
            <label htmlFor="isPublic">Make Publicly Available?</label>
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="toggle-switch-checkbox"
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="admin-form-button">
              {isEditing ? "Update Post" : "Create Post"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={clearForm}
                className="admin-form-button-secondary"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="admin-list-container">
        <h3>Existing Blog Posts</h3>
        <ul className="admin-list">
          {blogs.map((blog) => (
            <li key={blog._id} className="admin-list-item">
              <div className="item-details">
                <span className="item-title">{blog.title}</span>
                <span className="item-subtitle">
                  By {blog.author} - {blog.isPublic ? "Public" : "Draft"}
                </span>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => handleEdit(blog)}
                  className="action-btn edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageBlogs;
