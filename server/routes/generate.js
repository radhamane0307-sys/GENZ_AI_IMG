import express from "express";
import auth from "../middleware/auth.js";
import fetch from "node-fetch";

const router = express.Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    // ❗ Prompt check
    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    console.log("🔥 Prompt:", prompt);

    // 🔥 Unsplash API call
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();

    // ❗ No result check
    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: "No image found" });
    }

    // ✅ Get image URL
    const image = data.results[0].urls.regular;

    res.json({ image });

  } catch (err) {
    console.log("❌ ERROR:", err.message);

    res.status(500).json({
      error: "Image fetch failed",
    });
  }
});

export default router;