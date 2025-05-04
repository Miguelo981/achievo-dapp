import ChallengeCard from '@/components/ChallengeList/ChallengeCard'
import ChallengeCardSkeleton from '@/components/Skeletons/ChallengeCardSkeleton'
import { useChallenge } from '@/hooks/useChallenge'

type ChallengeDetailContainerProps = {
  challengeId: string
}

const ChallengeDetailContainer = ({ challengeId }: ChallengeDetailContainerProps) => {
  const { challenge, isLoading } = useChallenge(challengeId)

  return (
    <div className="md:w-[400px]">
      {isLoading || !challenge ? <ChallengeCardSkeleton /> : <ChallengeCard challenge={challenge} />}
    </div>
  )
}

export default ChallengeDetailContainer
