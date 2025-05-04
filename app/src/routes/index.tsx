import ChallengeFormContainer from '@/components/ChallengeForm/ChallengeFormContainer'
import MyChallengesContainer from '@/components/ChallengeList/MyChallengesContainer'
import Layout from '@/components/layouts/Layout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <Layout>
      <div className="grid grid-cols-1 justify-items-center items-center h-[90vh]">
        <ChallengeFormContainer />
      </div>

      <section className="min-h-[10vh] pb-20">
        <MyChallengesContainer />
      </section>
    </Layout>
  )
}
