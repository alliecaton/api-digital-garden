import prisma from '../../prisma/prisma.js'
import { findOrCreateTags } from '../models/Tags.js'

const { Posts } = prisma

export const getPosts = async (req, res, next) => {
  try {
    const data = await Posts.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: { tags: true },
    })

    if (data) {
      res.send(data)
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

export const getPost = async (req, res, next) => {
  const { id: slug } = req.params

  try {
    const data = await Posts.findFirst({
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

export const createPost = async (req, res, next) => {
  const { title, content, tags } = req.body

  const createdTags = await findOrCreateTags(tags)

  // Uniqueify slug with ID
  const latestQuery = await Posts.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  })

  const slugId = latestQuery[0].id + 1

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const data = await Posts.create({
      data: {
        title: title,
        content: content,
        slug: slug + '-' + slugId,
        tags: {
          connect: createdTags.map((tag) => ({
            id: tag.id,
          })),
        },
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

export const updatePost = async (req, res, next) => {
  const { title, content, id, tags } = req.body

  let insertData = { title: title, content: content }

  if (tags?.length) {
    const createdTags = await findOrCreateTags(tags)

    console.log(createdTags)

    insertData = {
      ...insertData,
      tags: {
        connect: createdTags.map((tag) => ({
          id: tag.id,
        })),
      },
    }
  }

  try {
    const data = await Posts.update({
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

export const deletePost = async (req, res, next) => {
  const { id } = req.body

  try {
    const data = await Posts.delete({
      where: {
        id: id,
      },
    })

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}
