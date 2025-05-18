import prisma from '../../prisma/prisma'

const { bookmarks } = prisma

export const getAllBookmarks = async (page: number | null, skipNum: number) => {
  const data = await bookmarks.findMany({
    ...(page && { skip: skipNum, take: 10 }),
    orderBy: {
      updatedAt: 'desc',
    },
    include: { tags: true },
  })

  const total = await bookmarks.count()

  return { data, total }
}

export const getBookmarksByTags = async (
  page: number,
  skipNum: number,
  tags: string[]
) => {
  const total = await prisma.bookmarks.count({
    where: {
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    },
  })

  const data = await prisma.bookmarks.findMany({
    ...(page && { skip: skipNum, take: 10 }),
    where: {
      tags: {
        some: {
          name: {
            in: tags,
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: {
      tags: true,
    },
  })

  return { data, total }
}
