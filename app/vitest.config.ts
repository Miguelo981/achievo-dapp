/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['__test__/**/*.{test,spec}.{ts,js,tsx,jsx}'],
    exclude: ['node_modules', 'dist', 'pnpm-lock.yaml'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
