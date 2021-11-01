import { io } from "../app"
import { prismaClient } from "../prisma"

export class DeleteClassService {
  async execute(class_id: string) {
    try {
      await prismaClient.class.delete({
        where: {
          id: class_id
        }
      })

      io.emit("changed_db")

      return { data: { success: "Deleted class successfuly." }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
