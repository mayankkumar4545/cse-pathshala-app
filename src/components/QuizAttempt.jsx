import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "./QuizAttempt.css";

// Define API endpoints for clarity
const API_QUIZ_URL = "http://localhost:5000/api/quizzes";
const API_RESULT_URL = "http://localhost:5000/api/results";

const QuizAttempt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access state passed during navigation

  // --- Get user details passed from the QuizLobby modal ---
  const { participantName, mobileNumber } = location.state || {};

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Use a ref to hold the latest version of answers to prevent stale state in callbacks
  const answersRef = useRef(answers);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  // --- REWRITTEN SUBMISSION LOGIC ---
  // This function now saves the result to the database via our new API endpoint.
  const handleQuizSubmit = useCallback(async () => {
    const finalAnswers = answersRef.current;
    try {
      const response = await fetch(API_RESULT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: id,
          participantName,
          mobileNumber,
          answers: finalAnswers,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save your quiz result.");
      }

      const savedResult = await response.json();

      // Navigate to the result page with the confirmed result data from the backend
      navigate(`/quiz/result/${id}`, { state: { results: savedResult } });
    } catch (err) {
      setError(err.message);
    }
  }, [id, participantName, mobileNumber, navigate]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // If it's the last question, submit the quiz
      handleQuizSubmit();
    }
  }, [currentQuestionIndex, quiz, handleQuizSubmit]);

  useEffect(() => {
    // Security check: If user details aren't provided, redirect back to the lobby
    if (!participantName || !mobileNumber) {
      navigate("/quiz");
      return; // Stop further execution
    }

    const fetchQuiz = async () => {
      try {
        const response = await fetch(`${API_QUIZ_URL}/${id}`);
        if (!response.ok) throw new Error("Quiz not found.");
        const data = await response.json();
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id, participantName, mobileNumber, navigate]);

  // Timer logic
  useEffect(() => {
    if (currentQuestion) {
      setTimer(currentQuestion.timer);
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            goToNextQuestion(); // Move to next question when timer hits zero
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval on component unmount or question change
    }
  }, [currentQuestion, goToNextQuestion]);

  const handleAnswerSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
    // Automatically move to the next question after a short delay for better UX
    setTimeout(() => {
      goToNextQuestion();
    }, 300);
  };

  if (loading)
    return <div className="quiz-attempt-status">Loading Quiz...</div>;
  if (error) return <div className="quiz-attempt-status error">{error}</div>;
  if (!quiz || !currentQuestion)
    return <div className="quiz-attempt-status">No questions found.</div>;

  const progressPercentage =
    ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="quiz-attempt-container">
      <div className="quiz-attempt-header">
        <h2>{quiz.title}</h2>
        <div className="quiz-progress-bar">
          <div
            className="quiz-progress"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="quiz-attempt-meta">
          <span>
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
          <span className="timer">Time Left: {timer}s</span>
        </div>
      </div>

      <div className="question-area">
        <h3 className="question-text">{currentQuestion.questionText}</h3>
        <div className="options-container">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                answers[currentQuestionIndex] === option ? "selected" : ""
              }`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
