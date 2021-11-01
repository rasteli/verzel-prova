import { Request, Response } from "express"
import { CreateModuleService } from "../services/CreateModuleService"

export class CreateModuleController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { name, description = null } = request.body

    const service = new CreateModuleService()
    const result = await service.execute(name, user_id, description)

    return response.status(result.code).json(result.data)
  }
}
