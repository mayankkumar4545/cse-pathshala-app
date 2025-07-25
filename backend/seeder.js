const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Student = require("./models/Student");

dotenv.config();

const studentsToCreate = [
  { studentId: "12004657", password: "Cse@45", mobileNumber: "7349737968" },
  { studentId: "12005747", password: "Cse@38", mobileNumber: "9876543211" },
  { studentId: "103", password: "Cs@103", mobileNumber: "9876543212" },
  { studentId: "104", password: "Cs@104", mobileNumber: "9876543213" },
  { studentId: "105", password: "Cs@105", mobileNumber: "9876543214" },
  { studentId: "106", password: "Cs@106", mobileNumber: "9876543215" },
  { studentId: "107", password: "Cs@107", mobileNumber: "9876543216" },
  { studentId: "108", password: "Cs@108", mobileNumber: "9876543217" },
  { studentId: "109", password: "Cs@109", mobileNumber: "9876543218" },
  { studentId: "110", password: "Cs@110", mobileNumber: "9876543219" },
  { studentId: "111", password: "Cs@111", mobileNumber: "9876543220" },
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
