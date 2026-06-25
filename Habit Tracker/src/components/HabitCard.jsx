function HabitCard({habitName, streak})
{
    return (
        <div className = "bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className = "text=xl font-semibold">
                {habitName}
            </h3>

            <p className = "text-orange-500 mt-2">
               🔥 {streak} Day Streak
            </p>

            <button className = "mt-4 bg-green-500 text-white px-4 py- 2 rounded">
                Completed Today
            </button>
        </div>
    )
}

export default HabitCard;