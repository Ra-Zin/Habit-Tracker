/**
 * The wordmark glyph: two interlocked links. Uses currentColor so it takes its
 * state from CSS like every other icon in the set.
 */
function LoopMark({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="1.75" y="7.75" width="12.5" height="8.5" rx="4.25" stroke="currentColor" strokeWidth="2" />
      <rect x="9.75" y="7.75" width="12.5" height="8.5" rx="4.25" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default LoopMark;
