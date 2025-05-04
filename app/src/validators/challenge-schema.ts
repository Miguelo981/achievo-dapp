import type { ChallengeStepFormFields, SignerStepFormFields } from '@/models/challenge'
import { isAddress } from 'viem'
import { z } from 'zod'

export const challengeStepFormSchema = z.object({
  goal: z.string().min(1, '¡El objetivo es obligatorio!'),
  deadline: z.coerce.date().min(new Date(), 'La fecha debe ser posterior a la actual.'),
  lockedAmount: z.coerce.number().min(0.01, 'La cantidad mínima es 0.01'),
}) satisfies z.ZodType<ChallengeStepFormFields>

export const signerStepFormSchema = z.object({
  signerEmail: z.string().email('Email inválido'),
}) satisfies z.ZodType<SignerStepFormFields>

export const supervisorStepFormSchema = z.object({
  supervisorAddress: z
    .string()
    .min(1, 'La dirección del supervisor es obligatoria.')
    .refine((address) => isAddress(address), 'La dirección debe ser valida'),
  supervisorEmail: z.string().email('Email inválido'),
})
