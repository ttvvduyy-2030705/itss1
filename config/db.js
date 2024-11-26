const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load các biến môi trường từ file .env
dotenv.config();

// Kết nối cơ sở dữ liệu
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Thoát nếu kết nối thất bại
  }
};

module.exports = connectDB;
