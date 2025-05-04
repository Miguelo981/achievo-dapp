import { SENTRY_DNS_KEY } from '@/constants'
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: SENTRY_DNS_KEY,
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration(), Sentry.browserProfilingIntegration()],
  tracesSampleRate: 1.0,
})
