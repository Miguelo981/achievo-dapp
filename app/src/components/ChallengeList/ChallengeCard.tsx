import { Button } from '@/components/ui/button'
import { useChallengeCard } from '@/hooks/useChallengeCard'
import { useServiceOwner } from '@/hooks/useServiceOwner'
import { cn } from '@/lib/utils'
import { ChallengeStatus, type ChallengeCardWithId } from '@/models/challenge'
import { CircleCheckBig } from 'lucide-react'
import React from 'react'
import Countdown from 'react-countdown'
import { useTranslation } from 'react-i18next'

type ChallengeCardProps = React.HTMLAttributes<HTMLDivElement> & {
  challenge: ChallengeCardWithId
}

const ChallengeCard = ({ challenge, className, ...props }: ChallengeCardProps) => {
  const {
    connectedChain,
    withdraw,
    confirm,
    isWithdrawDisabled,
    isConfirmDisabled,
    withdrawBtnLabel,
    isSupervisor,
    isClaimDisabled,
    claim,
  } = useChallengeCard(challenge)
  const { t } = useTranslation()
  const { isServiceOwner } = useServiceOwner()

  return (
    <div className="bg-gradient-to-bl from-violet-300 via-rose-300 to-pink-400 p-0.5 rounded-2xl shadow-lg">
      <div className={cn('w-full bg-white rounded-2xl p-5 space-y-3', className)} {...props}>
        <h3 className="mb-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-pink-400 to-rose-400">
          {challenge.goal}
        </h3>

        <div className="flex items-center justify-between -mb-0">
          <p>{t('challenge_card.locked_amount')}</p>
          <p className="text-2xl font-black">
            {challenge.amount.formatted} <span className="text-lg">{connectedChain.nativeCurrency.symbol}</span>
          </p>
        </div>

        {challenge.state === ChallengeStatus.IN_PROGRESS ? (
          <p className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-700">{t('challenge_card.remaining_time')}</span>
            <Countdown
              className="font-black tabular-nums"
              date={new Date(challenge.deadline)}
              intervalDelay={0}
              precision={3}
            />
          </p>
        ) : (
          <div className="mb-6">
            <p className="flex items-center gap-1.5 text-green-600 bg-green-50 w-fit px-4 py-1.5 rounded-3xl text-sm">
              {t('challenge_card.completed')} <CircleCheckBig className="h-3.5 w-auto" />
            </p>
          </div>
        )}
        {isSupervisor ? (
          <Button className="w-full" onClick={() => confirm()} disabled={isConfirmDisabled}>
            {t('challenge_actions.confirm')}
          </Button>
        ) : isServiceOwner ? (
          <Button className="w-full" onClick={() => claim()} disabled={isClaimDisabled}>
            {t('challenge_actions.claim')}
          </Button>
        ) : (
          <Button className="w-full" onClick={() => withdraw()} disabled={isWithdrawDisabled}>
            {withdrawBtnLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default ChallengeCard
