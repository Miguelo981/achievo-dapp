import { useWriteContractWithEstimatedFee } from '@/hooks/useWriteContractWithEstimatedFee'
import { challengeRepository } from '@/repositories/challenge-repository'

export const useClaimChallengeStake = (id: number) => {
  const claimState = useWriteContractWithEstimatedFee(challengeRepository.claimStake(BigInt(id)))

  return claimState
}
