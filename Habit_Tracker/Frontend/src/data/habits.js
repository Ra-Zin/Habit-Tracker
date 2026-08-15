import { toDateString, daysAgo } from "../utils/streak.js";

/**
 * Sample habits used only for local UI work when the API is unavailable.
 * The real dashboard reads from /api/habits.
 */
const habits = [
  {
    _id: "sample-1",
    name: "Morning run",
    frequency: "daily",
    completions: [4, 3, 2, 1, 0].map((n) => toDateString(daysAgo(n))),
  },
  {
    _id: "sample-2",
    name: "Read 20 pages",
    frequency: "daily",
    completions: [1, 0].map((n) => toDateString(daysAgo(n))),
  },
  {
    _id: "sample-3",
    name: "Practice guitar",
    frequency: "daily",
    completions: [10, 9, 8].map((n) => toDateString(daysAgo(n))),
  },
];

export default habits;
