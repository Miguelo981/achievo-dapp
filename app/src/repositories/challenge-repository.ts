import { CHALLENGE_TOKEN_ABI, CONTRACTS } from '@/constants'
import { type Address } from 'viem'

type CreateChallenge = {
  goal: string
  deadline: number
  supervisor: Address
  amount: bigint
  email: string
  supervisorEmail: string
}

const challengeContractActions = () => {
  const withdraw = (challengeId: bigint) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'withdrawStake',
    args: [challengeId],
  })

  const getServiceOwner = () => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'serviceOwner',
  })

  const minStake = () => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'minimumStake',
  })

  const getOwner = (challengeId: string) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'getOwnerOfChallenge',
    args: [challengeId],
  })

  const length = (owner: Address) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'getNumberOfChallenges',
    args: [owner],
  })

  const getIdsByOwner = () => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'getChallengesOfOwner',
  })

  const get = (challengeId: bigint) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'getChallenge',
    args: [challengeId],
  })

  const create = (params: CreateChallenge) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'createChallenge',
    args: [params.goal, params.deadline, params.supervisor, params.email, params.supervisorEmail],
    value: params.amount,
  })

  const confirm = (challengeId: bigint) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'confirmChallenge',
    args: [challengeId],
  })

  const claimStake = (challengeId: bigint) => ({
    abi: CHALLENGE_TOKEN_ABI,
    address: CONTRACTS.CHALLENGE_ADDRESS,
    functionName: 'claimStake',
    args: [challengeId],
  })

  return {
    withdraw,
    getServiceOwner,
    minStake,
    getOwner,
    length,
    getIdsByOwner,
    get,
    create,
    confirm,
    claimStake,
  } as const
}

export const challengeRepository = challengeContractActions()
