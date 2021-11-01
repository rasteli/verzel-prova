import { io } from "../app"
import { prismaClient } from "../prisma"

// O atributo onDelete está Cascade na tag @relation no arquivo schema.prisma.
// Isso significa que quando uma gravação Module é deletada do banco de dados,
// todas as gravações Class que referenciam a ela também são deletadas.

export class DeleteModuleService {
  async execute(module_id: string) {
    try {
      await prismaClient.module.delete({
        where: {
          id: module_id
        }
      })

      io.emit("changed_db")

      return { data: { success: "Deleted module successfuly." }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
