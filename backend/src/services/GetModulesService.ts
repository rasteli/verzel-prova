import { prismaClient } from "../prisma"

export class GetModulesService {
  async execute(user_id: string | undefined) {
    const conditionObj = user_id ? { creator_id: user_id } : undefined

    const modules = await prismaClient.module.findMany({
      where: conditionObj,
      orderBy: {
        name: "asc"
      },
      include: {
        classes: {
          orderBy: {
            name: "asc"
          }
        }
      }
    })

    return { data: { modules }, code: 200 }
  }
}
