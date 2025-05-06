import { INFURA_API_KEY } from '@/constants.ts'
import { createConfig, http } from '@wagmi/core'
import { bsc, localhost, mainnet, sepolia } from '@wagmi/core/chains'

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, bsc, localhost],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_API_KEY}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`),
    [bsc.id]: http('https://bsc-dataseed1.binance.org'),
    [localhost.id]: http('http://localhost:8545'),
  },
})
