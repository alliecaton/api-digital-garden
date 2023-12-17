import prisma from '../../prisma/prisma.js'

const { Posts } = prisma

export const getPosts = async (req, res, next) => {
  try {
    const data = await Posts.findMany({
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

export const getPost = async (req, res, next) => {
  const { id: slug } = req.params

  console.log(req.params)

  try {
    // TODO: update this to use findUnique and update frontend to pass the id as well as the slug
    const data = await Posts.findFirst({
      where: {
        slug: slug,
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

export const createPost = async (req, res, next) => {
  const { title, content } = req.body

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const data = await Posts.create({
      data: { title: title, content: content, slug: slug },
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
  const { title, content } = req.body
  const { id: slug } = req.params

  try {
    const data = await Posts.update({
      where: { slug: slug },
      data: { title: title, content: content },
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
  const { id: slug } = req.params

  try {
    const data = await Post.delete({
      where: {
        slug: slug,
      },
    })

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}
