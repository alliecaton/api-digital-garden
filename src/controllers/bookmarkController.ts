import prisma from '../../prisma/prisma'

import type { Request, Response, NextFunction } from 'express'
import { findOrCreateTags } from '../models/Tags'

const { bookmarks } = prisma

import { getBookmarksByTags, getAllBookmarks } from '../models/Bookmarks'

export const getBookmarks = async (
  req: Request<{}, {}, {}, { page: string; tags?: string }>,
  res: Response,
  next: NextFunction
) => {
  const { page, tags } = req.query

  const tagArr = tags?.split(',').map((tag: string) => tag)

  let skipNum = 0
  if (page) {
    skipNum = (Number(page) - 1) * 10
  }

  const pageNum = Number(page)

  try {
    const data = tagArr?.length
      ? await getBookmarksByTags(pageNum, skipNum, tagArr)
      : await getAllBookmarks(pageNum, skipNum)

    const totalBookmarks = data.total
    const totalPages = Math.ceil(totalBookmarks / 10)

    if (data) {
      res.send({
        data: data.data,
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

  const createdTags = await findOrCreateTags(tags)

  try {
    const bookmark = await bookmarks.create({
      data: {
        title: title,
        url: url,
        description: description,
        quote: quote,
        ...(createdTags && {
          tags: {
            connect: createdTags.map((tag) => ({
              id: tag?.id,
            })),
          },
        }),
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
