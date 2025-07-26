import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layouts
import MainLayout from "./MainLayout";

// Import Page Components
import HomePage from "./components/HomePage";
import About from "./components/About";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import LabDashboard from "./components/LabDashboard";
import CourseDetailPage from "./components/CourseDetailPage";
import CheckoutPage from "./components/CheckoutPage";

import "./App.css";
import Contact from "./components/Contact";

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

          {/* --- Routes WITHOUT Main Navbar & Footer (Full-screen apps) --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/lab" element={<LabDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
