import {useState} from "react";

function AddHabitModal({onClose, onAddHabit})
{
    const [habitName, setHabitName] = useState("");  
    const [frequency, setFrequency] = useState("daily");

    function handleSubmit()
    {
        if (habitName.trim() === "")
        {
            alert("Please enter a habit name.");
            return;
        }

        const newHabit = {
            id: Date.now(),
            name: habitName.trim(),
            frequency: frequency,
            streak: 0,
            completions: []
        };

        onAddHabit(newHabit);

        onClose(false);
    }

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
                    className = "w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className = "mt-6">
                        <label className = "block font-medium mb-3">
                            Frequency
                        </label>

                        <div className = "flex gap-6">
                            <label className = "flex items-center gap-2">
                                <input 
                                type = "radio" 
                                name = "frequency" 
                                value = "Daily"
                                checked = {frequency === "daily"}
                                onChange = {(e) => setFrequency(e.target.value)}
                                />
                                Daily
                            </label>

                            <label className = "flex items-center gap-2">
                                <input 
                                type = "radio" 
                                name = "frequency" 
                                value = "Weekly"
                                checked = {frequency === "weekly"}
                                onChange = {(e) => setFrequency(e.target.value)}
                                />
                                Weekly
                            </label>
                        </div>
                    </div>

                    <button onClick = {() => setHabitName("")} className = "mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Clear
                    </button>

                    <button onClick = {() => onClose(false)} className = "mt-4 ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Close
                    </button>

                    <button onClick = {handleSubmit} className = "mt-4 ml-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                        Add Habit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddHabitModal;