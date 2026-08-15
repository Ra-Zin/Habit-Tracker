import { useEffect, useRef, useState } from "react";
import { Fire } from "@phosphor-icons/react/dist/ssr/Fire";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";
import HabitChain from "./HabitChain.jsx";
import { calculateBestStreak, isCompletedToday } from "../utils/streak";

function HabitCard({ habit, index = 0, onToggleComplete, onDeleteHabit, isBusy = false }) {
  const { _id: habitId, name, frequency, completions, streak = 0 } = habit;

  const doneToday = isCompletedToday(completions);
  const bestStreak = calculateBestStreak(completions);
  const hasHistory = (completions || []).length > 0;
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  // Fires the link-in animation only on the tick that just happened, never on
  // first paint or on a re-render caused by something else.
  const [justCompleted, setJustCompleted] = useState(false);
  const previousDoneToday = useRef(doneToday);

  useEffect(() => {
    const wasDone = previousDoneToday.current;
    previousDoneToday.current = doneToday;

    if (!doneToday || wasDone) return undefined;

    setJustCompleted(true);
    const timer = setTimeout(() => setJustCompleted(false), 400);
    return () => clearTimeout(timer);
  }, [doneToday]);

  return (
    <article
      className="animate-rise-in rounded-3xl bg-surface p-4 shadow-card ring-1 ring-line/60 sm:p-5 dark:ring-line"
      style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-title font-semibold text-ink md:min-h-[2.3em]">{name}</h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span
              className={`inline-flex items-center gap-1.5 text-caption font-semibold ${
                streak > 0 ? "text-ember" : "text-ink-3"
              }`}
            >
              <Fire
                weight={streak > 0 ? "fill" : "regular"}
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
              />
              {streak > 0 ? (
                <>
                  <span className="figure">{streak}</span>
                  <span>{streak === 1 ? "day in a row" : "days in a row"}</span>
                </>
              ) : (
                <span>{hasHistory ? "Chain broken" : "Not started"}</span>
              )}
            </span>

            {bestStreak > streak && (
              <span className="text-caption text-ink-3">
                Best <span className="figure font-medium">{bestStreak}</span>
              </span>
            )}

            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-micro font-semibold uppercase tracking-[0.08em] text-ink-3">
              {frequency === "weekly" ? "Weekly" : "Daily"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setConfirmingDelete(true)}
          aria-label={`Delete ${name}`}
          className="hit-44 -m-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-rose-soft hover:text-rose focus-visible:bg-rose-soft focus-visible:text-rose"
        >
          <Trash weight="regular" className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </header>

      <div className="mt-5">
        <HabitChain completions={completions} justCompleted={justCompleted} />
      </div>

      <div className="mt-5 border-t border-line pt-4">
        {confirmingDelete ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-caption text-ink-2">
              Delete <span className="font-semibold text-ink">{name}</span> and its history?
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="min-h-[44px] flex-1 rounded-lg px-4 text-sm font-semibold text-ink-2 ring-1 ring-line transition-[background-color,scale] duration-150 hover:bg-surface-2 active:scale-[0.96] sm:flex-none"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={() => onDeleteHabit(habitId)}
                className="min-h-[44px] flex-1 rounded-lg bg-rose px-4 text-sm font-semibold text-white transition-[opacity,scale] duration-150 hover:opacity-90 active:scale-[0.96] sm:flex-none"
              >
                Delete
              </button>
            </div>
          </div>
        ) : doneToday ? (
          <div className="flex items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-jade">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-jade-soft">
                <Check weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              Done today
            </p>
            <button
              type="button"
              disabled={isBusy}
              onClick={() => onToggleComplete(habitId, true)}
              className="hit-44 rounded-lg px-3 py-2 text-sm font-semibold text-ink-3 transition-colors duration-150 hover:text-ink disabled:opacity-50"
            >
              Undo
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={isBusy}
            onClick={() => onToggleComplete(habitId, false)}
            className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-on-brand shadow-card transition-[background-color,scale,opacity] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-brand-hover active:scale-[0.96] disabled:opacity-50"
          >
            <Check weight="bold" className="h-4 w-4" aria-hidden="true" />
            Mark done
          </button>
        )}
      </div>
    </article>
  );
}

export default HabitCard;
