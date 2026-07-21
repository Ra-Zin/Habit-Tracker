import { Router } from "express";
import habits, {getNextId} from "../data/habits.js";

const router = Router();

function getTodayString()
{
    return new Date().toISOString().split("T")[0];
}

router.get("/", (req, res) =>
{
    res.json(habits);
});

router.post("/", (req, res) =>
{
    const {name, frequency} = req.body;

    if (!name || name.trim() === "")
    {
        return res.status(400).json({ error: "Habit name is required"});
    }

    const newHabit = {
        id: getNextId(),
        name: name.trim(),
        frequency: frequency === "weekly" ? "weekly" : "daily",
        completions: []
    }

    habits.push(newHabit);

    return res.status(201).json(newHabit);
})

router.post("/:id/complete", (req, res) =>
{
    const habit = habits.find(h => h.id === Number(req.params.id));

    if (!habit)
    {
        return res.status(404).json({ error: "Habit not found" });
    }

    const today = getTodayString();

    if (habit.completions.includes(today))
    {
        return res.status(400).json({ error: "Habit already completed today" });
    }

    habit.completions.push(today);

    res.status(200).json(habit);
});

// DELETE /api/habits/:id
router.delete("/:id", (req, res) =>
{
    const index = habits.findIndex(h => h.id === Number(req.params.id));

    if (index === -1)
    {
        return res.status(404).json({ error: "Habit not found" });
    }

    const [deleted] = habits.splice(index, 1);

    res.status(200).json(deleted);
});

// GET /api/habits/:id/history
router.get("/:id/history", (req, res) =>
{
    const habit = habits.find(h => h.id === Number(req.params.id));

    if (!habit)
    {
        return res.status(404).json({ error: "Habit not found" });
    }

    res.json({ id: habit.id, completions: habit.completions });
});

export default router;