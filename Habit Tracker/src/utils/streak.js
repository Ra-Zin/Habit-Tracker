function toDateString(date)
{
    return date.toISOString().split("T")[0];
}

export function getTodayString()
{
    return toDateString(new Date());
}

export function calculateStreak(completions)
{
    if (!completions || completions.length === 0)
    {
        return 0;
    }

    const completedDates = new Set(completions);
    const cursor = new Date();

    if (!completedDates.has(toDateString(cursor)))
    {
        cursor.setDate(cursor.getDate() - 1);
    }

    let streak = 0;

    while (completedDates.has(toDateString(cursor)))
    {
        streak++;
        cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
}

export function isCompletedToday(completions)
{
    if (!completions)
    {
        return false;
    }

    return completions.includes(getTodayString());
}