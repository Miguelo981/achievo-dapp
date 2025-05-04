import { sentryVitePlugin } from '@sentry/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
    sentryVitePlugin({
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@contracts': resolve(__dirname, '../contracts/artifacts/contracts'),
      '@server': resolve(__dirname, '../server/src'),
    },
  },

  optimizeDeps: {
    exclude: ['@server/trpc-types'],
  },

  build: {
    sourcemap: true,
  },
})
