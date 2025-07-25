const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// --- Login Logic ---
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

    // --- THIS IS THE FIX ---
    // We now send the studentId back to the frontend on success.
    res.status(200).json({
      message: "Login successful!",
      studentId: student.studentId, // Include studentId in the response
    });
  } catch (error) {
    res.status(500).json({ message: "Server error, please try again." });
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
    student.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
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
