import { useChain } from '@/hooks/useChain'
import { useMinChallengeStake } from '@/hooks/useMinChallengeStake'
import React from 'react'
import { useTranslation } from 'react-i18next'

type MinChallengeStakeProps = React.HTMLAttributes<HTMLDivElement>

const MinChallengeStake = ({ ...props }: MinChallengeStakeProps) => {
  const { t } = useTranslation()
  const { isLoading, minStakeValue } = useMinChallengeStake()
  const connectedChain = useChain()

  return (
    <div {...props}>
      <p className="text-xs">
        {isLoading
          ? t('stake.loading')
          : `(${t('stake.min')}: ${minStakeValue?.formatted} ${connectedChain.nativeCurrency.symbol})`}
      </p>
    </div>
  )
}

export default MinChallengeStake
