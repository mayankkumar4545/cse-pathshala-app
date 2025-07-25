import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // 1. Import Link
import "./Login.css";

// The backend server URL
const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  // State for the main login form
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- State for the Forgot Password Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  // --- State for the form fields inside the modal ---
  const [resetStudentId, setResetStudentId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // --- Main Login Handler ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // On success, save user info and redirect
      localStorage.setItem("studentId", data.studentId);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Forgot Password Modal Handlers ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError("");
    try {
      const response = await fetch(`${API_URL}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: resetStudentId, mobileNumber }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setModalMessage(data.message);
      setModalStep(2);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setModalLoading(true);
    setModalError("");
    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: resetStudentId, otp, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setModalMessage(data.message);
      setModalStep(3);
    } catch (err) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setModalStep(1);
    setModalError("");
    setModalMessage("");
    setResetStudentId("");
    setMobileNumber("");
    setOtp("");
    setNewPassword("");
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="login-page-container">
      <div className="login-box">
        <h2 className="login-title">Student Login</h2>
        <p className="login-subtitle">
          Welcome back! Please enter your credentials.
        </p>

        {error && <p className="login-error-message">{error}</p>}
        {message && <p className="login-success-message">{message}</p>}

        <form onSubmit={handleLogin} noValidate>
          <div className="login-input-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g., 101"
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="login-submit-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 2. ADDED HOME BUTTON AND UPDATED FOOTER LAYOUT */}
        <div className="login-footer-actions">
          <Link to="/" className="home-link-button">
            <i className="bi bi-arrow-left"></i> Back to Home
          </Link>
          <button onClick={openModal} className="forgot-password-button">
            Forgot Password?
          </button>
        </div>
      </div>

      {/* --- Forgot Password Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close-button">
              &times;
            </button>

            {/* Step 1: Enter Student ID and Mobile */}
            {modalStep === 1 && (
              <form onSubmit={handleSendOtp}>
                <h3 className="modal-title">Reset Password</h3>
                <p className="modal-subtitle">
                  Enter your details to receive an OTP.
                </p>
                {modalError && <p className="modal-error">{modalError}</p>}
                <div className="login-input-group">
                  <label htmlFor="resetStudentId">Student ID</label>
                  <input
                    type="text"
                    id="resetStudentId"
                    value={resetStudentId}
                    onChange={(e) => setResetStudentId(e.target.value)}
                    required
                  />
                </div>
                <div className="login-input-group">
                  <label htmlFor="mobileNumber">Registered Mobile Number</label>
                  <input
                    type="tel"
                    id="mobileNumber"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="login-submit-button"
                  disabled={modalLoading}
                >
                  {modalLoading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* Step 2: Enter OTP and New Password */}
            {modalStep === 2 && (
              <form onSubmit={handleResetPassword}>
                <h3 className="modal-title">Verify OTP</h3>
                {modalMessage && (
                  <p className="modal-success">{modalMessage}</p>
                )}
                {modalError && <p className="modal-error">{modalError}</p>}
                <div className="login-input-group">
                  <label htmlFor="otp">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <div className="login-input-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="login-submit-button"
                  disabled={modalLoading}
                >
                  {modalLoading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* Step 3: Success Message */}
            {modalStep === 3 && (
              <div>
                <h3 className="modal-title">Success!</h3>
                <p className="modal-success">{modalMessage}</p>
                <button onClick={closeModal} className="login-submit-button">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
