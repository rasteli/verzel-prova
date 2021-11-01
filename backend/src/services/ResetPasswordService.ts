import { sign } from "jsonwebtoken"
import { prismaClient } from "../prisma"
import { encryptPassword } from "../utils/crypto"

export class ResetPasswordService {
  async execute(user_id: string, password: string) {
    try {
      if (password.length < 8) {
        return {
          data: { error: "Senha deve ter pelo menos 8 caracteres." },
          code: 400
        }
      }

      const user = await prismaClient.user.update({
        where: {
          id: user_id
        },
        data: {
          password: encryptPassword(password)
        }
      })

      const token = sign(
        {
          user: user
        },
        process.env.JWT_SECRET_KEY,
        {
          subject: user.id,
          expiresIn: "1d"
        }
      )

      return { data: { token, user }, code: 200 }
    } catch (error) {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
