import prisma from '../../prisma/prisma'
import { findOrCreateTags } from '../models/Tags'

import type { Request, Response, NextFunction } from 'express'

const { posts } = prisma

export const getPosts = async (
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
    const totalPosts = await posts.count()
    const totalPages = Math.ceil(totalPosts / 10)

    const data = await posts.findMany({
      ...(page && { skip: skipNum, take: 10 }),
      orderBy: {
        createdAt: 'desc',
      },
      include: { tags: true },
    })

    if (data) {
      res.send({
        data: data,
        pagination: {
          current: page ? Number(page) : 1,
          totalResults: totalPosts,
          totalPages: totalPages,
        },
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: slug } = req.params

  try {
    const data = await posts.findFirst({
      where: {
        slug: slug,
      },
      include: { tags: true },
    })

    if (data) {
      res.send(data)
    } else {
      throw new Error('Post Not Found')
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, tags } = req.body

  const createdTags = await findOrCreateTags(tags)

  // Uniqueify slug with ID
  const latestQuery = await posts.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  })

  const slugId = latestQuery[0].id + 1

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const data = await posts.create({
      data: {
        title: title,
        content: content,
        slug: slug + '-' + slugId,
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

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, content, id, tags } = req.body

  type InsertData = {
    title: string
    content: string
    tags?: {
      connect: {
        id: number | undefined
      }[]
    }
  }

  let insertData: InsertData = { title: title, content: content }

  if (tags?.length) {
    const createdTags = await findOrCreateTags(tags)

    console.log(createdTags)

    if (createdTags?.length) {
      insertData = {
        ...insertData,
        tags: {
          connect: createdTags
            .map((tag) => ({
              id: tag?.id,
            }))
            .filter((tag) => tag !== undefined),
        },
      }
    }
  }

  try {
    const data = await posts.update({
      where: { id: id },
      data: insertData,
      include: {
        tags: true, // Include all posts in the returned object
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

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.body

  try {
    const data = await posts.delete({
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
