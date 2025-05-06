import { APP_CHAINS, CHALLENGE_ABI, CHALLENGE_CONTRACT_ADDRESS, PORT } from '@/constants.ts'
import { web3EventHandlers } from '@/handlers/event-handlers.ts'
import { ChallengeEvents } from '@/models/challenge.ts'
import { web3EventRepository } from '@/repositories/web3event-repository.ts'
import { appRouter } from '@/router.ts'
import { createHTTPServer } from '@trpc/server/adapters/standalone'

const server = createHTTPServer({
  router: appRouter,
  responseMeta: () => ({
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Method': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET',
      'Access-Control-Allow-Headers': '*',
    },
    status: 200,
  }),
})

server.listen(PORT)

server.on('listening', () => {
  for (const chain of APP_CHAINS) {
    const challengeAddress = CHALLENGE_CONTRACT_ADDRESS[chain.id]

    if (!challengeAddress) {
      continue
    }

    const unWatchCreatedEvent = web3EventRepository.subscribe(
      chain.id,
      ChallengeEvents.CREATED,
      web3EventHandlers.createdEvent,
      challengeAddress,
      CHALLENGE_ABI,
    )

    const unWatchConfirmedEvent = web3EventRepository.subscribe(
      chain.id,
      ChallengeEvents.CONFIRMED,
      web3EventHandlers.confirmedEvent,
      challengeAddress,
      CHALLENGE_ABI,
    )

    const unWatchExpiredEvent = web3EventRepository.subscribe(
      chain.id,
      ChallengeEvents.EXPIRED,
      web3EventHandlers.expiredEvent,
      challengeAddress,
      CHALLENGE_ABI,
    )
  }
})
