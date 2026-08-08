import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import generateRoutes from "./routes/generate.js";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", generateRoutes);

app.get("/api", (req, res) => {
  res.send("API Working 🚀");
});

app.get("/api/generate-test", (req, res) => {
  res.json({
    message: "Generate route server is working 🚀",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
  });
};

startServer();