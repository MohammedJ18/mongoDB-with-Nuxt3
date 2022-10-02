import { PrismaClient } from '@prisma/client'

export default defineEventHandler( async(event) => {

    const prisma = new PrismaClient()
    const motaker = await prisma.user.create({
        data: {
          name: 'Alie',
          email: 'em@em43e,aikl.com',
          password: 'passord',
          username: 'a43e4e',
          created_at: new Date(),
          updated_at: new Date(),
        },
      })
    return {
      api: motaker
    }
  })