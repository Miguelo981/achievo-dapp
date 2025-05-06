import { ALGORITHM, IV_LENGTH, SECRET } from '@/constants.ts'
import { Buffer } from 'node:buffer'
import crypto from 'node:crypto'

const cryptoActions = () => {
  const deriveKey = (secret: string): Buffer => {
    return crypto.createHash('sha256').update(secret).digest()
  }

  const encrypt = (text: string, secret: string = SECRET) => {
    const iv = crypto.randomBytes(IV_LENGTH)
    const key = deriveKey(secret)
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return iv.toString('hex') + ':' + encrypted
  }

  const decrypt = (encryptedText: string, secret: string = SECRET) => {
    const [ivHex, encrypted] = encryptedText.split(':')
    const iv = Buffer.from(ivHex, 'hex')
    const key = deriveKey(secret)
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  }

  return {
    encrypt,
    decrypt,
  } as const
}

export const cryptoRepository = cryptoActions()
