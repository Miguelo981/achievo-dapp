import { cryptoRepository } from '@/repositories/crypto-repository.ts'
import { z } from 'zod'
import { publicProcedure, router } from './trpc.ts'

export const appRouter = router({
  encryptEmail: publicProcedure.input(z.object({ email: z.string().email() })).mutation((opts) => {
    const { input } = opts

    /* @ts-ignore */
    return cryptoRepository.encrypt(input.email)
  }),
  decryptEmail: publicProcedure.input(z.string().min(1)).query((opts) => {
    const { input } = opts

    /* @ts-ignore */
    return cryptoRepository.decrypt(input)
  }),
})

export type AppRouter = typeof appRouter
