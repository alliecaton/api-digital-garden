import { transferableAbortSignal } from 'util'
import prisma from '../../prisma/prisma.js'

import type { Request, Response, NextFunction } from 'express'

const { tags } = prisma

export const getTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await tags.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    })

    if (data) {
      res.send(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const getPostTags = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get all tags that have an associated post
  try {
    const data = await tags.findMany({
      where: {
        posts: {
          some: {
            id: {
              not: null || undefined,
            },
          },
        },
      },
    })
    if (data) {
      res.send(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}
