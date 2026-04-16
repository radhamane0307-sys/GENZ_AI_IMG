import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // ✅ auto adds createdAt & updatedAt
  }
);

export default mongoose.model("Image", imageSchema);