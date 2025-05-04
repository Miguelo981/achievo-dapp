import { useChain } from '@/hooks/useChain'
import { useConfirmChallenge } from '@/hooks/useConfirmChallenge'
import { useWithdrawChallenge } from '@/hooks/useWithdrawChallenge'
import { ChallengeStatus, type ChallengeCardWithId } from '@/models/challenge'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { isAddressEqual } from 'viem'
import { useAccount } from 'wagmi'
import { useClaimChallengeStake } from './useClaimChallengeStake'

export const useChallengeCard = (challenge: ChallengeCardWithId) => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const connectedChain = useChain()
  const {
    writeContract: { writeContract: withdraw },
    transaction: withdrawTransaction,
  } = useWithdrawChallenge(challenge.id)
  const {
    writeContract: { writeContract: confirm },
    transaction: confirmTransaction,
  } = useConfirmChallenge(challenge.id)
  const {
    writeContract: { writeContract: claim },
    transaction: claimTransaction,
  } = useClaimChallengeStake(challenge.id)

  const isWithdrawDisabled = useMemo(
    () => challenge.state === ChallengeStatus.IN_PROGRESS || challenge.state === ChallengeStatus.FULLFILLED,
    [challenge.state],
  )
  const isConfirmDisabled = useMemo(() => challenge.state !== ChallengeStatus.IN_PROGRESS, [challenge.state])
  const isClaimDisabled = useMemo(() => challenge.state !== ChallengeStatus.EXPIRED, [challenge.state])

  const withdrawBtnLabel = useMemo(() => {
    if (challenge.state === ChallengeStatus.FULLFILLED) return 'Withdrawed'

    return 'Withdraw'
  }, [challenge.state])

  const isSupervisor = useMemo(
    () => challenge?.supervisor && address && isAddressEqual(challenge?.supervisor, address),
    [challenge?.supervisor, address],
  )

  useEffect(() => {
    if (!withdrawTransaction.data || !withdrawTransaction.isSuccess) return

    toast.success(t('toast.challenge_withdrawn'))
  }, [withdrawTransaction.isSuccess, withdrawTransaction.data, t])

  useEffect(() => {
    if (!confirmTransaction.data || !confirmTransaction.isSuccess) return

    toast.success(t('toast.challenge_confirmed'))
  }, [confirmTransaction.isSuccess, confirmTransaction.data, t])

  useEffect(() => {
    if (!claimTransaction.data || !claimTransaction.isSuccess) return

    toast.success(t('toast.challenge_claimed'))
  }, [claimTransaction.isSuccess, claimTransaction.data, t])

  return {
    connectedChain,
    withdraw,
    confirm,
    isWithdrawDisabled,
    isConfirmDisabled,
    withdrawBtnLabel,
    isSupervisor,
    isClaimDisabled,
    claim,
  }
}
