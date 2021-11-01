import { io } from "../app"
import { prismaClient } from "../prisma"
import { removeEmptyProps } from "../utils/removeEmptyProps"

export class UpdateModuleService {
  async execute(module_id: string, data: Object) {
    if (!data.hasOwnProperty("name") && !data.hasOwnProperty("description")) {
      return {
        data: { error: "Por favor, insira pelo menos uma informação." },
        code: 400
      }
    }

    const newData = removeEmptyProps(data)

    try {
      const module = await prismaClient.module.update({
        where: {
          id: module_id
        },
        data: newData
      })

      io.emit("changed_db")

      return { data: { module }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
