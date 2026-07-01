function StatCard({icon: Icon, value, label, color})
{
    return(
        <div className = "bg-gray-50 rounded-xl p-4 flex-1 border border-gray-100">

            <div className = "text-2xl">
                <Icon className={`w-6 h-6 ${color}`} weight="fill" />
            </div>

            <h3 className = "text-2xl font-bold mt-2 text-gray-800">
                {value}
            </h3>

            <p className = "text-sm text-gray-500">
                {label}
            </p>
        </div>
    )
}

export default StatCard;