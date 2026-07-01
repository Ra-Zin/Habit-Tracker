import {useState} from "react";

function AddHabitModal()
{
    const [habitName, setHabitName] = useState("")

    return(
        <div className = "fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className = "bg-white p-6 rounded-lg w-96">
                <h2 className = "text-2xl font-bold mb-4">
                    Add New Habit
                </h2>

                <div className = "mt-6">
                    <label className = "block font-medium mb-2">
                        Habit Name
                    </label>

                    <input type = "text" 
                    placeholder = "Enter habit name" 
                    value = {habitName}
                    onChange = {(e) => setHabitName(e.target.value)}
                    className = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
            </div>
        </div>
    )
}

export default AddHabitModal;