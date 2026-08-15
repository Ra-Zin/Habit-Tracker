import { useCallback, useEffect, useState } from "react";
import { Warning } from "@phosphor-icons/react/dist/ssr/Warning";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import HabitList from "../components/HabitList.jsx";
import HabitCardSkeleton from "../components/HabitCardSkeleton.jsx";
import AddHabitModal from "../components/AddHabitModal.jsx";
import EmptyState from "../components/EmptyState.jsx";
import CoachCard from "../components/CoachCard.jsx";
import { calculateStreak, getTodayString } from "../utils/streak.js";

/** Streaks are derived, never stored — the completions array is the truth. */
function withStreak(habit) {
  return {
    ...habit,
    completions: habit.completions || [],
    streak: calculateStreak(habit.completions),
  };
}

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const fetchHabits = useCallback(async () => {
    setIsLoading(true);
    setLoadError("");
    try {
      const { data } = await api.get("/habits");
      setHabits(data.map(withStreak));
    } catch {
      setLoadError("Your habits did not load. Check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  async function handleAddHabit({ name, frequency }) {
    const { data } = await api.post("/habits", { name, frequency });
    setHabits((previous) => [...previous, withStreak(data)]);
  }

  async function handleToggleComplete(habitId, isCurrentlyDone) {
    setBusyId(habitId);
    setActionError("");

    const endpoint = isCurrentlyDone ? "uncomplete" : "complete";
    // The browser knows the user's real calendar day; the server does not.
    const date = getTodayString();

    try {
      const { data } = await api.post(`/habits/${habitId}/${endpoint}`, { date });
      setHabits((previous) => previous.map((h) => (h._id === habitId ? withStreak(data) : h)));
    } catch (error) {
      setActionError(
        error.response?.data?.error || "That change did not save. Check your connection."
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleDeleteHabit(habitId) {
    const previousHabits = habits;
    setActionError("");
    setHabits((current) => current.filter((h) => h._id !== habitId));

    try {
      await api.delete(`/habits/${habitId}`);
    } catch {
      setHabits(previousHabits); // put it back — the delete never happened
      setActionError("That habit could not be deleted. It is still here.");
    }
  }

  const showEmptyState = !isLoading && !loadError && habits.length === 0;

  return (
    <div className="min-h-dvh bg-paper">
      <Navbar />

      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <DashboardHeader
          habits={habits}
          isLoading={isLoading}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {(loadError || actionError) && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-3xl bg-rose-soft p-4 sm:items-center"
          >
            <Warning weight="fill" className="mt-0.5 h-5 w-5 shrink-0 text-rose sm:mt-0" aria-hidden="true" />
            <p className="flex-1 text-sm font-medium text-rose">{loadError || actionError}</p>
            {loadError && (
              <button
                type="button"
                onClick={fetchHabits}
                className="min-h-[44px] shrink-0 rounded-lg px-3 text-sm font-semibold text-rose underline underline-offset-4 transition-[scale] duration-150 active:scale-[0.96]"
              >
                Retry
              </button>
            )}
          </div>
        )}

        <section className="mt-8">
          <h2 className="mb-4 text-micro font-semibold uppercase tracking-[0.08em] text-ink-3">
            Your habits
          </h2>

          {isLoading ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <HabitCardSkeleton />
              <HabitCardSkeleton />
              <HabitCardSkeleton />
            </div>
          ) : showEmptyState ? (
            <EmptyState onOpenModal={() => setIsModalOpen(true)} />
          ) : (
            <HabitList
              habits={habits}
              busyId={busyId}
              onToggleComplete={handleToggleComplete}
              onDeleteHabit={handleDeleteHabit}
            />
          )}
        </section>

        {!isLoading && <CoachCard hasHabits={habits.length > 0} />}
      </main>

      {isModalOpen && (
        <AddHabitModal onClose={() => setIsModalOpen(false)} onAddHabit={handleAddHabit} />
      )}
    </div>
  );
}

export default Dashboard;
