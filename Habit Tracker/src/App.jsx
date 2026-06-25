import { useState} from 'react'
import HabitCard from "./components/habit-card.jsx"

const habits = [
  {
    id: 1,
    title: "Exercise",
    streak: 5,
    description: "Go to the gym for 30 minutes."
  },
  {
    id: 2,
    title: "Read",
    streak: 10,
    description: "Read 10 pages of a book."
  },
  {
    id: 3,
    title: "Meditate",
    streak: 1,
    description: "Meditate for 15 minutes."
  }
]

export default function App()
{
  const [showCard, setShowCard] = useState(false);
    return (
    <div>
      <button type="button" onClick = {() => setShowCard(!showCard)}
            className="px-10 py-3 text-white text-lg font-semibold cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-center vlock mx-auto">
            Habits
      </button>

      {showCard && 
      (<div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {habits.map((habit) => (
        <HabitCard key = {habit.id} title = {habit.title} streak = {habit.streak} description = {habit.description} />
      ))
      }
      </div>)}
    </div>
  )
}