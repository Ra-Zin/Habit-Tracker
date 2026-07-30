import { useState, useEffect } from "react";
import api from "../api/axios.js";
import Navbar from "../components/Navbar.jsx";
import DashboardHeader from "../components/DashboardHeader.jsx";
import HabitList from "../components/HabitList.jsx";
import HabitCardSkeleton from "../components/HabitCardSkeleton.jsx";
import AddHabitModal from "../components/AddHabitModal.jsx";
import { calculateStreak } from "../utils/streak.js";

function withStreak(habit) {
  return { ...habit, streak: calculateStreak(habit.completions) };
}

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    fetchHabits();
  }, []);

  async function fetchHabits() {
    setIsLoading(true);
    setLoadError("");
    try {
      const { data } = await api.get("/habits");
      setHabits(data.map(withStreak));
    } catch (err) {
      setLoadError("Could not load your habits. Please refresh and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddHabit({ name, frequency }) {
    const { data } = await api.post("/habits", { name, frequency });
    setHabits((prev) => [...prev, withStreak(data)]);
  }

  async function handleToggleComplete(habitId, isCurrentlyDone) {
    try {
      const endpoint = isCurrentlyDone ? "uncomplete" : "complete";
      const { data } = await api.post(`/habits/${habitId}/${endpoint}`);
      setHabits((prev) => prev.map((h) => (h._id === habitId ? withStreak(data) : h)));
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteHabit(habitId) {
    const previousHabits = habits;
    setHabits((prev) => prev.filter((h) => h._id !== habitId));
    try {
      await api.delete(`/habits/${habitId}`);
    } catch (err) {
      setHabits(previousHabits); // roll back if the delete failed
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        <DashboardHeader onOpenModal={() => setIsModalOpen(true)} habits={habits} />

        {loadError && <p className="text-red-500 mb-4">{loadError}</p>}

        {isLoading ? (
          <>
            <HabitCardSkeleton />
            <HabitCardSkeleton />
          </>
        ) : (
          <HabitList
            habits={habits}
            onToggleComplete={handleToggleComplete}
            onDeleteHabit={handleDeleteHabit}
          />
        )}

        {isModalOpen && (
          <AddHabitModal onClose={() => setIsModalOpen(false)} onAddHabit={handleAddHabit} />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
