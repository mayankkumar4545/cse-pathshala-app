import React, { useState } from "react";
import "./MyResults.css";

const API_URL = "http://localhost:5000/api/results/my-results";

const MyResults = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // To know if a search has been attempted

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      setError("Please enter a mobile number.");
      return;
    }
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const response = await fetch(`${API_URL}/${mobileNumber}`);
      if (!response.ok) {
        throw new Error(
          "Could not fetch results. Please check the mobile number and try again."
        );
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]); // Clear previous results on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-results-container">
      <header className="my-results-header">
        <h1>My Quiz History</h1>
        <p>Enter your mobile number to see all your past quiz attempts.</p>
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <i className="bi bi-phone-fill"></i>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="Enter your registered mobile number"
            className="search-input"
          />
        </div>
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "Searching..." : "Find My Results"}
        </button>
      </form>

      {error && <p className="results-error">{error}</p>}

      <div className="results-list">
        {/* Show this message only after a search has been made and no results were found */}
        {searched && !loading && results.length === 0 && (
          <div className="no-results-msg">
            <i className="bi bi-emoji-frown"></i>
            <p>No results found for this mobile number.</p>
          </div>
        )}
        {results.map((result) => (
          <div key={result._id} className="result-item-card">
            <div className="result-card-header">
              <h3>{result.quizTitle}</h3>
              <span
                className={`score-badge ${
                  result.percentage >= 50 ? "pass" : "fail"
                }`}
              >
                {result.percentage}%
              </span>
            </div>
            <div className="result-card-body">
              <p>
                <strong>Score:</strong> {result.score} / {result.totalQuestions}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(result.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResults;
