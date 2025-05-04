import MinChallengeStake from '@/components/ChallengeForm/MinChallengeStake'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { ChallengeStepFormFields } from '@/models/challenge'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const ChallengeStepForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ChallengeStepFormFields>()
  const { t } = useTranslation()

  return (
    <>
      <fieldset>
        <Label className="mb-2" htmlFor="goal">
          {t('challenge_form.steps.challenge.goal.label')}
        </Label>
        <Input id="goal" placeholder={t('challenge_form.steps.challenge.goal.placeholder')} {...register('goal')} />
        {errors.goal && <p>{errors.goal.message}</p>}
      </fieldset>

      <fieldset>
        <Label className="mb-2" htmlFor="deadline">
          {t('challenge_form.steps.challenge.deadline.label')}
        </Label>
        <Input id="deadline" type="date" {...register('deadline')} />
        {errors.deadline && <p>{errors.deadline.message}</p>}
      </fieldset>

      <fieldset>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor="locked-amount">{t('challenge_form.steps.challenge.locked_amount.label')}</Label>

          <MinChallengeStake />
        </div>
        <Input id="locked-amount" type="number" step="0.01" min="0.01" {...register('lockedAmount')} />
        {errors.lockedAmount && <p>{errors.lockedAmount.message}</p>}
      </fieldset>
    </>
  )
}

export default ChallengeStepForm
