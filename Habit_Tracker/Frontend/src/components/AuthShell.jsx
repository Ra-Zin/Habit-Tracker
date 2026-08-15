import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import LoopMark from "./LoopMark.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

/** A frozen chain, used as the auth-page artwork: the product's core idea, still. */
function ChainPreview() {
  const days = [true, true, true, false, true, true, true];

  return (
    <ul className="flex items-center gap-0" aria-hidden="true">
      {days.map((done, index) => (
        <li key={index} className="relative flex items-center">
          {index > 0 && (
            <span
              className={`h-[3px] w-6 rounded-full ${done && days[index - 1] ? "bg-jade-vivid" : "bg-line-strong"}`}
            />
          )}
          <span
            className={`grid h-9 w-9 place-items-center rounded-full ${
              done ? "bg-jade-vivid text-white" : "border-2 border-line-strong bg-surface text-ink-3"
            }`}
          >
            {done ? (
              <Check weight="bold" className="h-4 w-4" />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-dvh bg-surface lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-brand-soft p-10 lg:flex xl:p-14">
        <div className="flex items-center gap-2.5">
          <LoopMark className="h-6 w-6 text-brand" />
          <span className="font-display text-lg font-bold tracking-tight text-ink">
            Habit<span className="text-brand">Loop</span>
          </span>
        </div>

        <div className="max-w-md">
          <h2 className="text-display font-extrabold text-ink">Don't break the chain.</h2>
          <p className="mt-4 max-w-sm text-ink-2">
            Tick a habit off and today joins yesterday. Miss one and you can see exactly where the
            run stopped.
          </p>
          <div className="mt-8">
            <ChainPreview />
          </div>
        </div>

        <p className="figure text-micro uppercase tracking-[0.08em] text-ink-3">
          Seven days at a time
        </p>
      </aside>

      <main className="flex flex-col bg-surface px-5 py-6 sm:px-8">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2.5 lg:hidden">
            <LoopMark className="h-6 w-6 text-brand" />
            <span className="font-display text-lg font-bold tracking-tight text-ink">
              Habit<span className="text-brand">Loop</span>
            </span>
          </div>
          <ThemeToggle />
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full max-w-sm">
            <h1 className="text-display font-extrabold text-ink">{title}</h1>
            <p className="mt-2 text-ink-2">{subtitle}</p>

            <div className="mt-8">{children}</div>

            <div className="mt-8 text-sm text-ink-2">{footer}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AuthShell;
