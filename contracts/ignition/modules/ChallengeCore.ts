import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const ChallengeCore = buildModule('ChallengeCore', (m) => {
  const challenge = m.contract('ChallengeCore', [])

  return { challenge }
})

export default ChallengeCore
