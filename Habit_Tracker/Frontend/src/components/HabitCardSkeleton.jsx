function HabitCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-5 border border-gray-100 animate-pulse">
      <div className="h-6 w-1/3 bg-gray-200 rounded mb-3" />
      <div className="h-4 w-1/4 bg-gray-200 rounded mb-6" />
      <div className="flex gap-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-200" />
        ))}
      </div>
      <div className="h-12 w-full bg-gray-200 rounded-xl mt-6" />
    </div>
  );
}

export default HabitCardSkeleton;
