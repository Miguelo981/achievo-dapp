import { wagmiConfig } from '@/conf/wagmi.ts'
import type { Address } from 'viem'

export type BlockchainLog<T = unknown> = {
  eventName: string
  args: T
  transactionHash: Address
}

export type ChainId = (typeof wagmiConfig)['chains'][number]['id']
