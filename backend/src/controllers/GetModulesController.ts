import { Request, Response } from "express"
import { GetModulesService } from "../services/GetModulesService"

interface IQuery {
  user_id: string | undefined
}

export class GetModulesController {
  async handle(request: Request, response: Response) {
    const { user_id = undefined } = request.query as unknown as IQuery

    const service = new GetModulesService()
    const result = await service.execute(user_id)

    return response.status(result.code).json(result.data)
  }
}
