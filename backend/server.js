const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Route imports
const authRoutes = require("./routes/authRoutes");
const materialRoutes = require("./routes/materialRoutes");
const videoRoutes = require("./routes/videoRoutes");
const quizRoutes = require("./routes/quizRoutes");
const resultRoutes = require("./routes/resultRoutes"); // 1. Import result routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/results", resultRoutes); // 2. Use result routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
