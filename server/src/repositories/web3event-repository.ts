import { wagmiConfig } from '@/conf/wagmi.ts'
import { ChainId } from '@/models/web3.ts'
import { watchContractEvent } from '@wagmi/core'
import type { Abi, Address } from 'viem'

const web3EventActions = () => {
  const subscribe = (
    chainId: ChainId,
    eventName: string,
    onLogs: (chainId: ChainId, logs: any) => void,
    address: Address,
    abi: Abi,
    onError?: (error: unknown) => void,
  ) => {
    const unwatch = watchContractEvent(wagmiConfig, {
      chainId,
      abi,
      address,
      eventName,
      onLogs: (logs) => onLogs(chainId, logs),
      onError,
    })

    return {
      unwatch,
    } as const
  }

  return {
    subscribe,
  } as const
}

export const web3EventRepository = web3EventActions()
