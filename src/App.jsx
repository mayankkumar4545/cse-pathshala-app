import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login"; // The login page
import "./App.css";
import MainLayout from "./MainLayout";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";

// 2. Create a component to protect the dashboard route
const ProtectedRoute = ({ children }) => {
  const studentId = localStorage.getItem("studentId");
  if (!studentId) {
    // If no student is logged in, redirect to the login page
    return <Navigate to="/login" />;
  }
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Routes>
          {/* Route for the main landing page */}
          <Route path="/" element={<MainLayout />} />
          {/* Route for the login page */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
