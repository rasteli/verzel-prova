import { io } from "../app"
import { prismaClient } from "../prisma"

export class CreateClassService {
  async execute(
    name: string,
    user_id: string,
    begins_at: string,
    module_id: string,
    description: string | null
  ) {
    try {
      const lesson = await prismaClient.class.create({
        data: {
          name,
          begins_at,
          description,
          module_id,
          creator_id: user_id
        },
        include: {
          module: true
        }
      })

      io.emit("changed_db")

      return { data: { lesson }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
