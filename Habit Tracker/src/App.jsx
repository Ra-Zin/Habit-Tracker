import { useState } from "react";
import{BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import HabitCard from "./components/HabitCard";
import HabitList from "./components/HabitList";
import AddHabitModal from "./components/AddHabitModal";
import DashboardHeader from "./components/DashboardHeader";
import sampleHabits from "./data/habits";

function App()
{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState(sampleHabits);

  function handleAddHabit(newHabit)
  {
    setHabits([...habits, newHabit]);
  }

  function handleCompleteHabit(habitId)
  {
    console.log("Completed habit:", habitId);
  }

  return (
    <div className = "min-h-screen bg-gray-100">
      <Navbar />

      <main className = "max-w-4xl mx-auto p-6">
        <div className = "flex justify-between items-center mb-6">
          <div>
            <h2 className = "text-3xl font-bold">
              My Habits
            </h2>

            <p className = "text-gray-500">
              Track your daily progress
            </p>
          </div>

          {/* <button onClick = {() => setIsModalOpen(true)} className = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Habits
          </button> */}
        
        </div>

        <DashboardHeader onOpen = {setIsModalOpen}/>
        
        <HabitList habits = {habits} onCompleteHabit = {handleCompleteHabit}/>

        {isModalOpen && <AddHabitModal onClose = {setIsModalOpen} onAddHabit = {handleAddHabit}/>}
      </main>
    </div>
  );
}

export default App;