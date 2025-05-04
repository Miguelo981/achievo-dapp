import { ChallengeAdapter } from '@/adapters/challenge-adapter'
import { type ChallengeCardWithId, type ChallengeResult } from '@/models/challenge'
import { challengeRepository } from '@/repositories/challenge-repository'
import { useMemo } from 'react'
import { isAddressEqual } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useChallenge = (id: string) => {
  const { isConnected, address } = useAccount()
  const challengeQuery = useReadContract({
    ...challengeRepository.get(BigInt(id)),
    query: {
      enabled: isConnected,
    },
  })

  const challenge = useMemo<ChallengeCardWithId | undefined>(
    () =>
      challengeQuery.data
        ? {
            id: Number(id),
            ...ChallengeAdapter.parse(challengeQuery.data as ChallengeResult),
          }
        : undefined,
    [challengeQuery.data],
  )

  const isSupervisor = useMemo(
    () => challenge?.supervisor && address && isAddressEqual(challenge?.supervisor, address),
    [challenge?.supervisor, address],
  )

  return {
    ...challengeQuery,
    challenge,
    isSupervisor,
  } as const
}
