import ChallengeDetailContainer from '@/components/ChallengeDetail/ChallengeDetailContainer'
import Layout from '@/components/layouts/Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/challenges/$challengeId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { challengeId } = Route.useParams()

  return (
    <Layout>
      <div className="grid grid-cols-1 justify-items-center items-center h-screen">
        <ChallengeDetailContainer challengeId={challengeId} />
      </div>
    </Layout>
  )
}
