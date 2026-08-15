function HabitCardSkeleton() {
  return (
    <div
      className="rounded-3xl bg-surface p-4 shadow-card ring-1 ring-line/60 sm:p-5 dark:ring-line"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="w-full">
          <div className="h-6 w-2/5 animate-pulse rounded-lg bg-surface-3" />
          <div className="mt-2.5 h-4 w-1/3 animate-pulse rounded bg-surface-3" />
        </div>
        <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-surface-3" />
      </div>

      <div className="mt-5 flex justify-between gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-8 w-8 animate-pulse rounded-full bg-surface-3 sm:h-9 sm:w-9" />
        ))}
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <div className="h-11 w-full animate-pulse rounded-lg bg-surface-3" />
      </div>
    </div>
  );
}

export default HabitCardSkeleton;
