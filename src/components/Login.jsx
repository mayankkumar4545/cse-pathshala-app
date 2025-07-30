import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import loginImage from "/assets/hero-banner.jpeg"; // Make sure you have an image at this path

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  // State for the login form
  const [userType, setUserType] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- State for the Forgot Password Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [resetStudentId, setResetStudentId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginUrl =
      userType === "admin" ? `${API_URL}/admin/login` : `${API_URL}/login`;
    const payload =
      userType === "admin"
        ? { email: identifier, password }
        : { studentId: identifier, password };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      if (userType === "admin") {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      } else {
        localStorage.setItem("studentId", data.studentId);
        window.open("/dashboard", "_blank");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="login-page-wrapper">
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* Left Column: Image */}
          <div className="col-lg-7 d-none d-lg-block p-0">
            <div
              className="login-image-side"
              style={{ backgroundImage: `url(${loginImage})` }}
            >
              <div className="login-image-overlay">
                <h2 className="login-image-title">CSE Pathshala</h2>
                <p className="login-image-subtitle">
                  Your journey to mastering Computer Science starts here.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="col-lg-5 login-form-side">
            <div className="login-form-container">
              <h2 className="login-form-main-title">
                {userType === "student" ? "Student Login" : "Admin Login"}
              </h2>

              <div className="login-toggle-buttons">
                <button
                  className={`toggle-btn ${
                    userType === "student" ? "active" : ""
                  }`}
                  onClick={() => setUserType("student")}
                >
                  Student
                </button>
                <button
                  className={`toggle-btn ${
                    userType === "admin" ? "active" : ""
                  }`}
                  onClick={() => setUserType("admin")}
                >
                  Admin
                </button>
              </div>

              <form onSubmit={handleLogin} noValidate>
                <div className="login-input-group mb-3">
                  <label htmlFor="identifier">
                    {userType === "student" ? "Student ID" : "Admin Email"}
                  </label>
                  <input
                    type={userType === "admin" ? "email" : "text"}
                    id="identifier"
                    className="login-form-input"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      userType === "admin"
                        ? "e.g., admin@example.com"
                        : "e.g., 101"
                    }
                    required
                  />
                </div>

                <div className="login-input-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="login-form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {error && <p className="login-error-message mb-3">{error}</p>}

                <button
                  type="submit"
                  className="login-form-button"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="login-form-footer">
                <Link to="/" className="back-to-home-link">
                  Back to Home
                </Link>
                <button
                  type="button"
                  onClick={openModal}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORGOT PASSWORD MODAL --- */}
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
                  className="login-form-button"
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
                  className="login-form-button"
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
                <button onClick={closeModal} className="login-form-button">
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
