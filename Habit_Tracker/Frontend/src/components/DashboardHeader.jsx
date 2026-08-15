import { Fire } from "@phosphor-icons/react/dist/ssr/Fire";
import { ListChecks } from "@phosphor-icons/react/dist/ssr/ListChecks";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import StatCard from "./StatCard.jsx";
import { formatToday, isCompletedToday } from "../utils/streak";

const WORDS = [
  "None", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

const spell = (n) => (n < WORDS.length ? WORDS[n] : String(n));
const spellLower = (n) => (n < WORDS.length ? WORDS[n].toLowerCase() : String(n));

/**
 * The headline is the thesis: a plain sentence about where today stands, set in
 * display type. It is the first thing you read and the only thing you need.
 */
function buildHeadline(total, done) {
  if (total === 0) return "Start your first chain.";
  if (done === 0) return "Nothing ticked yet today.";
  if (done === total) return total === 1 ? "Done for today." : "Everything done today.";
  return `${spell(done)} of ${spellLower(total)} done.`;
}

function DashboardHeader({ habits, onOpenModal, isLoading }) {
  const totalHabits = habits.length;
  const doneToday = habits.filter((habit) => isCompletedToday(habit.completions)).length;
  const longestActive = habits.reduce((max, habit) => Math.max(max, habit.streak || 0), 0);
  const percent = totalHabits === 0 ? 0 : Math.round((doneToday / totalHabits) * 100);

  return (
    <section className="rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line/60 sm:rounded-[1.75rem] sm:p-6 dark:ring-line">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0 flex-1">
          <p className="figure text-micro font-medium uppercase text-ink-3">{formatToday()}</p>

          <h2 className="mt-2 max-w-[18ch] text-display font-extrabold text-ink">
            {isLoading ? "Loading your habits…" : buildHeadline(totalHabits, doneToday)}
          </h2>

          {totalHabits > 0 && (
            <div className="mt-5 max-w-md">
              <div
                className="h-2 overflow-hidden rounded-full bg-surface-3"
                role="progressbar"
                aria-valuenow={percent}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Habits completed today"
              >
                <div
                  className="h-full rounded-full bg-brand transition-[width] duration-500 ease-[cubic-bezier(0.2,0,0,1)]"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <p className="figure mt-2 text-caption text-ink-3">{percent}% of today</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onOpenModal}
          className="flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-brand shadow-card transition-[background-color,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-brand-hover active:scale-[0.96] sm:w-auto"
        >
          <Plus weight="bold" className="h-4 w-4" aria-hidden="true" />
          New habit
        </button>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard
          icon={Fire}
          value={longestActive}
          label="Longest active streak"
          tone="text-ember-vivid"
        />
        <StatCard icon={ListChecks} value={totalHabits} label="Habits tracked" tone="text-brand" />
        <StatCard
          icon={CheckCircle}
          value={`${doneToday}/${totalHabits}`}
          label="Done today"
          tone="text-jade-vivid"
          className="col-span-2 sm:col-span-1"
        />
      </div>
    </section>
  );
}

export default DashboardHeader;
