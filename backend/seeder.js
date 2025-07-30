const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Student = require("./models/Student");

dotenv.config();

const studentsToCreate = [
  { studentId: "101", password: "123456", mobileNumber: "1234567890" },
  { studentId: "102", password: "123456", mobileNumber: "9876543211" },
  { studentId: "103", password: "123456", mobileNumber: "9876543212" },
  { studentId: "104", password: "123456", mobileNumber: "9876543213" },
  { studentId: "105", password: "123456", mobileNumber: "9876543214" },
  { studentId: "106", password: "123456", mobileNumber: "9876543215" },
  { studentId: "107", password: "123456", mobileNumber: "9876543216" },
  { studentId: "108", password: "123456", mobileNumber: "9876543217" },
  { studentId: "109", password: "123456", mobileNumber: "9876543218" },
  { studentId: "110", password: "123456", mobileNumber: "9876543219" },
  { studentId: "111", password: "123456", mobileNumber: "9876543220" },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for Seeding...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Student.deleteMany();
    for (const student of studentsToCreate) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(student.password, salt);
      await Student.create({
        studentId: student.studentId,
        password: hashedPassword,
        mobileNumber: student.mobileNumber,
      });
    }
    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();
  await importData();
};

runSeeder();
