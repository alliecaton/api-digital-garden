import prisma from '../../prisma/prisma'

import type { Request, Response, NextFunction } from 'express'

const { bookmarks } = prisma

export const getBookmarks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page } = req.query

  let skipNum = 0
  if (page) {
    skipNum = (Number(page) - 1) * 10
  }

  try {
    const totalBookmarks = await bookmarks.count()
    const totalPages = Math.ceil(totalBookmarks / 10)

    const data = await bookmarks.findMany({
      skip: skipNum,
      take: 10,
      orderBy: {
        updatedAt: 'desc',
      },
      include: { tags: true },
    })

    if (data) {
      res.send({
        data: data,
        pagination: {
          current: page ? Number(page) : 1,
          totalResults: totalBookmarks,
          totalPages: totalPages,
        },
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const createBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, url, description, quote, tags } = req.body

  try {
    const bookmark = await bookmarks.create({
      data: {
        title: title,
        url: url,
        description: description,
        quote: quote,
        tags: {
          create: tags,
        },
      },
      include: {
        tags: true, // Include all posts in the returned object
      },
    })

    if (bookmark) {
      res.json(bookmark)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const updateBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, title, url, description, quote, tags } = req.body

  try {
    const data = await bookmarks.update({
      data: { title: title, url: url, description: description, quote: quote },
      where: { id: id },
    })

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const deleteBookmark = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body

  try {
    const data = await bookmarks.delete({
      where: {
        id: id,
      },
    })

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}
