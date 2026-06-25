import HabitCard from "./HabitCard.jsx"

function HabitList()
{
  const habits = [
    {
      name: "Exercise",
      streak: 5
    },
    {
      name: "Reading",
      streak: 2
    },
    {
      name: "Coding",
      streak: 10
    }
  ]

  return(
    <div>
        {habits.map((habit) => (
            <HabitCard 
            key = {habit.name}
            habitName = {habit.name}
            streak = {habit.streak}
            />
        ))}
    </div>
  )
}

export default HabitList;