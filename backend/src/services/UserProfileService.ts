import { prismaClient } from "../prisma"

export class UserProfileService {
  async execute(user_id: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    })

    return { data: { user }, code: 200 }
  }
}
