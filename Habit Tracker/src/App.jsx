import Navbar from "./components/Navbar"
import HabitCard from "./components/HabitCard"
import HabitList from "./components/HabitList"

function App()
{
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

          <button className = "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            + Add Habits
          </button>
        
        </div>
        <HabitList />
      </main>
    </div>
  );
}

export default App;