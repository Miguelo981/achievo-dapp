import type { ChallengeCard, ChallengeResult } from '@/models/challenge'
import { formatEther } from 'viem'

export class ChallengeAdapter {
  public static parse(challenge: ChallengeResult): ChallengeCard {
    return {
      goal: challenge[0],
      deadline: new Date(Number(challenge[1])),
      supervisor: challenge[2],
      amount: {
        value: challenge[3],
        formatted: formatEther(challenge[3]),
      },
      state: Number(challenge[4]),
    }
  }
}
