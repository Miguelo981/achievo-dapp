import { useChallengeCount } from '@/hooks/useChallengeCount'
import { useTranslation } from 'react-i18next'

const ChallengeCount = () => {
  const { t } = useTranslation()
  const { isLoading, data } = useChallengeCount()

  return (
    <>
      {!isLoading && data ? (
        <div className="rounded-lg border px-4 py-2">
          <p className="text-sm font-bold">
            {t('challenge_count.label')}: {Number(data)}
          </p>
        </div>
      ) : null}
    </>
  )
}

export default ChallengeCount
