import ChallengeCard from '@/components/ChallengeList/ChallengeCard'
import { cn } from '@/lib/utils'
import type { ChallengeCardWithId } from '@/models/challenge'
import React from 'react'

type ChallengeListProps = React.HTMLAttributes<HTMLUListElement> & {
  challenges: ChallengeCardWithId[]
}

const ChallengeList = ({ challenges, className, ...props }: ChallengeListProps) => {
  return (
    <ul className={cn(className)} {...props}>
      {challenges.map((challenge, index) => (
        <li key={index}>
          <ChallengeCard challenge={challenge} />
        </li>
      ))}
    </ul>
  )
}

export default ChallengeList
