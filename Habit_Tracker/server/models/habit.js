import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Habit name is required"],
      trim: true,
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly"],
      default: "daily",
    },
    // Store completions as "YYYY-MM-DD" strings so date comparisons are
    // simple and timezone-safe (avoids off-by-one bugs with Date objects).
    completions: {
      type: [String],
      default: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
