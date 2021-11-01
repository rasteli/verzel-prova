import { Request, Response } from "express"
import { SendResetEmailService } from "../services/SendResetEmailService"

export class SendResetEmailController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    const service = new SendResetEmailService()
    const result = await service.execute(email)

    return response.status(result.code).json(result.data)
  }
}
