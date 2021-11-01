import crypto from "crypto"

const algorithm = "aes-256-gcm"
const INIT_VECTOR = crypto.randomBytes(32)
const SECURITY_KEY = crypto.randomBytes(32)

export function encryptPassword(password: string) {
  const cipher = crypto.createCipheriv(algorithm, SECURITY_KEY, INIT_VECTOR)
  const encryptedPwd = cipher.update(password, "utf-8", "hex")

  return encryptedPwd
}

export function decryptPassword(encryptedPwd: string) {
  const decipher = crypto.createDecipheriv(algorithm, SECURITY_KEY, INIT_VECTOR)
  const decryptedPwd = decipher.update(encryptedPwd, "hex", "utf-8")

  return decryptedPwd
}
