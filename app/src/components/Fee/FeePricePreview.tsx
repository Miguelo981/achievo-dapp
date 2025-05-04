import { useChain } from '@/hooks/useChain'
import type { Web3Amount } from '@/models/web3'
import React, { useMemo } from 'react'

type FeePricePreviewProps = React.HTMLAttributes<HTMLDivElement> & {
  label: string
  fee?: Web3Amount
}

const FeePricePreview = ({ label, fee, ...props }: FeePricePreviewProps) => {
  const connectedChain = useChain()

  const feeInCurrency = useMemo(() => {
    if (!fee || !connectedChain) return undefined

    return Math.round(Number(fee.formatted) * 534.6 * 100) / 100
  }, [fee, connectedChain])

  return (
    <div {...props}>
      <span>{label}</span>
      {fee && (
        <span>
          {fee.formatted} {connectedChain?.nativeCurrency.symbol} (${feeInCurrency})
        </span>
      )}
    </div>
  )
}

export default FeePricePreview
