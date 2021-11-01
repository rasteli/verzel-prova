import { Request, Response } from "express"
import { UserProfileService } from "../services/UserProfileService"

export class UserProfileController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const service = new UserProfileService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
