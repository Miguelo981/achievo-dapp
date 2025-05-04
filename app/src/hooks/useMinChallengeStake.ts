import { challengeRepository } from '@/repositories/challenge-repository'
import { useMemo } from 'react'
import { formatEther } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useMinChallengeStake = () => {
  const { isConnected } = useAccount()
  const minStake = useReadContract({
    ...challengeRepository.minStake(),
    query: {
      enabled: isConnected,
    },
  })

  const minStakeValue = useMemo(() => {
    if (!minStake.data) return

    return {
      value: minStake.data,
      formatted: formatEther(minStake.data as bigint),
    }
  }, [minStake.data])

  return {
    ...minStake,
    minStakeValue,
  } as const
}
