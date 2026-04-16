import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // ✅ MUST be before using process.env

// 🔥 DEBUG (check env working or not)
console.log("ENV TOKEN:", process.env.REPLICATE_API_TOKEN);
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

// server start
app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});