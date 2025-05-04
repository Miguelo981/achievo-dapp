import { useWriteContractWithEstimatedFee } from '@/hooks/useWriteContractWithEstimatedFee'
import { challengeRepository } from '@/repositories/challenge-repository'

export const useWithdrawChallenge = (id: number) => {
  const withdrawChallenge = useWriteContractWithEstimatedFee(challengeRepository.withdraw(BigInt(id)))

  return withdrawChallenge
}
