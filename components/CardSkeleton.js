export default function CardSkeleton({ count = 6 }) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(i);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="skeleton w-12 h-12 rounded-lg"></div>
            <div className="flex-1">
              <div className="skeleton h-4 w-28 mb-2"></div>
              <div className="skeleton h-3 w-16"></div>
            </div>
          </div>
          <div className="skeleton h-3 w-16 mt-4"></div>
          <div className="skeleton h-6 w-24 mt-2"></div>
        </div>
      ))}
    </div>
  );
}
