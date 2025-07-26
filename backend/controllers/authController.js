const Student = require("../models/Student");
const Admin = require("../models/Admin"); // Make sure Admin is imported
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Make sure jwt is imported

// --- Student Login Logic ---
exports.login = async (req, res) => {
  const { studentId, password } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student ID not found." });
    }
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    res
      .status(200)
      .json({ message: "Login successful!", studentId: student.studentId });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};

// --- Admin Login Logic (Updated to use JWT_SECRET) ---
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Create JWT Token
    const payload = { id: admin.id, isAdmin: true };
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET, // Use the secret key from .env file
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.status(200).json({ message: "Admin login successful!", token });
  } catch (error) {
    console.error(error); // Log the actual error to the console
    res.status(500).json({ message: "Server error." });
  }
};

// --- FORGOT PASSWORD FLOW ---
exports.sendOtp = async (req, res) => {
  const { studentId, mobileNumber } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student ID not found." });
    }
    if (student.mobileNumber !== mobileNumber) {
      return res
        .status(400)
        .json({ message: "Mobile number does not match our records." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    student.otp = otp;
    student.otpExpires = Date.now() + 10 * 60 * 1000;
    await student.save();
    console.log(`OTP for ${studentId} is: ${otp}`);
    res
      .status(200)
      .json({ message: "OTP sent to your registered mobile number." });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};

exports.resetPassword = async (req, res) => {
  const { studentId, otp, newPassword } = req.body;
  try {
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    if (student.otp !== otp || student.otpExpires < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP is invalid or has expired." });
    }
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);
    student.otp = undefined;
    student.otpExpires = undefined;
    await student.save();
    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again." });
  }
};
