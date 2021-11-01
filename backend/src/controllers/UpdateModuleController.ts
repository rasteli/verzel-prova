import { Request, Response } from "express"
import { UpdateModuleService } from "../services/UpdateModuleService"

export class UpdateModuleController {
  async handle(request: Request, response: Response) {
    const { module_id, data } = request.body

    const service = new UpdateModuleService()
    const result = await service.execute(module_id, data)

    return response.status(result.code).json(result.data)
  }
}
