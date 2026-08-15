import HabitCard from "./HabitCard.jsx";

function HabitList({ habits, onToggleComplete, onDeleteHabit, busyId }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {habits.map((habit, index) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          index={index}
          isBusy={busyId === habit._id}
          onToggleComplete={onToggleComplete}
          onDeleteHabit={onDeleteHabit}
        />
      ))}
    </div>
  );
}

export default HabitList;
