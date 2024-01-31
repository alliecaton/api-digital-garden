import prisma from '../../prisma/prisma.js'

const { Tags } = prisma

export const getTags = async (req, res, next) => {
  try {
    const data = await Tags.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      // include: { bookmarks: true },
    })

    if (data) {
      res.send(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}
