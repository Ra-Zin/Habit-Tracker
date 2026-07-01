import HabitCard from "./HabitCard"
import habits from "../data/habits"

function HabitList()
{

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