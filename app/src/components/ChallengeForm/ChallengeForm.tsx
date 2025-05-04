import ChallengeStepForm from '@/components/ChallengeForm/Steps/ChallengeStepForm'
import SignerStepForm from '@/components/ChallengeForm/Steps/SignerStepForm'
import SupervisorStepForm from '@/components/ChallengeForm/Steps/SupervisorStepForm'
import { Button } from '@/components/ui/button'
import { CHALLENGE_FORM_SCHEMAS } from '@/constants'
import { ChallengeFormStep, type ChallengeFields } from '@/models/challenge'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleArrowLeft } from 'lucide-react'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type ChallengeFormProps = React.HTMLAttributes<HTMLFormElement> & {
  onSubmit: (data: ChallengeFields) => void
  onChange: (data: ChallengeFields) => void
  onValid: () => void
  disabled?: boolean
}

const ChallengeForm = ({ onSubmit, onValid, onChange, disabled, className, ...props }: ChallengeFormProps) => {
  const { t } = useTranslation()
  const [step, setStep] = useState(ChallengeFormStep.CHALLENGE)
  const methods = useForm<ChallengeFields>({
    resolver: zodResolver(CHALLENGE_FORM_SCHEMAS[step]),
    defaultValues: {},
  })

  const handleNext = async () => {
    const isValid = await methods.trigger()
    if (!isValid) return

    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  const isLastStep = useMemo(
    () => step >= Object.keys(CHALLENGE_FORM_SCHEMAS).length - 1,
    [CHALLENGE_FORM_SCHEMAS, step],
  )

  useEffect(() => {
    if (!isLastStep || !methods.formState.isValid) return

    onValid()
  }, [methods.formState.isValid])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!isLastStep || !methods.formState.isValid) {
        handleNext()
        return
      }

      onSubmit(methods.getValues())
    },
    [methods.getValues(), onSubmit],
  )

  useEffect(() => {
    if (!isLastStep || !methods.formState.isValid) return

    onChange(methods.getValues())
  }, [methods.formState.isValid])

  return (
    <FormProvider {...methods}>
      <header className="flex items-center gap-2 mb-4">
        {step > ChallengeFormStep.CHALLENGE && (
          <CircleArrowLeft className="h-6 w-auto cursor-pointer hover:text-gray-700" onClick={handleBack} />
        )}
        <h2 className="text-2xl font-bold mb-0.5">{t('challenge_form.title')}</h2>
      </header>

      <form onSubmit={handleSubmit} className={className} {...props}>
        {step === ChallengeFormStep.CHALLENGE && <ChallengeStepForm />}
        {step === ChallengeFormStep.SIGNER && <SignerStepForm />}
        {step === ChallengeFormStep.SUPERVISOR && <SupervisorStepForm />}

        <footer className="flex items-center justify-between mt-4">
          {!isLastStep ? (
            <Button type="button" onClick={handleNext} disabled={!methods.formState.isValid} className="w-full">
              {t('challenge_form.controls.next')}
            </Button>
          ) : (
            <Button type="submit" disabled={disabled || !methods.formState.isValid} className="w-full">
              {t('challenge_form.controls.create')}
            </Button>
          )}
        </footer>
      </form>
    </FormProvider>
  )
}

export default ChallengeForm
