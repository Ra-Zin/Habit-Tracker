function CalendarStrip()
{
    const week = [
        {day: "M", completed: true},
        {day: "T", completed: true},
        {day: "W", completed: true},
        {day: "T", completed: false},
        {day: "F", completed: false},
        {day: "S", completed: true},
        {day: "S", completed: true},
    ]
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