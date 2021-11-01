import { Request, Response } from "express"
import { SignUpUserService } from "../services/SignUpUserService"

export class SignUpUserController {
  async handle(request: Request, response: Response) {
    const { username, email, password } = request.body

    const service = new SignUpUserService()
    const result = await service.execute(username, email, password)

    return response.status(result.code).json(result.data)
  }
}
