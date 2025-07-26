import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const [userType, setUserType] = useState("student"); // 'student' or 'admin'
  const [identifier, setIdentifier] = useState(""); // Holds studentId or email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- State for Forgot Password Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ... (rest of the modal state remains the same)
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

    try {
      let endpoint = "";
      let payload = {};

      if (userType === "student") {
        endpoint = `${API_URL}/login`;
        payload = { studentId: identifier, password };
      } else {
        endpoint = `${API_URL}/admin/login`;
        payload = { email: identifier, password };
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Handle successful login
      if (userType === "student") {
        localStorage.setItem("studentId", data.studentId);
        window.open("/dashboard", "_blank"); // Open dashboard in a new tab
      } else {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setIdentifier("");
    setPassword("");
    setError("");
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
        {/* --- NEW USER TYPE TOGGLE --- */}
        <div className="user-type-toggle">
          <button
            className={userType === "student" ? "active" : ""}
            onClick={() => handleUserTypeChange("student")}
          >
            Student
          </button>
          <button
            className={userType === "admin" ? "active" : ""}
            onClick={() => handleUserTypeChange("admin")}
          >
            Admin
          </button>
        </div>

        <h2 className="login-title">
          {userType === "student" ? "Student Login" : "Admin Login"}
        </h2>

        {error && <p className="login-error-message">{error}</p>}

        <form onSubmit={handleLogin} noValidate>
          <div className="login-input-group">
            <label htmlFor="identifier">
              {userType === "student" ? "Student ID" : "Email"}
            </label>
            <input
              type={userType === "student" ? "text" : "email"}
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                userType === "student" ? "e.g., 101" : "admin@example.com"
              }
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

        <div className="login-footer-actions">
          <Link to="/" className="home-button">
            Back to Home
          </Link>
          {userType === "student" && (
            <button onClick={openModal} className="forgot-password-button">
              Forgot Password?
            </button>
          )}
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="modal-close-button">
              &times;
            </button>
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
