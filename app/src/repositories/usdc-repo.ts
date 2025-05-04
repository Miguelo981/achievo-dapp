import { CONTRACTS, USDC_TOKEN_ABI } from '@/constants'
import { type Address } from 'viem'

const usdcRepoActions = () => {
  const transfer = (recipient: Address, amount: bigint) => ({
    abi: USDC_TOKEN_ABI,
    address: CONTRACTS.BSC_USDC_ADDRESS,
    functionName: 'transfer',
    args: [recipient, amount],
  })

  return {
    transfer,
  } as const
}

export const usdcRepository = usdcRepoActions()
