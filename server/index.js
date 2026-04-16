import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ MUST be before using process.env

// 🔥 DEBUG (check env working or not)

console.log("CLOUD:", process.env.CLOUD_NAME);
console.log("API KEY:", process.env.CLOUD_API_KEY);
console.log("SECRET:", process.env.CLOUD_API_SECRET);

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import generateRoutes from "./routes/generate.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api", generateRoutes);

// ✅ health check route (ADD HERE)
app.get("/api", (req, res) => {
  res.send("API Working 🚀");
});


// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});