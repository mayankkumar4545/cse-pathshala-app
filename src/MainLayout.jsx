import React from "react";
import { Outlet } from "react-router-dom"; // 1. Import Outlet
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// This component now acts as the layout for all public-facing pages.
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* 2. This is where the page content will be rendered */}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
