import dotenv from "dotenv";
dotenv.config(); // 🔥 THIS MUST BE BEFORE EVERYTHING

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

 // .env load

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

// Test route
// app.get("/", (req, res) => {
//   res.send("API Running...");
// });
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// Server start
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});