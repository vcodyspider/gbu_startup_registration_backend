const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Registration = require("./models/Registration");

const app = express();

/* ================================
   MIDDLEWARE
================================ */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://gbustartupregistration-frontend.vercel.app/"
    ],
  })
);


app.use(express.json());

/* ================================
   DATABASE CONNECTION
================================ */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

/* ================================
   ROUTES
================================ */

// Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Startup Registration API Running...");
});

// Register Startup
app.post("/api/register", async (req, res) => {
  try {
    const newRegistration = new Registration(req.body);
    await newRegistration.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("❌ Error saving registration:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

/* ================================
   SERVER START
================================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
