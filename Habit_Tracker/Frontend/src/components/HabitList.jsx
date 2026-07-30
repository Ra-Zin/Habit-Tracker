import HabitCard from "./HabitCard"

function HabitList({habits, onCompleteHabit, onDeleteHabit})
{
  return(
    <div>
        {habits.map((habit) => (
            <HabitCard 
            key = {habit.id}
            habitId = {habit.id}
            habitName = {habit.name}
            streak = {habit.streak}
            stats = {habit.stats}
            onCompleteHabit = {onCompleteHabit}
            onDeleteHabit = {onDeleteHabit}
            />
        ))}
    </div>
  )
}

export default HabitList;