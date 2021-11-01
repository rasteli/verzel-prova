import { Request, Response } from "express"
import { DeleteClassService } from "../services/DeleteClassService"

export class DeleteClassController {
  async handle(request: Request, response: Response) {
    const { class_id } = request.params

    const service = new DeleteClassService()
    const result = await service.execute(class_id)

    return response.status(result.code).json(result.data)
  }
}
