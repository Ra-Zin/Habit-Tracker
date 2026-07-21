function daysAgo(n)
{
    const date = new Date();
    date.setDate(date.getDate() - n);
    return date.toISOString().split("T")[0];
}

const habits = [
{
    id: 1,
    name: "Exercise",
    frequency: "daily",
    completions: [daysAgo(4), daysAgo(3), daysAgo(2), daysAgo(1), daysAgo(0)]
},
{
    id: 2,
    name: "Reading",
    frequency: "daily",
    completions: [daysAgo(1), daysAgo(0)]
},
{
    id: 3,
    name: "Coding",
    frequency: "daily",
    completions: [daysAgo(10), daysAgo(9), daysAgo(8)]
}
]

export default habits;