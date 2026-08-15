/**
 * Server-side streak calculation, kept in step with the client's version in
 * Frontend/src/utils/streak.js. Completions are plain "YYYY-MM-DD" strings, so
 * this walks backwards a day at a time in UTC.
 */

const MS_PER_DAY = 86400000;

function toUtcDateString(date) {
  return date.toISOString().split("T")[0];
}

export function calculateStreak(completions) {
  if (!completions || completions.length === 0) return 0;

  const completed = new Set(completions);
  const cursor = new Date(`${toUtcDateString(new Date())}T00:00:00Z`);

  if (!completed.has(toUtcDateString(cursor))) {
    cursor.setTime(cursor.getTime() - MS_PER_DAY);
  }

  let streak = 0;
  while (completed.has(toUtcDateString(cursor))) {
    streak += 1;
    cursor.setTime(cursor.getTime() - MS_PER_DAY);
  }
  return streak;
}
