import { wagmiConfig } from '@/conf/wagmi.ts'
import { APP_CHAINS, DEFAULT_FROM_EMAIL } from '@/constants.ts'
import { ConfirmedChallenge, CreatedChallenge, ExpiredChallenge } from '@/models/challenge.ts'
import type { BlockchainLog, ChainId } from '@/models/web3.ts'
import { cryptoRepository } from '@/repositories/crypto-repository.ts'
import { emailRepository } from '@/repositories/email-repository.ts'
import { emailTemplateRepository } from '@/repositories/email-template-repository.ts'
import { waitForTransactionReceipt } from '@wagmi/core'
import { formatEther } from 'viem'

const web3EventHandlerActions = () => {
  const createdEvent = async (chainId: ChainId, logs: BlockchainLog<CreatedChallenge>[]) => {
    const [firstLog] = logs
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: firstLog.transactionHash, chainId })

    if (receipt.status !== 'success') return

    const chain = APP_CHAINS.find((c) => c.id === chainId)
    const { email, supervisorEmail, ...rest } = firstLog.args
    const decryptedEmail = cryptoRepository.decrypt(email as string)
    const decryptedSupervisorEmail = cryptoRepository.decrypt(supervisorEmail as string)

    const { title: createdTitle, template: createdTemplate } = emailTemplateRepository.created({
      ...rest,
      stake: formatEther(rest.stake),
      email: decryptedEmail,
      supervisorEmail: decryptedSupervisorEmail,
      symbol: chain.nativeCurrency.symbol,
    })

    await emailRepository.send({
      to: [decryptedEmail],
      subject: createdTitle,
      html: createdTemplate,
    })

    const { title: confirmTitle, template: confirmTemplate } = emailTemplateRepository.confirm({
      ...rest,
      email: decryptedEmail,
      supervisorEmail: decryptedSupervisorEmail,
    })

    await emailRepository.send({
      to: [decryptedSupervisorEmail],
      subject: confirmTitle,
      html: confirmTemplate,
    })
  }

  const confirmedEvent = async (chainId: ChainId, logs: BlockchainLog<ConfirmedChallenge>[]) => {
    const [firstLog] = logs
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: firstLog.transactionHash, chainId })

    if (receipt.status !== 'success') return

    const { email, ...rest } = firstLog.args
    const decryptedEmail = cryptoRepository.decrypt(email as string)

    const { title, template } = emailTemplateRepository.confirmed({
      ...rest,
      email: decryptedEmail,
    })

    await emailRepository.send({
      to: [decryptedEmail],
      subject: title,
      html: template,
    })
  }

  const expiredEvent = async (chainId: ChainId, logs: BlockchainLog<ExpiredChallenge>[]) => {
    const [firstLog] = logs
    const receipt = await waitForTransactionReceipt(wagmiConfig, { hash: firstLog.transactionHash, chainId })

    if (receipt.status !== 'success') return

    const { title, template } = emailTemplateRepository.expired(firstLog.args)

    await emailRepository.send({
      to: [DEFAULT_FROM_EMAIL],
      subject: title,
      html: template,
    })
  }

  return {
    createdEvent,
    confirmedEvent,
    expiredEvent,
  } as const
}

export const web3EventHandlers = web3EventHandlerActions()
