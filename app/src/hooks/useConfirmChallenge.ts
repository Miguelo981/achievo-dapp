import { useWriteContractWithEstimatedFee } from '@/hooks/useWriteContractWithEstimatedFee'
import { challengeRepository } from '@/repositories/challenge-repository'

export const useConfirmChallenge = (id: number) => {
  const confirmChallenge = useWriteContractWithEstimatedFee(challengeRepository.confirm(BigInt(id)))

  return confirmChallenge
}
