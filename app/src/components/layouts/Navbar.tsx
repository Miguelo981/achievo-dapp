import ChallengeCount from '@/components/ChallengeCount'
import ConnectContainer from '@/components/ConnectContainer'
import { Link } from '@tanstack/react-router'

export default function Navbar() {
  return (
    <header className="fixed z-40 w-full backdrop-blur-md py-5 px-5">
      <div className="">
        <div className="flex items-center justify-center md:justify-between">
          <Link to="/">
            <h1 className="text-4xl font-black leading-6 text-end">
              🏋🏻 Achiev<span className="text-app-primary">o</span>
              <br />
              <span className="text-base tracking-widest font-light">Go Challenge Them!</span>
            </h1>
          </Link>

          <nav className="flex items-center gap-4">
            <ul></ul>
            <ChallengeCount />
            <ConnectContainer />
          </nav>
        </div>
      </div>
    </header>
  )
}
