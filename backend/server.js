// import dotenv from "dotenv";
// dotenv.config(); // 🔥 THIS MUST BE BEFORE EVERYTHING


// import path from "path"

// import taskRoutes from "./routes/taskRoutes.js";
// import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js"

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";

//  // .env load

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // 🔥 MongoDB Connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected");
//   })
//   .catch((err) => {
//     console.log("❌ DB Error:", err.message);
//   });

// const __dirname =path.resolve();
// if(process.env.NODE_ENV === "production"){
//   const frontendpath=path.join(__dirname,"..","frontend","dist")
//   app.use(express.static(frontendpath))
//   app.use('*',(req,res)=>{
//     res.sendFile(path.join(frontendpath,'index.html'))
//   })
// }   

// app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);
// app.use("/api/admin", adminRoutes);

// // Server start
// app.listen(5000, () => {
//   console.log("🚀 Server running on port 5000");
// });



import dotenv from "dotenv";
dotenv.config(); // MUST be first

import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

// Static frontend (production only)
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "..", "frontend", "dist");

  app.use(express.static(frontendPath));

  // FIXED ROUTE (no '*' error)
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});