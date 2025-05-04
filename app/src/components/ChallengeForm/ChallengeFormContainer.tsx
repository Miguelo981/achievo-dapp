import ChallengeForm from '@/components/ChallengeForm/ChallengeForm'
import FeePricePreview from '@/components/Fee/FeePricePreview'
import { useCreateChallenge } from '@/hooks/useCreateChallenge'
import type { Challenge, ChallengeFields } from '@/models/challenge'
import { cryptoRepository } from '@/repositories/crypto-repository'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { parseEther } from 'viem'

const ChallengeFormContainer = () => {
  const { t } = useTranslation()
  const [formKey, setFormKey] = useState(crypto.randomUUID())
  const [isEncryptingEmails, setEncryptingEmails] = useState(false)
  const [challenge, setChallenge] = useState<Challenge | undefined>()
  const {
    writeContract: { writeContract },
    isLoadingGas,
    estimatedFee,
    transaction,
  } = useCreateChallenge(challenge, {
    mutation: {
      onSuccess: () => {
        setChallenge(undefined)
        setFormKey(crypto.randomUUID())
      },
    },
  })

  const handleChange = useCallback(
    async (data: ChallengeFields) => {
      setEncryptingEmails(true)

      const [encryptedSignerEmail, encryptedSupervisorEmail] = await Promise.all([
        cryptoRepository.encryptEmail(data.signerEmail),
        cryptoRepository.encryptEmail(data.supervisorEmail),
      ])

      const parsedData: Challenge = {
        goal: data.goal,
        deadline: new Date(data.deadline).getTime(),
        supervisor: data.supervisorAddress,
        amount: parseEther(String(data.lockedAmount)),
        email: encryptedSignerEmail,
        supervisorEmail: encryptedSupervisorEmail,
      }

      console.log(parsedData)
      setChallenge(parsedData)
      setEncryptingEmails(false)
    },
    [setChallenge],
  )

  const handleSubmit = useCallback(async () => {
    writeContract()
  }, [writeContract])

  useEffect(() => {
    if (!transaction.isSuccess || !transaction.data) return

    toast.success(t('toast.challenge_created'), { duration: 5000 })
  }, [transaction.isSuccess, transaction.data, t])

  const isDisabled = useMemo(
    () => isLoadingGas || transaction.isLoading || isEncryptingEmails,
    [challenge, isLoadingGas],
  )

  return (
    <div className="rounded-3xl bg-white border border-gray-100 bg-shadow p-10 min-h-[430px] w-lg">
      <ChallengeForm
        onSubmit={handleSubmit}
        /* @ts-ignore */
        onChange={handleChange}
        onValid={console.log}
        disabled={isDisabled}
        key={formKey}
        className="space-y-5 min-w-[400px]"
      />

      <footer className="mt-2">
        {estimatedFee && (
          <FeePricePreview
            label={t('gas_fee.label')}
            fee={estimatedFee}
            className="text-gray-600 text-end text-sm space-x-1"
          />
        )}
      </footer>
    </div>
  )
}

export default ChallengeFormContainer
