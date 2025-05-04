import ChallengeCount from '@/components/ChallengeCount'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi, type Mock } from 'vitest'

vi.mock('@/hooks/useChallengeCount', () => ({
  useChallengeCount: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

import { useChallengeCount } from '@/hooks/useChallengeCount'

describe('ChallengeCount', () => {
  it('renders nothing when loading', async () => {
    ;(useChallengeCount as Mock).mockReturnValue({ isLoading: true, data: null })

    const { container } = render(<ChallengeCount />)
    expect(container.firstChild).toBeNull()
  })

  it('renders the count when data is available', () => {
    ;(useChallengeCount as Mock).mockReturnValue({ isLoading: false, data: BigInt(5) })

    render(<ChallengeCount />)

    const countElement = screen.getByText('challenge_count.label: 5')
    expect(countElement).toBeDefined()
  })

  it('renders nothing when there is no data', () => {
    ;(useChallengeCount as Mock).mockReturnValue({ isLoading: false, data: null })

    const { container } = render(<ChallengeCount />)
    expect(container.firstChild).toBeNull()
  })
})
