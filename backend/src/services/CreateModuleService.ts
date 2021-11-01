import { io } from "../app"
import { prismaClient } from "../prisma"

export class CreateModuleService {
  async execute(name: string, user_id: string, description: string | null) {
    try {
      const module = await prismaClient.module.create({
        data: {
          name,
          description,
          creator_id: user_id
        }
      })

      io.emit("changed_db")

      return { data: { module }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
