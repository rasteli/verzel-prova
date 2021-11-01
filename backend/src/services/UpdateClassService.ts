import { io } from "../app"
import { prismaClient } from "../prisma"
import { removeEmptyProps } from "../utils/removeEmptyProps"

export class UpdateClassService {
  async execute(class_id: string, data: Object) {
    if (
      !data.hasOwnProperty("name") &&
      !data.hasOwnProperty("description") &&
      !data.hasOwnProperty("begins_at")
    ) {
      return {
        data: { error: "Por favor, insira pelo menos uma informação." },
        code: 400
      }
    }

    const newData = removeEmptyProps(data)

    try {
      const lesson = await prismaClient.class.update({
        where: {
          id: class_id
        },
        data: newData
      })

      io.emit("changed_db")

      return { data: { lesson }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
