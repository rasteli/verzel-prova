import { sign } from "jsonwebtoken"
import { prismaClient } from "../prisma"
import { encryptPassword } from "../utils/crypto"

export class SignUpUserService {
  async execute(username: string, email: string, password: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      try {
        if (password.length < 8) {
          return {
            data: { error: "Senha deve ter pelo menos 8 caracteres." },
            code: 400
          }
        }

        user = await prismaClient.user.create({
          data: {
            email,
            username,
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

    return {
      data: { error: "Email já está sendo usado por outra conta." },
      code: 403
    }
  }
}
