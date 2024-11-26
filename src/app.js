const express = require("express");
const dotenv = require("dotenv");

// Load biến môi trường từ file .env
dotenv.config();

const app = express();

// Middleware cơ bản
app.use(express.json());

// Route mặc định
app.get("/", (req, res) => {
  res.send("Welcome to Coffee Finder API!");
});

// Lắng nghe server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
