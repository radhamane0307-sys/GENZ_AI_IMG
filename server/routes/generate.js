import express from "express";
import auth from "../middleware/auth.js";
import fetch from "node-fetch";
import Image from "../models/image.js";

const router = express.Router();

router.post("/generate", auth, async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}&per_page=1`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return res.status(404).json({ error: "No image found" });
    }

    const image = data.results[0].urls.regular;

    // ✅ Save history
    await Image.create({
      userId: req.user.id,
      prompt,
      imageUrl: image,
    });

    res.json({ image });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image fetch failed" });
  }
});

export default router;