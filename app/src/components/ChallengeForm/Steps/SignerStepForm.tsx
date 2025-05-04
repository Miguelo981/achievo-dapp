import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SignerStepFormFields } from '@/models/challenge'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const SignerStepForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignerStepFormFields>()
  const { t } = useTranslation()

  return (
    <>
      <fieldset>
        <Label className="mb-2" htmlFor="email">
          {t('challenge_form.steps.signer.email.label')}
        </Label>
        <Input
          id="email"
          placeholder={t('challenge_form.steps.signer.email.placeholder')}
          type="email"
          {...register('signerEmail')}
        />
        {errors.signerEmail && <p>{errors.signerEmail.message}</p>}
      </fieldset>

      <p>{t('challenge_form.steps.signer.email.description')}</p>
    </>
  )
}

export default SignerStepForm
