import type { Address } from 'viem'

export enum ChallengeEvents {
  CREATED = 'Created',
  CONFIRMED = 'Confirmed',
  FULLFILLED = 'Fulfilled',
  EXPIRED = 'Expired',
}

export type Challenge = {
  owner: Address
  challengeId: bigint
  goal: string
  deadline: bigint
  supervisor: Address
  stake: bigint
  email: string
  supervisorEmail: string
}

export type CreatedChallenge = Challenge

export type ConfirmedChallenge = Omit<Challenge, 'supervisorEmail'>

export type ExpiredChallenge = Omit<Challenge, 'email' | 'supervisorEmail'>
