import { SERVER_HOST } from '@/constants'
import type { AppRouter } from '@server/trpc-types'
import { createTRPCClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: SERVER_HOST,
    }),
  ],
})
