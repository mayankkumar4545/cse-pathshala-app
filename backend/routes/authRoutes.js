const express = require("express");
const {
  login,
  sendOtp,
  resetPassword,
  adminLogin, // 1. Import the new function
} = require("../controllers/authController");
const router = express.Router();

// --- Student Routes ---
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);

// --- Admin Route ---
router.post("/admin/login", adminLogin); // 2. Add the correct route here

module.exports = router;
