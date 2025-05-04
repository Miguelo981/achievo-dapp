import { WALLET_CONNECT_PROJECT_ID } from '@/constants'
import { getDefaultConfig, lightTheme } from '@rainbow-me/rainbowkit'
import { bsc, localhost } from 'viem/chains'

export const rainbowkitConfig = getDefaultConfig({
  appName: 'My SPdApp',
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [bsc, localhost],
})

export const theme = lightTheme({
  accentColor: '#ff7f00',
  accentColorForeground: 'white',
  borderRadius: 'large',
  fontStack: 'system',
  overlayBlur: 'large',
})
