import prisma from '../../prisma/prisma'
import { Post } from '../types/Posts'

const { posts } = prisma

export const getAllPosts = async (page: number | null, skipNum: number) => {
  const data = await posts.findMany({
    ...(page && { skip: skipNum, take: 10 }),
    orderBy: {
      createdAt: 'desc',
    },
    include: { tags: true },
  })

  const total = await posts.count()

  return {
    data,
    total,
  }
}

export const getPostsByTags = async (
  page: number,
  skipNum: number,
  tags: number[]
) => {
  const total = await prisma.posts.count({
    where: {
      tags: {
        some: {
          id: {
            in: tags,
          },
        },
      },
    },
  })

  const data = await prisma.posts.findMany({
    ...(page && { skip: skipNum, take: 10 }),
    where: {
      tags: {
        some: {
          id: {
            in: tags,
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  })

  return {
    data,
    total,
  }
}
