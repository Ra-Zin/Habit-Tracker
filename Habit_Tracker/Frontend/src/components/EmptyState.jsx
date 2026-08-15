import { Plus } from "@phosphor-icons/react/dist/ssr/Plus";
import LoopMark from "./LoopMark.jsx";

/** An empty screen is an invitation to act, so it carries the action itself. */
function EmptyState({ onOpenModal }) {
  return (
    <div className="rounded-3xl bg-surface px-6 py-12 text-center shadow-card ring-1 ring-line/60 sm:py-16 dark:ring-line">
      <LoopMark className="mx-auto h-10 w-10 text-brand" />

      <h3 className="mt-5 text-title font-bold text-ink">No habits yet</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-ink-2">
        Add one thing you want to do every day. Tick it off tonight and the chain starts at one.
      </p>

      <button
        type="button"
        onClick={onOpenModal}
        className="mx-auto mt-6 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-on-brand shadow-card transition-[background-color,scale] duration-150 hover:bg-brand-hover active:scale-[0.96]"
      >
        <Plus weight="bold" className="h-4 w-4" aria-hidden="true" />
        Add your first habit
      </button>
    </div>
  );
}

export default EmptyState;
