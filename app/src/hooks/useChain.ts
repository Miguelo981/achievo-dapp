import { useMemo } from 'react'
import { useChainId, useChains } from 'wagmi'

export const useChain = () => {
  const chains = useChains()
  const chainId = useChainId()

  const chain = useMemo(() => chains?.find((c) => c.id === chainId)!, [chainId, chains])

  return chain
}
