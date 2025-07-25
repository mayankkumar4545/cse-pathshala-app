const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

module.exports = mongoose.model("Student", studentSchema);
