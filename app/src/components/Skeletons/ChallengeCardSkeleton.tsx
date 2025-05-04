const ChallengeCardSkeleton = () => {
  return (
    <div role="status" className="max-w-sm p-4 border border-gray-200 rounded-xl shadow-sm animate-pulse md:p-6">
      <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full mb-5"></div>

      <div className="flex items-center justify-center h-8 bg-gray-300 rounded-sm" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default ChallengeCardSkeleton
