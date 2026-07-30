import { Router } from "express";
import Habit from "../models/Habit.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// Every route below requires a valid JWT, and every query is scoped to
// req.userId so users can only ever see/modify their own habits.
router.use(protect);

const getTodayString = () => new Date().toISOString().split("T")[0];

// GET /api/habits - list the logged-in user's habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: 1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits - create a new habit
router.post("/", async (req, res) => {
  try {
    const { name, frequency } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Habit name is required" });
    }

    const habit = await Habit.create({
      name: name.trim(),
      frequency: frequency === "weekly" ? "weekly" : "daily",
      completions: [],
      userId: req.userId,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits/:id/complete - log today's date as completed (rejects duplicates)
router.post("/:id/complete", async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const today = getTodayString();

    if (habit.completions.includes(today)) {
      return res.status(400).json({ error: "Habit already completed today" });
    }

    habit.completions.push(today);
    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits/:id/uncomplete - undo today's completion (used by the tick toggle)
router.post("/:id/uncomplete", async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    const today = getTodayString();
    habit.completions = habit.completions.filter((date) => date !== today);
    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/habits/:id
router.delete("/:id", async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/habits/:id/history - return the completions array
router.get("/:id/history", async (req, res) => {
  try {
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }
    res.json({ id: habit._id, completions: habit.completions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
