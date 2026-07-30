import CalendarStrip from "./CalendarStrip";
import {Flame} from "@phosphor-icons/react/dist/ssr/Flame";
import {isCompletedToday} from "../utils/streak";

function HabitCard({habitId, habitName, streak, completions, onCompleteHabit, onDeleteHabit})
{
    const doneToday = isCompletedToday(completions);
    return (
        <div className = "bg-white rounded-2xl shadow-sm hover:shadow-lg trannsition-all duration-300 p-6 mb-5 border border-gray-100">

            {/* Habit Name */}
            <h3 className = "text-2xl font-bold text-gray-800">
                {habitName}
            </h3>
            
            {/* Streak */}
            <div className = "flex items-center mt-2 mb-4">
                <span className = "text-orange-500 text-lg">
                    <Flame weight = "fill" className = "w-5 h-5 text-orange-500"/>
                </span>

                <span className = "ml-2 font-medium text-gray-700">
                    {streak} Day Streak
                </span>
            </div>

            {/* Calendar */}
            <CalendarStrip />

            <hr className = "my-5" />

            {/* Button */}
            <button onClick = {() => onCompleteHabit(habitId)} className = "w-full bg-green-500 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                 ✓ Complete Today
            </button>
        </div>
    )
}

export default HabitCard;