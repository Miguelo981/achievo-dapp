import { challengeRepository } from '@/repositories/challenge-repository'
import { useAccount, useReadContract } from 'wagmi'

export const useChallengeCount = () => {
  const { address, isConnected } = useAccount()
  const challengeCount = useReadContract({
    ...challengeRepository.length(address!),
    query: {
      enabled: isConnected,
    },
  })

  return challengeCount
}
