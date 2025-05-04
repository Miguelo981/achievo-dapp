import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SupervisorStepFormFields } from '@/models/challenge'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SupervisorStepForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SupervisorStepFormFields>()
  const { t } = useTranslation()

  return (
    <>
      <fieldset>
        <Label className="mb-2" htmlFor="supervisor-address">
          {t('challenge_form.steps.supervisor.address.label')}
        </Label>
        <Input
          id="supervisor-address"
          placeholder={t('challenge_form.steps.supervisor.address.placeholder')}
          {...register('supervisorAddress')}
        />
        {errors.supervisorAddress && <p>{errors.supervisorAddress.message}</p>}
      </fieldset>

      <fieldset>
        <Label className="mb-2" htmlFor="supervisor-email">
          {t('challenge_form.steps.supervisor.email.label')}
        </Label>
        <Input
          id="supervisor-email"
          placeholder={t('challenge_form.steps.supervisor.email.placeholder')}
          type="email"
          {...register('supervisorEmail')}
        />
        {errors.supervisorEmail && <p>{errors.supervisorEmail.message}</p>}
      </fieldset>

      <p>{t('challenge_form.steps.signer.email.description')}</p>
    </>
  )
}

export default SupervisorStepForm
