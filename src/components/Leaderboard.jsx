import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

const API_QUIZZES_URL = "http://localhost:5000/api/quizzes";
const API_LEADERBOARD_URL = "http://localhost:5000/api/results/leaderboard";

const Leaderboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all available quizzes on component mount
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(API_QUIZZES_URL);
        if (!response.ok) throw new Error("Could not load quizzes.");
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  // Fetch leaderboard for the selected quiz
  const fetchLeaderboard = async (quizId) => {
    setSelectedQuiz(quizzes.find((q) => q._id === quizId));
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_LEADERBOARD_URL}/${quizId}`);
      if (!response.ok) throw new Error("Could not fetch leaderboard data.");
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderQuizSelection = () => (
    <div className="quiz-selection-container">
      <header className="leaderboard-header">
        <h1>Quiz Leaderboards</h1>
        <p>Select a quiz to view the top performers.</p>
      </header>
      <div className="leaderboard-quiz-grid">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="leaderboard-quiz-card"
            onClick={() => fetchLeaderboard(quiz._id)}
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.questions.length} Questions</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaderboardTable = () => (
    <div className="leaderboard-table-container">
      <header className="leaderboard-header">
        <button
          onClick={() => setSelectedQuiz(null)}
          className="back-to-quizzes-btn"
        >
          <i className="bi bi-arrow-left"></i> Back to Quizzes
        </button>
        <h1>Leaderboard: {selectedQuiz.title}</h1>
        <p>Top 20 scores for this quiz.</p>
      </header>
      {leaderboard.length > 0 ? (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry._id}>
                <td>
                  {index === 0 && <i className="bi bi-trophy-fill gold"></i>}
                  {index === 1 && <i className="bi bi-trophy-fill silver"></i>}
                  {index === 2 && <i className="bi bi-trophy-fill bronze"></i>}
                  {index > 2 && index + 1}
                </td>
                <td>{entry.participantName}</td>
                <td>{entry.score}</td>
                <td>{entry.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-results-msg">
          No results have been recorded for this quiz yet.
        </p>
      )}
    </div>
  );

  if (loading && !selectedQuiz) {
    return <p>Loading quizzes...</p>;
  }
  if (error) {
    return <p className="results-error">{error}</p>;
  }

  return (
    <div className="leaderboard-container">
      {selectedQuiz ? renderLeaderboardTable() : renderQuizSelection()}
    </div>
  );
};

export default Leaderboard;
