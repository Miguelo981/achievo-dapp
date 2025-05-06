import { DEFAULT_FROM_EMAIL, RESEND_API_KEY } from '@/constants.ts'
import { SendEmailParams } from '@/models/email.ts'
import { Resend } from 'resend'

const resend = new Resend(RESEND_API_KEY)

const EmailActions = () => {
  const send = async ({ from = DEFAULT_FROM_EMAIL, to, subject, html }: SendEmailParams) => {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    })

    if (error) {
      return console.error({ error })
    }

    console.log({ data })
  }

  return {
    send,
  } as const
}

export const emailRepository = EmailActions()
