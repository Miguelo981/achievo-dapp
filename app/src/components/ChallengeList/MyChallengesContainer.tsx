import ChallengeList from '@/components/ChallengeList/ChallengeList'
import ChallengeListSkeleton from '@/components/Skeletons/ChallengeListSkeleton'
import { useMyChallenges } from '@/hooks/useMyChallenges'

const MyChallengesContainer = () => {
  const { challenges, isLoading } = useMyChallenges()

  return (
    <>
      <h2 className="text-center font-black text-5xl mb-6 uppercase">My Challenges</h2>

      <section className="max-w-5xl mx-auto px-5 mg:px-0">
        {isLoading ? <ChallengeListSkeleton className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" /> : null}

        {!isLoading && challenges.length > 0 && (
          <ChallengeList className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3" challenges={challenges} />
        )}
      </section>
    </>
  )
}

export default MyChallengesContainer
