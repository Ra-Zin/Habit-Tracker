/**
 * The server runs in UTC; the user does not. A completion belongs to the day it
 * was on *for the person ticking it*, so the client sends its local calendar
 * date and we sanity-check it here rather than trusting `new Date()` on the box.
 */

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MS_PER_DAY = 86400000;

/** Server-side UTC date, used as the reference point and as the fallback. */
export function serverToday() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Returns a safe "YYYY-MM-DD" for a completion.
 * Rejects malformed input and anything more than one day from the server's
 * date — real timezone offsets only ever span UTC-12 to UTC+14.
 */
export function resolveCompletionDate(candidate) {
  const fallback = serverToday();

  if (typeof candidate !== "string" || !DATE_PATTERN.test(candidate)) {
    return { date: fallback };
  }

  const parsed = new Date(`${candidate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return { date: fallback };
  }

  const reference = new Date(`${fallback}T00:00:00Z`);
  const dayGap = Math.abs(Math.round((parsed - reference) / MS_PER_DAY));

  if (dayGap > 1) {
    return { error: "That date is outside the allowed range." };
  }

  return { date: candidate };
}
