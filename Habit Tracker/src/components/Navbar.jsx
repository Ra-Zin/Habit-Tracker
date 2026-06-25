function Navbar()
{
    return(
        <nav className = "bg-white shadow-sm">
            <div className = "max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className = "text-2xl font-bold text-blue-600">
                    Habit Loop
                </h1>

                <p className = "text-gray-500">
                    Build better habits
                </p>
            </div>
        </nav>
    )
}

export default Navbar;