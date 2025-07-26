const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Check if an admin already exists
    const existingAdmin = await Admin.findOne({
      email: "admin@csepathshala.com",
    });
    if (existingAdmin) {
      console.log("Admin user already exists.");
      mongoose.connection.close();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("admin123", salt);

    await Admin.create({
      email: "admin@csepathshala.com",
      password: hashedPassword,
    });

    console.log("Admin user created successfully!");
    console.log("Email: admin@csepathshala.com");
    console.log("Password: admin123");

    mongoose.connection.close();
  } catch (error) {
    console.error(`Error creating admin: ${error}`);
    process.exit(1);
  }
};

createAdmin();
