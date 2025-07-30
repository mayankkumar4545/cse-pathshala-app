import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- Import Layouts ---
import MainLayout from "./MainLayout";
import QuizLayout from "./components/QuizLayout";

// --- Import All Page Components ---
import HomePage from "./components/HomePage";
import About from "./components/About";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import LabDashboard from "./components/LabDashboard";
import CourseDetailPage from "./components/CourseDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import Contact from "./components/Contact";
import QuizLobby from "./components/QuizLobby";
import QuizAttempt from "./components/QuizAttempt";
import QuizResult from "./components/QuizResult";
import MyResults from "./components/MyResults"; // 1. Import MyResults
import Leaderboard from "./components/Leaderboard"; // 2. Import Leaderboard

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="page-container">
        <Routes>
          {/* --- Routes WITH Main Navbar & Footer --- */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="checkout/:courseId" element={<CheckoutPage />} />
          </Route>

          {/* --- Routes WITH the Quiz Sidebar Layout --- */}
          <Route path="/quiz" element={<QuizLayout />}>
            <Route index element={<QuizLobby />} />
            {/* 3. Add the routes for the new pages */}
            <Route path="my-results" element={<MyResults />} />
            <Route path="leaderboard" element={<Leaderboard />} />
          </Route>

          {/* --- Routes WITHOUT Any Layout (Full-screen apps) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/lab" element={<LabDashboard />} />
          <Route path="/quiz/attempt/:id" element={<QuizAttempt />} />
          <Route path="/quiz/result/:id" element={<QuizResult />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
