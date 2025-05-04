import { trpc } from '@/services/trpc'

const cryptoActions = () => {
  const encryptEmail = async (email: string) => {
    return await trpc.encryptEmail.mutate({ email })
  }

  const decryptEmail = async (encryptedEmail: string) => {
    return await trpc.decryptEmail.query(encryptedEmail)
  }

  return {
    encryptEmail,
    decryptEmail,
  } as const
}

export const cryptoRepository = cryptoActions()
