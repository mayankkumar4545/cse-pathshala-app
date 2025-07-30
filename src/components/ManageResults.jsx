import React, { useState, useEffect } from "react";
import "./ManageResults.css";

const API_URL = "http://localhost:5000/api/results";

const ManageResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResults = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch results.");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleDelete = async (resultId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this result? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/${resultId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the result.");
      }
      // Refresh the list after successful deletion
      fetchResults();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <p>Loading results...</p>;
  }

  if (error) {
    return <p className="results-error">{error}</p>;
  }

  return (
    <div className="manage-results-container">
      <header className="manage-results-header">
        <h1>Manage Quiz Results</h1>
        <p>View and manage all participant quiz submissions.</p>
      </header>
      <div className="results-table-wrapper">
        <table className="results-table">
          <thead>
            <tr>
              <th>Participant Name</th>
              <th>Mobile Number</th>
              <th>Quiz Title</th>
              <th>Score</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result) => (
                <tr key={result._id}>
                  <td>{result.participantName}</td>
                  <td>{result.mobileNumber}</td>
                  <td>{result.quizTitle}</td>
                  <td>
                    {result.score}/{result.totalQuestions} ({result.percentage}
                    %)
                  </td>
                  <td>{new Date(result.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(result._id)}
                      className="delete-result-btn"
                    >
                      <i className="bi bi-trash3-fill"></i> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No results found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageResults;
