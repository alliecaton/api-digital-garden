import prisma from '../../prisma/prisma.js'

const { Tags } = prisma

export const findOrCreateTags = async (tags) => {
  return await Promise.all(
    tags.map(async (tag) => {
      const existingTag = await Tags.findUnique({
        where: {
          id: tag.id,
        },
      })

      if (existingTag) {
        return existingTag
      } else {
        const newTag = await Tags.create({
          data: {
            name: tag.name,
            emoji: tag.emoji,
          },
        })

        return newTag
      }
    })
  )
}
