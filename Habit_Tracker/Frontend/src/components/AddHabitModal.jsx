import { useEffect, useId, useRef, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr/X";

const FREQUENCIES = [
  { value: "daily", label: "Daily", hint: "Every single day" },
  { value: "weekly", label: "Weekly", hint: "A few times a week" },
];

/**
 * Bottom sheet on phones, centred dialog from `sm` up. Escape closes it, the
 * scrim closes it, focus starts in the field and returns to the trigger.
 */
function AddHabitModal({ onClose, onAddHabit }) {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const titleId = useId();
  const errorId = useId();

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = name.trim();

    if (trimmed === "") {
      setError("Give the habit a name so you can recognise it later.");
      inputRef.current?.focus();
      return;
    }

    setError("");
    setSaving(true);
    try {
      await onAddHabit({ name: trimmed, frequency });
      onClose();
    } catch (submitError) {
      setError(submitError.response?.data?.error || "That habit did not save. Try again.");
      setSaving(false);
    }
  }

  return (
    <div
      className="animate-scrim-in fixed inset-0 z-50 flex items-end justify-center bg-ink/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet-in pb-safe max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-surface p-5 shadow-float sm:max-w-md sm:rounded-3xl sm:p-6 sm:pb-6"
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-line-strong sm:hidden" aria-hidden="true" />

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-title font-bold text-ink">
              New habit
            </h2>
            <p className="mt-1 text-caption text-ink-2">One small thing you can repeat.</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="hit-44 -m-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-surface-2 hover:text-ink"
          >
            <X weight="bold" className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6" noValidate>
          <label htmlFor="habit-name" className="block text-caption font-semibold text-ink-2">
            Habit name
          </label>
          <input
            id="habit-name"
            ref={inputRef}
            type="text"
            value={name}
            maxLength={60}
            autoComplete="off"
            placeholder="Morning run"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              setName(event.target.value);
              if (error) setError("");
            }}
            className="mt-2 min-h-[44px] w-full rounded-lg bg-surface-2 px-3.5 text-base text-ink ring-1 ring-line transition-[box-shadow] duration-150 placeholder:text-ink-3 focus:outline-none focus:ring-2 focus:ring-brand"
          />

          <fieldset className="mt-5">
            <legend className="text-caption font-semibold text-ink-2">How often</legend>

            <div className="mt-2 grid grid-cols-2 gap-2">
              {FREQUENCIES.map((option) => {
                const selected = frequency === option.value;
                return (
                  <label
                    key={option.value}
                    className={[
                      "cursor-pointer rounded-lg p-3 text-left transition-[box-shadow,background-color] duration-150",
                      selected
                        ? "bg-brand-soft ring-2 ring-brand"
                        : "bg-surface-2 ring-1 ring-line hover:ring-line-strong",
                    ].join(" ")}
                  >
                    <input
                      type="radio"
                      name="frequency"
                      value={option.value}
                      checked={selected}
                      onChange={(event) => setFrequency(event.target.value)}
                      className="sr-only"
                    />
                    <span
                      className={`block text-sm font-semibold ${selected ? "text-brand" : "text-ink"}`}
                    >
                      {option.label}
                    </span>
                    <span className="mt-0.5 block text-caption text-ink-3">{option.hint}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {error && (
            <p id={errorId} role="alert" className="mt-4 text-caption font-medium text-rose">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] rounded-lg px-5 text-sm font-semibold text-ink-2 ring-1 ring-line transition-[background-color,scale] duration-150 hover:bg-surface-2 active:scale-[0.96]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-h-[44px] rounded-lg bg-brand px-5 text-sm font-semibold text-on-brand shadow-card transition-[background-color,scale,opacity] duration-150 hover:bg-brand-hover active:scale-[0.96] disabled:opacity-50"
            >
              {saving ? "Adding…" : "Add habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;
