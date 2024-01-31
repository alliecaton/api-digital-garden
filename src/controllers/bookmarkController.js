import prisma from '../../prisma/prisma.js'

const { Bookmarks } = prisma

export const getBookmarks = async (req, res, next) => {
  const { page } = req.query

  let skipNum = 0
  if (page) {
    skipNum = (Number(page) - 1) * 10
  }

  try {
    const totalBookmarks = await Bookmarks.count()
    const totalPages = Math.ceil(totalBookmarks / 10)

    const data = await Bookmarks.findMany({
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

export const createBookmark = async (req, res, next) => {
  const { title, url, description, quote, tags } = req.body

  try {
    const bookmark = await Bookmarks.create({
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

export const updateBookmark = async (req, res, next) => {
  const { id, title, url, description, quote, tags } = req.body

  try {
    const data = await Bookmark.update({
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

export const deleteBookmark = async (req, res, next) => {
  const { id } = req.body

  try {
    const data = await Bookmark.delete({
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
