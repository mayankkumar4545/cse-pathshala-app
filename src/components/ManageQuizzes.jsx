import React, { useState, useEffect } from "react";
import "./ManageQuizzes.css";

const API_URL = "http://localhost:5000/api/quizzes";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'create'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- State for the View Quiz Modal ---
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Form state for creating a new quiz
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      timer: 30,
    },
  ]);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes.");
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all quizzes when the component mounts
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // --- Handlers for View and Delete ---
  const openViewModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleDeleteQuiz = async (quizId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this quiz?")
    ) {
      return;
    }
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/${quizId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete quiz.");
      }
      // Refresh the quiz list from the server
      fetchQuizzes();
    } catch (err) {
      setError(err.message);
    }
  };

  // --- Handlers for the Quiz Creation Form ---
  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index][event.target.name] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        timer: 30,
      },
    ]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Admin token not found.");
      const payload = { title: quizTitle, questions };
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to create quiz.");
      }
      setView("list");
      fetchQuizzes(); // Refetch quizzes to show the new one
      setQuizTitle("");
      setQuestions([
        {
          questionText: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          timer: 30,
        },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Render Logic ---
  const renderCreateForm = () => (
    <div className="quiz-form-container">
      <div className="quiz-form-header">
        <h2>Create a New Quiz</h2>
        <button onClick={() => setView("list")} className="quiz-form-back-btn">
          <i className="bi bi-x-lg"></i> Cancel
        </button>
      </div>
      <form onSubmit={handleCreateQuiz}>
        <div className="quiz-form-group">
          <label htmlFor="quizTitle">Quiz Title</label>
          <input
            type="text"
            id="quizTitle"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="e.g., Introduction to JavaScript"
            required
          />
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            <div className="question-header">
              <h4>Question {qIndex + 1}</h4>
              <button
                type="button"
                onClick={() => removeQuestion(qIndex)}
                className="remove-question-btn"
              >
                <i className="bi bi-trash3-fill"></i>
              </button>
            </div>
            <div className="quiz-form-group">
              <label>Question Text</label>
              <input
                type="text"
                name="questionText"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                placeholder="e.g., What is a variable?"
                required
              />
            </div>
            <div className="options-grid">
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="quiz-form-group">
                  <label>Option {oIndex + 1}</label>
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    placeholder={`Option ${oIndex + 1}`}
                  />
                </div>
              ))}
            </div>
            <div className="question-footer">
              <div className="quiz-form-group">
                <label>Correct Answer</label>
                <select
                  name="correctAnswer"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  required
                >
                  <option value="" disabled>
                    Select the correct answer
                  </option>
                  {q.options
                    .filter((opt) => opt.trim() !== "")
                    .map((opt, oIndex) => (
                      <option key={oIndex} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              </div>
              <div className="quiz-form-group">
                <label>Timer (seconds)</label>
                <input
                  type="number"
                  name="timer"
                  value={q.timer}
                  onChange={(e) => handleQuestionChange(qIndex, e)}
                  min="5"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="add-question-btn"
        >
          <i className="bi bi-plus-circle-fill"></i> Add Another Question
        </button>
        {error && <p className="quiz-error-message">{error}</p>}
        <button type="submit" className="quiz-submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );

  const renderQuizList = () => (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <h2>Available Quizzes</h2>
        <button
          onClick={() => setView("create")}
          className="create-new-quiz-btn"
        >
          <i className="bi bi-plus-lg"></i> Create New Quiz
        </button>
      </div>
      {loading && <p>Loading quizzes...</p>}
      {error && <p className="quiz-error-message">{error}</p>}
      <div className="quizzes-grid">
        {quizzes.length > 0
          ? quizzes.map((quiz) => (
              <div key={quiz._id} className="quiz-list-item">
                <h3>{quiz.title}</h3>
                <p>{quiz.questions.length} Questions</p>
                <div className="quiz-item-actions">
                  <button
                    className="quiz-action-btn view-btn"
                    onClick={() => openViewModal(quiz)}
                  >
                    <i className="bi bi-eye-fill"></i> View
                  </button>
                  <button
                    className="quiz-action-btn delete-btn"
                    onClick={() => handleDeleteQuiz(quiz._id)}
                  >
                    <i className="bi bi-trash3-fill"></i> Delete
                  </button>
                </div>
              </div>
            ))
          : !loading && <p>No quizzes found. Create one to get started!</p>}
      </div>
    </div>
  );

  const renderViewModal = () => {
    if (!selectedQuiz) return null;
    return (
      <div className="modal-overlay-quiz">
        <div className="modal-content-quiz view-modal">
          <button onClick={closeViewModal} className="modal-close-btn-quiz">
            &times;
          </button>
          <h3>{selectedQuiz.title}</h3>
          <div className="questions-view-container">
            {selectedQuiz.questions.map((q, index) => (
              <div key={index} className="view-question-item">
                <p>
                  <strong>Q{index + 1}:</strong> {q.questionText} ({q.timer}s)
                </p>
                <ul>
                  {q.options.map((opt, i) => (
                    <li
                      key={i}
                      className={
                        opt === q.correctAnswer ? "correct-answer" : ""
                      }
                    >
                      {opt}
                      {opt === q.correctAnswer && (
                        <i className="bi bi-check-circle-fill"></i>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="manage-quizzes-section">
      {view === "list" ? renderQuizList() : renderCreateForm()}
      {isViewModalOpen && renderViewModal()}
    </section>
  );
};

export default ManageQuizzes;
