function StatCard({ icon: Icon, value, label, tone = "text-ink", className = "" }) {
  return (
    <div className={`rounded-lg bg-surface-2 p-3 sm:p-4 ${className}`}>
      <Icon className={`h-5 w-5 ${tone}`} weight="fill" aria-hidden="true" />
      <p className="figure mt-2 text-2xl font-bold leading-none text-ink sm:text-[1.75rem]">{value}</p>
      <p className="mt-1.5 text-caption text-ink-3">{label}</p>
    </div>
  );
}

export default StatCard;
