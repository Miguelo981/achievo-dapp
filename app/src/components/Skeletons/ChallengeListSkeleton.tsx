import ChallengeCardSkeleton from '@/components/Skeletons/ChallengeCardSkeleton'
import { cn } from '@/lib/utils'
import React from 'react'

type ChallengeListSkeletonProps = React.HTMLAttributes<HTMLUListElement> & {
  amount?: number
  className?: string
}

const ChallengeListSkeleton = ({ amount = 3, className, ...props }: ChallengeListSkeletonProps) => {
  return (
    <ul className={cn(className)} {...props}>
      {Array.from({ length: amount }).map((_, index) => (
        <li key={index}>
          <ChallengeCardSkeleton />
        </li>
      ))}
    </ul>
  )
}

export default ChallengeListSkeleton
