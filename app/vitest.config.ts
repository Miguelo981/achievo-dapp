/// <reference types="vitest" />
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['__test__/**/*.{test,spec}.{ts,js}'],
    exclude: ['node_modules', 'dist', 'pnpm-lock.yaml'],
  },
})
