import StatCard from "./StatCard";
import { Flame } from "@phosphor-icons/react/dist/ssr/Flame";
import { BookOpen } from "@phosphor-icons/react/dist/ssr/BookOpen";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";

function DashboardHeader({onOpen})
{
    return(
        <div className = "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className = "flex justify-between items-start">
                <div>
                    <h2 className = "text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h2>

                    <p className = "text-gray-500 mt-2">
                        Track your progress and build better habits everyday.
                    </p>
                </div>

                <button onClick = {() => onOpen(true)} className = "bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300">
                    + Add Habit
                </button>
            </div>

            <div className = "grid grid-cols-3 gap-4 mt-8">
                    <StatCard
                    icon={Flame}
                    value="24"
                    label="Current Streak"
                    color="text-orange-500"
                    />

                    <StatCard
                    icon={BookOpen}
                    value="4"
                    label="Total Habits"
                    color="text-blue-500"
                    />

                    <StatCard
                    icon={CheckCircle}
                    value="2/4"
                    label="Today's Progress"
                    color="text-green-500"
                    />
            </div>
        </div>
    )
}

export default DashboardHeader;