function CalendarStrip({ completions })
{const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];

    const week = []

    for (let i = 6; i >= 0; i--)
    {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const dateString = date.toISOString().split("T")[0];

        week.push({
            day: dayLabels[date.getDay()],
            completed: completions ? completions.includes(dateString):false
        })

    }

    return(
        <div className = "flex gap-3 mt-4">
            {week.map((item, index) =>(
                <div key = {index} className = "flex flex-col items-center">
                    <span className = "text-sm text-greay-500">
                        {item.day}
                    </span>

                    <div className = {`w-8 h-8 rounded-full flex items-center justify-center
                        ${
                            item.completed ? "bg-green-500 text-white" : "bg-red-500 text-white"
                        }`}>
                            {item.completed ? "✓" : "✗"}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CalendarStrip;