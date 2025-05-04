import { bsc, localhost } from 'viem/chains'
import { createConfig, http } from 'wagmi'

export const wagmiConfig = createConfig({
  chains: [bsc, localhost],
  transports: {
    [bsc.id]: http(),
    [localhost.id]: http(),
  },
})
