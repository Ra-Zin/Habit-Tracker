import { Router } from "express";
import Habit from "../models/habit.js";
import { protect } from "../middleware/auth.js";
import { resolveCompletionDate } from "../utils/date.js";

const router = Router();

// Every route below requires a valid JWT, and every query is scoped to
// req.userId so users can only ever see or modify their own habits.
router.use(protect);

// GET /api/habits - list the signed-in user's habits
router.get("/", async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: 1 });
    res.json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits - create a habit
router.post("/", async (req, res) => {
  try {
    const { name, frequency } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Habit name is required" });
    }

    const habit = await Habit.create({
      name: name.trim().slice(0, 60),
      frequency: frequency === "weekly" ? "weekly" : "daily",
      completions: [],
      userId: req.userId,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits/:id/complete - record a completion, rejecting duplicates
router.post("/:id/complete", async (req, res) => {
  try {
    const { date, error: dateError } = resolveCompletionDate(req.body?.date);
    if (dateError) {
      return res.status(400).json({ error: dateError });
    }

    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    if (habit.completions.includes(date)) {
      return res.status(409).json({ error: "This habit is already marked done for that day" });
    }

    habit.completions.push(date);
    habit.completions.sort();
    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/habits/:id/uncomplete - undo a completion
router.post("/:id/uncomplete", async (req, res) => {
  try {
    const { date, error: dateError } = resolveCompletionDate(req.body?.date);
    if (dateError) {
      return res.status(400).json({ error: dateError });
    }

    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId });
    if (!habit) {
      return res.status(404).json({ error: "Habit not found" });
    }

    habit.completions = habit.completions.filter((entry) => entry !== date);
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

// GET /api/habits/:id/history - the raw completions array
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
