import { APP_HOST } from '@/constants.ts'
import type { ConfirmedChallenge, CreatedChallenge, ExpiredChallenge } from '@/models/challenge.ts'

const emailTemplates = () => {
  const created = ({
    owner,
    goal,
    challengeId,
    deadline,
    stake,
    supervisor,
    symbol,
    site = APP_HOST,
  }: CreatedChallenge & { site?: string; symbol: string }) => {
    const challengeDetailUrl = `${site}/challenges/${Number(challengeId)}`
    const title = `Challenge created: ${goal}`
    const template = `
        <div style="font-family: Arial, sans-serif; background-color: #7775D6; padding: 32px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="padding: 24px 32px; border-bottom: 1px solid #eee; background-color: #4f46e5; color: #fff;">
                    <h1 style="margin: 0; font-size: 18px;">📬 Hello ${owner}!</h1>
                </div>
                <div style="padding: 24px 32px; color: #333;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        Your Challenge was created successfully.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5;">
                        You have until ${new Date(Number(deadline)).toLocaleDateString()} to complete it and withdraw your funds (${stake} ${symbol}).
                    </p>
                    <p style="font-size: 16px; line-height: 1.5;">
                        You can share your challenge with your supervisor <strong>${supervisor}</strong>.
                    </p>
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${challengeDetailUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Go to challenge
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #666;">
                        If you have any question, simply reply to this email.
                    </p>
                </div>
                <div style="padding: 16px 32px; font-size: 12px; color: #999; background-color: #f1f1f1; text-align: center;">
                    © 2025 Achievo. All rights reserved.
                </div>
            </div>
        </div>
        `

    return {
      title,
      template,
    } as const
  }

  const confirm = ({ challengeId, deadline, supervisor, site = APP_HOST }: CreatedChallenge & { site?: string }) => {
    const challengeDetailUrl = `${site}/challenges/${Number(challengeId)}`
    const title = `Confirm challenge ${challengeId}`
    const template = `
        <div style="font-family: Arial, sans-serif; background-color: #7775D6; padding: 32px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="padding: 24px 32px; border-bottom: 1px solid #eee; background-color: #4f46e5; color: #fff;">
                    <h1 style="margin: 0; font-size: 18px;">📬 Hello ${supervisor}!</h1>
                </div>
                <div style="padding: 24px 32px; color: #333;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        A challenge was created successfully and you are the supervisor.
                    </p>
                    <p style="font-size: 16px; line-height: 1.5;">
                        You have until ${new Date(Number(deadline)).toLocaleDateString()} to confirm it.
                    </p>
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${challengeDetailUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Go to challenge
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #666;">
                        If you have any question, simply reply to this email.
                    </p>
                </div>
                <div style="padding: 16px 32px; font-size: 12px; color: #999; background-color: #f1f1f1; text-align: center;">
                    © 2025 Achievo. All rights reserved.
                </div>
            </div>
        </div>
        `

    return {
      title,
      template,
    } as const
  }

  const confirmed = ({ challengeId, supervisor, site = APP_HOST }: ConfirmedChallenge & { site?: string }) => {
    const challengeDetailUrl = `${site}/challenges/${Number(challengeId)}`
    const title = `Confirmed challenge ${challengeId}`
    const template = `
        <div style="font-family: Arial, sans-serif; background-color: #7775D6; padding: 32px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="padding: 24px 32px; border-bottom: 1px solid #eee; background-color: #4f46e5; color: #fff;">
                    <h1 style="margin: 0; font-size: 18px;">📬 Hello ${supervisor}!</h1>
                </div>
                <div style="padding: 24px 32px; color: #333;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        Your challenge was confirmed by your supervisor. Now you can withdraw your funds.
                    </p>
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${challengeDetailUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Go to challenge
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #666;">
                        If you have any question, simply reply to this email.
                    </p>
                </div>
                <div style="padding: 16px 32px; font-size: 12px; color: #999; background-color: #f1f1f1; text-align: center;">
                    © 2025 Achievo. All rights reserved.
                </div>
            </div>
        </div>
        `

    return {
      title,
      template,
    } as const
  }

  const expired = ({ challengeId, site = APP_HOST }: ExpiredChallenge & { site?: string }) => {
    const challengeDetailUrl = `${site}/challenges/${Number(challengeId)}`
    const title = `Challenge ${challengeId} expired`
    const template = `
        <div style="font-family: Arial, sans-serif; background-color: #7775D6; padding: 32px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <div style="padding: 24px 32px; border-bottom: 1px solid #eee; background-color: #4f46e5; color: #fff;">
                    <h1 style="margin: 0; font-size: 18px;"> Challenge ${challengeId} expired!</h1>
                </div>
                <div style="padding: 24px 32px; color: #333;">
                    <p style="font-size: 16px; line-height: 1.5;">
                        Now you can claim de staked amount.
                    </p>
                    <div style="text-align: center; margin: 32px 0;">
                        <a href="${challengeDetailUrl}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                            Go to challenge
                        </a>
                    </div>
                </div>
                <div style="padding: 16px 32px; font-size: 12px; color: #999; background-color: #f1f1f1; text-align: center;">
                    © 2025 Achievo. All rights reserved.
                </div>
            </div>
        </div>
        `

    return {
      title,
      template,
    } as const
  }

  return {
    created,
    confirm,
    confirmed,
    expired,
  } as const
}

export const emailTemplateRepository = emailTemplates()
