import { useState } from "react";
import { Sparkle } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { ArrowClockwise } from "@phosphor-icons/react/dist/ssr/ArrowClockwise";
import api from "../api/axios.js";

/**
 * Week 7 — the habit coach. The server reads the signed-in user's habits and
 * streaks and asks the model for one short piece of encouragement.
 */
function CoachCard({ hasHabits }) {
  const [advice, setAdvice] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  async function fetchCoaching() {
    setStatus("loading");
    setError("");
    try {
      const { data } = await api.post("/ai/coach");
      setAdvice(data.recommendation || "");
      setStatus("idle");
    } catch (requestError) {
      const status429 = requestError.response?.status === 429;
      setError(
        status429
          ? "The coach is over its rate limit. Try again in a minute."
          : requestError.response?.data?.error || "The coach did not answer. Try again."
      );
      setStatus("error");
    }
  }

  if (!hasHabits) return null;

  return (
    <section className="mt-4 overflow-hidden rounded-3xl bg-surface p-5 shadow-card ring-1 ring-line/60 sm:p-6 dark:ring-line">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-micro font-semibold uppercase tracking-[0.08em] text-brand">
            <Sparkle weight="fill" className="h-4 w-4" aria-hidden="true" />
            Coach
          </p>
          <h3 className="mt-2 text-title font-bold text-ink">Need a push?</h3>
          <p className="mt-1 max-w-prose text-sm text-ink-2">
            Get one short read on your current streaks and what to protect this week.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchCoaching}
          disabled={status === "loading"}
          className="flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-brand ring-1 ring-brand transition-[background-color,scale,opacity] duration-150 hover:bg-brand-soft active:scale-[0.96] disabled:opacity-50 sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <ArrowClockwise weight="bold" className="h-4 w-4 animate-spin" aria-hidden="true" />
              Thinking…
            </>
          ) : (
            <>{advice ? "Ask again" : "Get coaching"}</>
          )}
        </button>
      </div>

      {status === "loading" && (
        <div className="mt-5 space-y-2" aria-hidden="true">
          <div className="h-4 w-full animate-pulse rounded bg-surface-3" />
          <div className="h-4 w-11/12 animate-pulse rounded bg-surface-3" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-surface-3" />
        </div>
      )}

      {status === "error" && (
        <p role="alert" className="mt-5 rounded-lg bg-rose-soft px-4 py-3 text-sm font-medium text-rose">
          {error}
        </p>
      )}

      {status === "idle" && advice && (
        <blockquote className="animate-rise-in mt-5 rounded-lg border-l-[3px] border-brand bg-brand-soft/60 px-4 py-3.5">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">{advice}</p>
        </blockquote>
      )}
    </section>
  );
}

export default CoachCard;
