import { queryClient } from '@/conf/query-client'
import { rainbowkitConfig, theme } from '@/conf/ranbowkit'
import { wagmiConfig } from '@/conf/wagmi'
import { buildProviderTree } from '@/lib/build-provider-tree'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { WagmiProvider } from 'wagmi'

const ProviderTree = buildProviderTree([
  [WagmiProvider, { config: wagmiConfig }],
  [QueryClientProvider, { client: queryClient }],
  [RainbowKitProvider, { config: rainbowkitConfig, theme }],
])

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ProviderTree>{children}</ProviderTree>
}

export default Providers
