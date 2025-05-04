import USDC_ABI from '@/assets/abis/usdc-abi.json'
import { ChallengeFormStep } from '@/models/challenge'
import type { Language } from '@/models/i18n'
import { challengeStepFormSchema, signerStepFormSchema, supervisorStepFormSchema } from '@/validators/challenge-schema'
import CHALLENGE_CORE_CONTRACT from '@contracts/ChallengeCore.sol/ChallengeCore.json'
import { type Abi, type Address, getAddress } from 'viem'
import type { ZodSchema } from 'zod'

export const CHALLENGE_ABI = CHALLENGE_CORE_CONTRACT.abi
export const WALLET_CONNECT_PROJECT_ID = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID

const BSC_USDC_ADDRESS: Address = '0x190b589cf9Fb8DDEabBFeae36a813FFb2A702454' as const
const CHALLENGE_ADDRESS: Address = getAddress(import.meta.env.VITE_MAINET_CHALLENGE_TOKEN_ADDRESS!)

export const CONTRACTS = {
  BSC_USDC_ADDRESS,
  CHALLENGE_ADDRESS,
} as const

export const CHALLENGE_TOKEN_ABI = CHALLENGE_ABI as Abi
export const USDC_TOKEN_ABI = USDC_ABI as Abi

export const CHALLENGE_FORM_SCHEMAS: Record<ChallengeFormStep, ZodSchema> = {
  [ChallengeFormStep.CHALLENGE]: challengeStepFormSchema,
  [ChallengeFormStep.SIGNER]: signerStepFormSchema,
  [ChallengeFormStep.SUPERVISOR]: supervisorStepFormSchema,
} as const

export const EMPTY_WRITE_CONTRACT_PARAMS = {
  abi: CHALLENGE_TOKEN_ABI,
  address: '0x' as Address,
  functionName: '',
  args: [],
} as const

export const LANGUAGES: Language[] = ['en']

export const DEFAULT_LANGUAGE: Language = 'en'

export const SERVER_HOST = new URL(import.meta.env.VITE_SERVER_HOST)

export const SENTRY_DNS_KEY = import.meta.env.VITE_SENTRY_DNS_KEY!
