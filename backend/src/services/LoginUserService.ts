import { sign } from "jsonwebtoken"
import { prismaClient } from "../prisma"
import { decryptPassword } from "../utils/crypto"

export class LoginUserService {
  async execute(email: string, password: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (user && password === decryptPassword(user.password)) {
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
    }

    return { data: { error: "Informação de usuário inválida." }, code: 400 }
  }
}
