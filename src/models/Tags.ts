import prisma from '../../prisma/prisma'
import { Tag } from '../types/Tags'

const { tags } = prisma

export const findOrCreateTags = async (reqTags: Tag[]) => {
  if (reqTags) {
    return await Promise.all(
      reqTags.map(async (tag: Tag) => {
        if (tag.id) {
          const existingTag = await tags.findUnique({
            where: {
              id: tag.id,
            },
          })

          if (existingTag) {
            return existingTag
          }
        } else {
          const newTag = await tags.create({
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
}

export const getTagsByName = async (tagNames: string) => {
  const arr = tagNames.split(',')
  const data = await tags.findMany({
    where: {
      name: {
        in: arr,
      },
    },
  })

  return data
}
