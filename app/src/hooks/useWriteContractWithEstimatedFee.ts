import type { Web3Amount } from '@/models/web3'
import type { MutateOptions } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import { encodeFunctionData, formatEther, type Address, type WriteContractParameters } from 'viem'
import {
  useEstimateGas,
  useGasPrice,
  useWaitForTransactionReceipt,
  useWriteContract,
  type Config,
  type UseWriteContractParameters,
} from 'wagmi'

export type WriteContractParams = Omit<WriteContractParameters, 'chain' | 'account'> & {
  enabled?: boolean
  refetchInterval?: number
}

export const useWriteContractWithEstimatedFee = <T = unknown>(
  { enabled = true, refetchInterval, ...params }: WriteContractParams,
  config?: UseWriteContractParameters<Config, T>,
) => {
  const { data: gasPrice } = useGasPrice({
    query: { enabled, refetchInterval: 1_000, refetchIntervalInBackground: !!refetchInterval },
  })
  const {
    data: estimatedGas,
    isLoading: isLoadingGas,
    error: gasError,
  } = useEstimateGas({
    to: params.address,
    data: params.functionName ? encodeFunctionData(params) : '0x',
    value: params.value,
    query: {
      enabled,
    },
  })
  const { writeContract: proxyWriteContract, ...rest } = useWriteContract(config)

  const estimatedFee = useMemo<Web3Amount | undefined>(() => {
    if (!estimatedGas || !gasPrice) return

    const estimatedGasCost = gasPrice * estimatedGas

    return {
      value: estimatedGasCost,
      formatted: formatEther(estimatedGasCost),
    }
  }, [gasPrice, isLoadingGas, estimatedGas])

  const writeContract = useCallback(
    async (
      overrides?: Partial<WriteContractParameters>,
      options?: MutateOptions<Address, unknown, unknown, unknown>,
    ) => {
      if (!enabled) return

      const mergedParams = {
        ...params,
        gasPrice,
        ...overrides,
      } as WriteContractParameters

      return await proxyWriteContract(mergedParams, options)
    },
    [params, gasPrice, proxyWriteContract],
  )

  const transaction = useWaitForTransactionReceipt({
    hash: rest.data,
    query: {
      enabled: !!rest.data,
    },
  })

  return {
    isLoadingGas,
    gasError,
    writeContract: {
      ...rest,
      writeContract,
    },
    estimatedFee,
    transaction,
  } as const
}
