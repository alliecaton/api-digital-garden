import prisma from '../prisma/prisma.js'

const { Bookmarks } = prisma

export const getBookmarks = async (req, res) => {
  try {
    const data = await Bookmarks.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: { tags: true },
    })

    if (data) {
      res.send(data)
    }
  } catch (e) {
    console.error(e)
  }
}

export const createBookmark = async (req, res) => {
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
  }
}

export const updateBookmark = async (req, res) => {
  const { id, title, url, description, quote, tags } = req.body

  try {
    const data = await Bookmark.update({
      data: { title: title, url: url, description: description, quote: quote },
      where: { id: id },
    })

    if (tags) {
      // setTagsOnBookmark(data, tags)
    }

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}

export const deleteBookmark = async (req, res) => {
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
  }
}
