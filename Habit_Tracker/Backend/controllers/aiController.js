import Habit from "../models/habit.js";
import { getHabitCoachResponse } from "../services/groqAPI.js";
import { calculateStreak } from "../utils/streak.js";

/**
 * POST /api/ai/coach
 * Builds the prompt from the signed-in user's own habits, so the client never
 * gets to decide what the model is told about.
 */
export async function getCoaching(req, res) {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: 1 });

    if (habits.length === 0) {
      return res.status(400).json({ error: "Add a habit first, then the coach has something to work with." });
    }

    const summary = habits
      .map((habit) => {
        const streak = calculateStreak(habit.completions);
        return `- ${habit.name} (${habit.frequency}): ${streak} day streak, ${habit.completions.length} completions logged`;
      })
      .join("\n");

    const recommendation = await getHabitCoachResponse(
      `Here are my habits right now:\n${summary}\n\nGive me a short read on how I am doing.`
    );

    if (!recommendation) {
      return res.status(502).json({ error: "The coach returned an empty reply. Try again." });
    }

    return res.status(200).json({ recommendation });
  } catch (error) {
    if (error.status === 503) {
      return res.status(503).json({ error: error.message });
    }
    if (error.status === 429) {
      return res.status(429).json({ error: "The coach is over its rate limit. Try again in a minute." });
    }
    return res.status(500).json({ error: "The coach is unavailable right now." });
  }
}
