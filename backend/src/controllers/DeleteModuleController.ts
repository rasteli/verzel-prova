import { Request, Response } from "express"
import { DeleteModuleService } from "../services/DeleteModuleService"

export class DeleteModuleController {
  async handle(request: Request, response: Response) {
    const { module_id } = request.params

    const service = new DeleteModuleService()
    const result = await service.execute(module_id)

    return response.status(result.code).json(result.data)
  }
}
