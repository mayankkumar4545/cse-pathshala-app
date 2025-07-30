import React, { useState, useEffect } from "react";
import "./ManageQuizzes.css";

const API_URL = "http://localhost:5000/api/quizzes";

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableQuizId, setEditableQuizId] = useState(null);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      timer: 30,
    },
  ]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch quizzes.");
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (view === "list") {
      fetchQuizzes();
    }
  }, [view]);

  const openViewModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuiz(null);
  };

  const handleEditClick = (quiz) => {
    setIsEditMode(true);
    setEditableQuizId(quiz._id);
    setQuizTitle(quiz.title);
    const formattedQuestions = quiz.questions.map((q) => ({
      ...q,
      options: [...q.options, ...Array(4 - q.options.length).fill("")].slice(
        0,
        4
      ),
    }));
    setQuestions(formattedQuestions);
    setView("form");
  };

  const handleDeleteQuiz = async (quizId) => {
    if (
      !window.confirm("Are you sure you want to permanently delete this quiz?")
    )
      return;
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_URL}/${quizId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to delete quiz.");
      fetchQuizzes();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditableQuizId(null);
    setQuizTitle("");
    setQuestions([
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        timer: 30,
      },
    ]);
  };

  // --- REWRITTEN STATE UPDATE HANDLER (THE FIX) ---
  const handleQuestionDataChange = (qIndex, event) => {
    const { name, value } = event.target;

    // Create a deep clone of the questions array to ensure no direct mutation.
    const newQuestions = JSON.parse(JSON.stringify(questions));
    const questionToUpdate = newQuestions[qIndex];

    if (name.startsWith("option-")) {
      const optionIndex = parseInt(name.split("-")[1], 10);
      questionToUpdate.options[optionIndex] = value;
    } else {
      questionToUpdate[name] = value;
    }

    // After every change, re-validate the correct answer.
    const validOptions = questionToUpdate.options.filter(
      (opt) => opt && opt.trim() !== ""
    );
    if (
      questionToUpdate.correctAnswer &&
      !validOptions.includes(questionToUpdate.correctAnswer)
    ) {
      questionToUpdate.correctAnswer = ""; // Reset if the answer is no longer a valid option
    }

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!quizTitle.trim()) {
      setError("Quiz title is required.");
      return;
    }

    const processedQuestions = questions.map((q) => ({
      ...q,
      options: q.options.filter((opt) => opt && opt.trim() !== ""),
    }));

    for (const q of processedQuestions) {
      if (!q.questionText.trim()) {
        setError("Every question must have text.");
        return;
      }
      if (q.options.length < 2) {
        setError(`A question must have at least two non-empty options.`);
        return;
      }
      if (!q.correctAnswer) {
        setError(
          `A correct answer must be selected for the question: "${q.questionText}".`
        );
        return;
      }
    }

    setLoading(true);
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin token not found.");
      setLoading(false);
      return;
    }

    const url = isEditMode ? `${API_URL}/${editableQuizId}` : API_URL;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: quizTitle,
          questions: processedQuestions,
        }),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(
          errData.message ||
            `Failed to ${isEditMode ? "update" : "create"} quiz.`
        );
      }
      setView("list");
      resetForm();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <div className="quiz-form-container">
      <div className="quiz-form-header">
        <h2>{isEditMode ? "Edit Quiz" : "Create a New Quiz"}</h2>
        <button
          onClick={() => {
            setView("list");
            resetForm();
          }}
          className="quiz-form-back-btn"
        >
          <i className="bi bi-x-lg"></i> Cancel
        </button>
      </div>
      <form onSubmit={handleFormSubmit}>
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
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="remove-question-btn"
                >
                  <i className="bi bi-trash3-fill"></i>
                </button>
              )}
            </div>
            <div className="quiz-form-group">
              <label>Question Text</label>
              <input
                type="text"
                name="questionText"
                value={q.questionText}
                onChange={(e) => handleQuestionDataChange(qIndex, e)}
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
                    name={`option-${oIndex}`}
                    value={opt}
                    onChange={(e) => handleQuestionDataChange(qIndex, e)}
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
                  onChange={(e) => handleQuestionDataChange(qIndex, e)}
                  required
                >
                  <option value="" disabled>
                    Select a valid answer
                  </option>
                  {q.options
                    .filter((opt) => opt && opt.trim() !== "")
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
                  onChange={(e) => handleQuestionDataChange(qIndex, e)}
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
          {loading ? "Saving..." : isEditMode ? "Update Quiz" : "Create Quiz"}
        </button>
      </form>
    </div>
  );

  const renderQuizList = () => (
    <div className="quiz-list-container">
      <div className="quiz-list-header">
        <h2>Available Quizzes</h2>
        <button
          onClick={() => {
            setView("form");
            resetForm();
          }}
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
                    className="quiz-action-btn edit-btn"
                    onClick={() => handleEditClick(quiz)}
                  >
                    <i className="bi bi-pencil-fill"></i> Edit
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
      {view === "list" ? renderQuizList() : renderForm()}
      {isViewModalOpen && renderViewModal()}
    </section>
  );
};

export default ManageQuizzes;
