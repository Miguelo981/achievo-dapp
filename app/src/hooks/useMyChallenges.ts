import { ChallengeAdapter } from '@/adapters/challenge-adapter'
import type { ChallengeCardWithId, ChallengeResult } from '@/models/challenge'
import { challengeRepository } from '@/repositories/challenge-repository'
import { useMemo } from 'react'
import { useAccount, useReadContract, useReadContracts } from 'wagmi'

export const useMyChallenges = () => {
  const { isConnected } = useAccount()
  const myChallengeIds = useReadContract({
    ...challengeRepository.getIdsByOwner(),
    query: {
      enabled: isConnected,
    },
  })
  const myChallenges = useReadContracts({
    contracts: (myChallengeIds.data as bigint[])?.map((id) => ({ ...challengeRepository.get(id) })),
    query: {
      enabled: myChallengeIds.isSuccess,
    },
  })

  const challenges = useMemo<ChallengeCardWithId[]>(
    () =>
      myChallenges.data
        ?.filter((d): d is { result: ChallengeResult; status: 'success' } => d.status === 'success')
        .map(({ result }: { result: ChallengeResult }, index) => ({
          id: index,
          ...ChallengeAdapter.parse(result),
        })) ?? [],
    [myChallenges.data],
  )

  return {
    ...myChallenges,
    challenges,
  } as const
}
