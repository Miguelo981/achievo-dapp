import process from 'node:process'
import type { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox-viem'
import '@nomicfoundation/hardhat-viem'
//import "@nomicfoundation/hardhat-chai-matchers";
import '@typechain/hardhat'
import { NetworkUserConfig } from 'hardhat/types'
import { bsc, polygon, localhost } from 'viem/chains'

process.loadEnvFile('.env')

const mnemonic: string = process.env.MNEMONIC!
const infuraApiKey: string = process.env.INFURA_API_KEY!
//const GAS_PRICE = parseEther('0.05')

const CHAIN_IDS = {
  bsc: bsc.id,
  ganache: localhost.id,
  'polygon-mainnet': polygon.id,
}

const getChainConfig = (chain: keyof typeof CHAIN_IDS): NetworkUserConfig => {
  let jsonRpcUrl: string
  switch (chain) {
    case 'bsc':
      jsonRpcUrl = 'https://bsc-dataseed1.binance.org'
      break
    default:
      //throw new Error(`Unsupported chain: ${chain}`);
      jsonRpcUrl = `https://${chain}.infura.io/v3/${infuraApiKey}`
  }
  return {
    accounts: {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: CHAIN_IDS[chain],
    url: jsonRpcUrl,
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    version: '0.7.6',
    settings: {
      evmVersion: 'istanbul',
      optimizer: {
        enabled: true,
        runs: 10000,
      },
      metadata: {
        bytecodeHash: 'none',
      },
    },
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: './contracts',
  },
  networks: {
    localhost: {
      chainId: CHAIN_IDS.ganache,
      url: 'http://localhost:8545',
      mining: {
        auto: false,
        interval: [3000, 6000], // mina cada 3-6 segundos
      },
    },
    hardhat: {
      /* accounts: {
        mnemonic,
      }, */
      //gasPrice: 50000000000,
      chainId: 1337,
    },
    /* ganache: {
      accounts: {
        mnemonic,
      },
      chainId: CHAIN_IDS.ganache,
      url: "http://localhost:8545",
    }, */
    bsc: getChainConfig('bsc'),
    polygon: getChainConfig('polygon-mainnet'),
  },
  paths: {
    sources: './contracts',
    tests: './__tests__',
    cache: './cache',
    artifacts: './artifacts',
  },
}

export default config
