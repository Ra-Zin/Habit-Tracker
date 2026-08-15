import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { getRecentDays } from "../utils/streak";

/**
 * The chain — this app's signature element.
 *
 * A habit is a run of days, so the last seven days are drawn as links rather
 * than seven unrelated dots: consecutive completions are joined by a solid
 * connector, and a missed day leaves a visible gap. The break is the point.
 *
 * A missed day is a hollow link, never a red cross. The chain reports what
 * happened; it does not scold.
 */
function HabitChain({ completions, length = 7, justCompleted = false }) {
  const days = getRecentDays(completions, length);

  return (
    <ul className="flex w-full items-start justify-between gap-0.5" aria-label={`Last ${length} days`}>
      {days.map((day, index) => {
        const linked = index > 0 && day.completed && days[index - 1].completed;
        const isLiveLink = day.isToday && day.completed;

        return (
          <li key={day.dateString} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
            <div className="relative flex h-8 w-full items-center justify-center sm:h-9">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className={[
                    "absolute right-1/2 top-1/2 h-[3px] w-full -translate-y-1/2 rounded-full",
                    "transition-colors duration-300 ease-[cubic-bezier(0.2,0,0,1)]",
                    linked ? "bg-jade-vivid" : "bg-line",
                  ].join(" ")}
                />
              )}

              <span
                className={[
                  "relative z-10 grid h-8 w-8 place-items-center rounded-full sm:h-9 sm:w-9",
                  "transition-[background-color,border-color,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
                  day.completed
                    ? "bg-jade-vivid text-white"
                    : day.isToday
                      ? "border-2 border-dashed border-brand bg-surface text-brand animate-today-ring"
                      : "border-2 border-line bg-surface text-ink-3",
                  isLiveLink && justCompleted ? "animate-link-in" : "",
                ].join(" ")}
              >
                {day.completed ? (
                  <Check weight="bold" className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
                )}
              </span>
            </div>

            <span
              className={[
                "figure text-micro uppercase tracking-[0.08em]",
                day.isToday ? "font-bold text-brand" : "text-ink-3",
              ].join(" ")}
            >
              {day.dayInitial}
            </span>

            <span className="sr-only">
              {day.label}
              {day.isToday ? " (today)" : ""}: {day.completed ? "done" : "not done"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export default HabitChain;
