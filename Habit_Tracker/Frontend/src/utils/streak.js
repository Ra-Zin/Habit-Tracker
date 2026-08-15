/**
 * Date helpers for habit completions.
 *
 * Completions are stored as "YYYY-MM-DD" strings built from the user's LOCAL
 * calendar date. `toISOString()` is deliberately avoided here: it converts to
 * UTC first, so anyone east or west of Greenwich gets an off-by-one day near
 * midnight (Kathmandu at 00:30 would tick "yesterday").
 */

const MS_PER_DAY = 86400000;

/** Local calendar date as "YYYY-MM-DD". */
export function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getTodayString() {
  return toDateString(new Date());
}

/** Midnight-anchored date, n days before today. */
export function daysAgo(n) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - n);
  return date;
}

/**
 * Consecutive completed days ending today (or yesterday, if today is not
 * ticked yet — a streak is not broken until the day is actually over).
 */
export function calculateStreak(completions) {
  if (!completions || completions.length === 0) return 0;

  const completed = new Set(completions);
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  if (!completed.has(toDateString(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (completed.has(toDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/** Longest run of consecutive days ever recorded. */
export function calculateBestStreak(completions) {
  if (!completions || completions.length === 0) return 0;

  const sorted = [...new Set(completions)].sort();
  let best = 1;
  let run = 1;

  for (let i = 1; i < sorted.length; i += 1) {
    const previous = new Date(`${sorted[i - 1]}T00:00:00`);
    const current = new Date(`${sorted[i]}T00:00:00`);
    const gap = Math.round((current - previous) / MS_PER_DAY);

    run = gap === 1 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}

export function isCompletedToday(completions) {
  if (!completions) return false;
  return completions.includes(getTodayString());
}

const WEEKDAY_INITIALS = ["S", "M", "T", "W", "T", "F", "S"];

/**
 * The last `length` days, oldest first — the data behind the chain strip.
 * Each entry knows whether it is today so the UI can mark the live link.
 */
export function getRecentDays(completions, length = 7) {
  const completed = new Set(completions || []);
  const today = getTodayString();
  const days = [];

  for (let i = length - 1; i >= 0; i -= 1) {
    const date = daysAgo(i);
    const dateString = toDateString(date);
    days.push({
      dateString,
      dayInitial: WEEKDAY_INITIALS[date.getDay()],
      dayOfMonth: date.getDate(),
      isToday: dateString === today,
      completed: completed.has(dateString),
      label: date.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    });
  }
  return days;
}

/** "Friday, 14 August" — the dateline above the dashboard headline. */
export function formatToday() {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
