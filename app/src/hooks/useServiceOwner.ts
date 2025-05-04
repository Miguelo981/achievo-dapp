import { challengeRepository } from '@/repositories/challenge-repository'
import { useMemo } from 'react'
import { getAddress, isAddressEqual } from 'viem'
import { useAccount, useReadContract } from 'wagmi'

export const useServiceOwner = () => {
  const { address, isConnected } = useAccount()
  const serviceOwner = useReadContract({
    ...challengeRepository.getServiceOwner(),
    query: {
      enabled: isConnected,
    },
  })

  const isServiceOwner = useMemo(
    () => serviceOwner.data && address && isAddressEqual(getAddress(serviceOwner.data as string), address),
    [serviceOwner.data, address],
  )

  return {
    ...serviceOwner,
    isServiceOwner,
  } as const
}
