import { Request, Response } from "express"
import { CreateClassService } from "../services/CreateClassService"

export class CreateClassController {
  async handle(request: Request, response: Response) {
    const { user_id } = request
    const { name, begins_at, module_id, description = null } = request.body

    const service = new CreateClassService()
    const result = await service.execute(
      name,
      user_id,
      begins_at,
      module_id,
      description
    )

    return response.status(result.code).json(result.data)
  }
}
