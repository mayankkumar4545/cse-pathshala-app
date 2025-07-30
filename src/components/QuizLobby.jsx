import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QuizLobby.css";

const API_URL = "http://localhost:5000/api/quizzes";

const QuizLobby = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- State for the User Details Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [participantName, setParticipantName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes. Please try again later.");
        }
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

  // Function to open the modal and store which quiz was selected
  const openModal = (quizId) => {
    setSelectedQuizId(quizId);
    setIsModalOpen(true);
  };

  // Function to close the modal and reset fields
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuizId(null);
    setParticipantName("");
    setMobileNumber("");
  };

  // Function to handle form submission from the modal
  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!participantName.trim() || !mobileNumber.trim()) {
      alert("Please enter your name and mobile number.");
      return;
    }
    // Navigate to the quiz attempt page, passing the user details in the route's state
    navigate(`/quiz/attempt/${selectedQuizId}`, {
      state: { participantName, mobileNumber },
    });
  };

  if (loading) {
    return <div className="quiz-lobby-loading">Loading Quizzes...</div>;
  }

  if (error) {
    return <div className="quiz-lobby-error">Error: {error}</div>;
  }

  return (
    <>
      <div className="quiz-lobby-container">
        <header className="quiz-lobby-header">
          <h1>Available Quizzes</h1>
          <p>Choose a quiz to test your knowledge.</p>
        </header>
        <main className="quiz-grid">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-card-lobby">
                <div className="quiz-card-content">
                  <h2 className="quiz-title">{quiz.title}</h2>
                  <p className="quiz-meta">
                    <i className="bi bi-card-checklist"></i>{" "}
                    {quiz.questions.length} Questions
                  </p>
                  <p className="quiz-meta">
                    <i className="bi bi-person-fill"></i> Created by Admin
                  </p>
                </div>
                {/* This button now opens the modal */}
                <button
                  onClick={() => openModal(quiz._id)}
                  className="start-quiz-btn"
                >
                  Start Quiz <i className="bi bi-arrow-right-circle-fill"></i>
                </button>
              </div>
            ))
          ) : (
            <p>
              No quizzes are available at the moment. Please check back later.
            </p>
          )}
        </main>
      </div>

      {/* --- User Details Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay-quiz">
          <div className="modal-content-quiz">
            <button onClick={closeModal} className="modal-close-btn-quiz">
              &times;
            </button>
            <h3>Enter Your Details</h3>
            <p>
              Please provide your details to start the quiz and save your score.
            </p>
            <form onSubmit={handleStartQuiz} className="modal-form">
              <div className="form-group-quiz">
                <label htmlFor="participantName">Full Name</label>
                <input
                  type="text"
                  id="participantName"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  required
                  placeholder="e.g., John Doe"
                />
              </div>
              <div className="form-group-quiz">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  placeholder="e.g., 9876543210"
                />
              </div>
              <button type="submit" className="modal-submit-btn">
                Proceed to Quiz
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizLobby;
