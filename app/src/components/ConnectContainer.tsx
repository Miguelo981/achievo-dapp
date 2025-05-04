import { ConnectButton } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

const ConnectContainer = () => {
  return <ConnectButton accountStatus="avatar" label="Connect now" chainStatus="icon" showBalance />
}

export default ConnectContainer
