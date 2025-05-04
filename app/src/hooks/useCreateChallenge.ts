import { EMPTY_WRITE_CONTRACT_PARAMS } from '@/constants'
import { useWriteContractWithEstimatedFee } from '@/hooks/useWriteContractWithEstimatedFee'
import type { Challenge } from '@/models/challenge'
import { challengeRepository } from '@/repositories/challenge-repository'
import { useMemo } from 'react'
import type { UseWriteContractParameters } from 'wagmi'

export const useCreateChallenge = (challenge?: Challenge, config?: UseWriteContractParameters) => {
  const params = useMemo(() => {
    if (!challenge)
      return {
        ...EMPTY_WRITE_CONTRACT_PARAMS,
        enabled: false,
      }
    console.log(challengeRepository.create(challenge))

    return challengeRepository.create(challenge)
  }, [challenge])
  const { writeContract, isLoadingGas, estimatedFee, transaction } = useWriteContractWithEstimatedFee(params, config)

  return {
    writeContract,
    isLoadingGas,
    estimatedFee,
    transaction,
  }
}
