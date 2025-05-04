/// <reference types="vite/client" />
import type { Address } from 'viem'

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_PROJECT_ID: string
  readonly VITE_MAINET_CHALLENGE_TOKEN_ADDRESS: Address
  readonly VITE_SERVER_HOST: URL
  readonly VITE_SENTRY_DNS_KEY: string
  readonly VITE_SENTRY_ORG: string
  readonly VITE_SENTRY_PROJECT: string
  readonly VITE_SENTRY_AUTH_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
