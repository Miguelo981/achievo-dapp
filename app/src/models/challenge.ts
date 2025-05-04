import type { Web3Amount } from '@/models/web3'
import type { Address } from 'viem'

export interface Challenge {
  goal: string
  deadline: number
  supervisor: Address
  amount: bigint
  email: string
  supervisorEmail: string
}

export type ChallengeFields = {
  goal: string
  deadline: Date
  lockedAmount: number
  signerEmail: string
  supervisorEmail: string
  supervisorAddress: Address
}

export enum ChallengeFormStep {
  CHALLENGE,
  SIGNER,
  SUPERVISOR,
}

export type ChallengeStepFormFields = Pick<ChallengeFields, 'goal' | 'deadline' | 'lockedAmount'>

export type SignerStepFormFields = Pick<ChallengeFields, 'signerEmail'>

export type SupervisorStepFormFields = Pick<ChallengeFields, 'supervisorEmail' | 'supervisorAddress'>

export type ChallengeResult = [string, bigint, Address, bigint, bigint]

export enum ChallengeStatus {
  IN_PROGRESS = 0,
  CONFIRMED = 1,
  FULLFILLED = 2,
  EXPIRED = 3,
}

export type ChallengeCard = {
  goal: string
  deadline: Date
  supervisor: Address
  amount: Web3Amount
  state: ChallengeStatus
}

export type ChallengeCardWithId = ChallengeCard & {
  id: number
}
