const express = require("express");
const {
  login,
  sendOtp,
  resetPassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
