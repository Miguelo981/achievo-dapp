import CHALLENGE_CORE_CONTRACT from '@contracts/ChallengeCore.sol/ChallengeCore.json' with { type: 'json' }
import { bsc, localhost, mainnet, polygon, sepolia } from '@wagmi/core/chains'
import process from 'node:process'
import { type Address, type Chain, getAddress } from 'viem'

export const CHALLENGE_ABI = CHALLENGE_CORE_CONTRACT.abi

export const SECRET = process.env.SECRET!
export const PORT = Number(process.env.PORT!)
export const INFURA_API_KEY = process.env.INFURA_API_KEY!
export const RESEND_API_KEY = process.env.RESEND_API_KEY!
export const DEFAULT_FROM_EMAIL = process.env.OWNER_EMAIL!
export const APP_HOST = process.env.APP_HOST!

export const MAINET_CHALLENGE_ADDRESS: Address = process.env.MAINET_CHALLENGE_ADDRESS!
export const SEPOLIA_CHALLENGE_ADDRESS: Address = process.env.SEPOLIA_CHALLENGE_ADDRESS!
export const BSC_CHALLENGE_ADDRESS: Address = process.env.BSC_CHALLENGE_ADDRESS!
export const GANACHE_CHALLENGE_ADDRESS: Address = getAddress(process.env.GANACHE_CHALLENGE_ADDRESS!)
export const POLYGON_CHALLENGE_ADDRESS: Address = process.env.POLYGON_CHALLENGE_ADDRESS!

export const ALGORITHM = 'aes-256-cbc'
export const IV_LENGTH = 16

export const APP_CHAINS: Chain[] = [mainnet, sepolia, bsc, localhost, polygon]

export const CHALLENGE_CONTRACT_ADDRESS: Record<Chain['id'], Address> = {
  [mainnet.id]: MAINET_CHALLENGE_ADDRESS,
  [sepolia.id]: SEPOLIA_CHALLENGE_ADDRESS,
  [bsc.id]: BSC_CHALLENGE_ADDRESS,
  [localhost.id]: GANACHE_CHALLENGE_ADDRESS,
  [polygon.id]: POLYGON_CHALLENGE_ADDRESS,
}
