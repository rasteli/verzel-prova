import { Request, Response } from "express"
import { UpdateClassService } from "../services/UpdateClassService"

export class UpdateClassController {
  async handle(request: Request, response: Response) {
    const { class_id, data } = request.body

    const service = new UpdateClassService()
    const result = await service.execute(class_id, data)

    return response.status(result.code).json(result.data)
  }
}
