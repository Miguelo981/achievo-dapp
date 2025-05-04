import { useWriteContractWithEstimatedFee } from '@/hooks/useWriteContractWithEstimatedFee'
import { usdcRepository } from '@/repositories/usdc-repo'
import { useAccount } from 'wagmi'

export const useTransferUsdc = ({ recipient, amount }: any) => {
  const { isConnected } = useAccount()
  const params = {
    ...usdcRepository.transfer(recipient, amount),
    enabled: isConnected,
  }
  const { writeContract, isLoadingGas, estimatedFee, transaction } = useWriteContractWithEstimatedFee(params)

  return {
    writeContract,
    isLoadingGas,
    estimatedFee,
    transaction,
  }
}
