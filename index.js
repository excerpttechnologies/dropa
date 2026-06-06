require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Route
app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dropa Backend Running Successfully 🚀",
  });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    // Serve React/Vite Build
    app.use(express.static(path.join(__dirname, "dist")));

    app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

    app.listen(process.env.PORT, () => {
      console.log(
        `🚀 Server running on port ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Error:", error.message);
  });