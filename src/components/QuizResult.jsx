import React from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import "./QuizResult.css";

const QuizResult = () => {
  const location = useLocation();
  const { id: quizId } = useParams(); // Get the quiz ID from the URL
  const { results, score, totalQuestions } = location.state?.results || {};

  if (!results) {
    return (
      <div className="quiz-result-container">
        <div className="result-card">
          <h2>No results found.</h2>
          <p>
            It seems you've accessed this page directly. Please attempt a quiz
            first.
          </p>
          <Link to="/quiz" className="result-action-btn">
            Go to Quiz Lobby
          </Link>
        </div>
      </div>
    );
  }

  const scorePercentage = Math.round((score / totalQuestions) * 100);
  const isPass = scorePercentage >= 50; // Example passing score

  return (
    <div className="quiz-result-container">
      <div className="result-card">
        <header className="result-header">
          <h1 className={isPass ? "pass" : "fail"}>
            {isPass ? "Congratulations!" : "Keep Practicing!"}
          </h1>
          <p>You have completed the quiz.</p>
        </header>

        <div className="score-summary">
          <div className="score-circle">
            <span className="score">{score}</span>
            <span className="total">/{totalQuestions}</span>
          </div>
          <p className="score-text">Your Score: {scorePercentage}%</p>
        </div>

        <div className="answer-review">
          <h2>Answer Review</h2>
          {results.map((item, index) => (
            <div
              key={index}
              className={`answer-item ${
                item.isCorrect ? "correct" : "incorrect"
              }`}
            >
              <div className="question-text-result">
                <i
                  className={`bi ${
                    item.isCorrect ? "bi-check-circle-fill" : "bi-x-circle-fill"
                  }`}
                ></i>
                <span>{item.questionText}</span>
              </div>
              <p>
                <strong>Your Answer:</strong>{" "}
                {item.submittedAnswer || "Not Answered"}
              </p>
              {!item.isCorrect && (
                <p className="correct-answer-text">
                  <strong>Correct Answer:</strong> {item.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="result-actions">
          <Link
            to={`/quiz/attempt/${quizId}`}
            className="result-action-btn retry"
          >
            <i className="bi bi-arrow-clockwise"></i> Retry Quiz
          </Link>
          <Link to="/quiz" className="result-action-btn lobby">
            <i className="bi bi-card-checklist"></i> Back to Lobby
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
