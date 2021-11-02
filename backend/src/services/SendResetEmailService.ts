import { prismaClient } from "../prisma"
import sendGrid from "@sendgrid/mail"

export class SendResetEmailService {
  async execute(email: string) {
    let user = await prismaClient.user.findFirst({
      where: {
        email
      }
    })

    if (user) {
      sendGrid.setApiKey(process.env.SEND_GRID_API_KEY)

      const message = {
        from: "noreply <emailjs.dev@gmail.com>",
        templateId: process.env.SEND_GRID_TEMPLATE_ID,
        personalizations: [
          {
            to: user.email,
            subject: "Resetar senha",
            dynamicTemplateData: {
              username: user.username,
              user_id: user.id,
              client_url: "http://localhost:3000"
            }
          }
        ]
      }

      try {
        await sendGrid.send(message)

        return {
          data: {
            message:
              "Enviado com sucesso! Cheque seu email para mais informações."
          },
          code: 200
        }
      } catch (error) {
        return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
      }
    }

    return {
      data: { error: "Parece que você digitou o email errado." },
      code: 404
    }
  }
}
