import React, { useState, useEffect } from "react";
import "./ManageQuizzes.css";

const API_URL = "http://localhost:5000/api/quizzes";

// A fresh, empty question structure
const createNewQuestion = () => ({
  questionText: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  timer: 30,
});

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [view, setView] = useState("list");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --- REFACTORED STATE: Form data is now completely isolated ---
  const [formState, setFormState] = useState({
    id: null, // Will hold the quiz ID when editing
    title: "",
    questions: [createNewQuestion()],
  });

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

  // --- FORM MANAGEMENT ---
  const handleCreateClick = () => {
    setError("");
    setFormState({
      id: null,
      title: "",
      questions: [createNewQuestion()],
    });
    setView("form");
  };

  const handleEditClick = (quiz) => {
    setError("");
    const formattedQuestions = quiz.questions.map((q) => ({
      ...q,
      options: [...q.options, ...Array(4 - q.options.length).fill("")].slice(
        0,
        4
      ),
    }));
    setFormState({
      id: quiz._id,
      title: quiz.title,
      questions: formattedQuestions,
    });
    setView("form");
  };

  const handleCancelForm = () => {
    setError("");
    setView("list");
  };

  // --- THE DEFINITIVE FIX: A single, robust handler for all form changes ---
  const handleFormChange = (qIndex, field, value) => {
    setFormState((prevState) => {
      // Create a deep copy to ensure immutability
      const newQuestions = JSON.parse(JSON.stringify(prevState.questions));
      const questionToUpdate = newQuestions[qIndex];

      if (field.startsWith("option-")) {
        const optionIndex = parseInt(field.split("-")[1], 10);
        questionToUpdate.options[optionIndex] = value;
      } else {
        questionToUpdate[field] = value;
      }

      // After every single change, re-validate the correct answer
      const validOptions = questionToUpdate.options.filter(
        (opt) => opt && opt.trim() !== ""
      );
      if (
        questionToUpdate.correctAnswer &&
        !validOptions.includes(questionToUpdate.correctAnswer)
      ) {
        questionToUpdate.correctAnswer = ""; // This is the key fix
      }

      return { ...prevState, questions: newQuestions };
    });
  };

  const addQuestion = () => {
    setFormState((prevState) => ({
      ...prevState,
      questions: [...prevState.questions, createNewQuestion()],
    }));
  };

  const removeQuestion = (qIndex) => {
    setFormState((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((_, index) => index !== qIndex),
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formState.title.trim()) {
      setError("Quiz title is required.");
      return;
    }

    const processedQuestions = formState.questions.map((q) => ({
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
    const isEditMode = !!formState.id;
    const url = isEditMode ? `${API_URL}/${formState.id}` : API_URL;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formState.title,
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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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

  const openViewModal = (quiz) => {
    setSelectedQuiz(quiz);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedQuiz(null);
  };

  // --- RENDER LOGIC ---
  if (view === "form") {
    return (
      <div className="quiz-form-container">
        <div className="quiz-form-header">
          <h2>{formState.id ? "Edit Quiz" : "Create a New Quiz"}</h2>
          <button onClick={handleCancelForm} className="quiz-form-back-btn">
            <i className="bi bi-x-lg"></i> Cancel
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="quiz-form-group">
            <label htmlFor="quizTitle">Quiz Title</label>
            <input
              type="text"
              id="quizTitle"
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              placeholder="e.g., Introduction to JavaScript"
              required
            />
          </div>
          {formState.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-card">
              <div className="question-header">
                <h4>Question {qIndex + 1}</h4>
                {formState.questions.length > 1 && (
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
                  value={q.questionText}
                  onChange={(e) =>
                    handleFormChange(qIndex, "questionText", e.target.value)
                  }
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
                      onChange={(e) =>
                        handleFormChange(
                          qIndex,
                          `option-${oIndex}`,
                          e.target.value
                        )
                      }
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div className="question-footer">
                <div className="quiz-form-group">
                  <label>Correct Answer</label>
                  <select
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleFormChange(qIndex, "correctAnswer", e.target.value)
                    }
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
                    value={q.timer}
                    onChange={(e) =>
                      handleFormChange(qIndex, "timer", e.target.value)
                    }
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
            {loading
              ? "Saving..."
              : formState.id
              ? "Update Quiz"
              : "Create Quiz"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className="manage-quizzes-section">
      <div className="quiz-list-container">
        <div className="quiz-list-header">
          <h2>Available Quizzes</h2>
          <button onClick={handleCreateClick} className="create-new-quiz-btn">
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
      {isViewModalOpen && (
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
      )}
    </section>
  );
};

export default ManageQuizzes;
