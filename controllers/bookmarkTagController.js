const models = require('../models')

const Bookmark = models.Bookmark
const Tag = models.Tag

const setTagsOnBookmark = async (bookmark, tags) => {
  const createdTags = await Promise.all(
    tags.map((tag) =>
      Tag.findOrCreate({
        where: { name: tag.name },
        defaults: { emoji: tag.emoji },
      })
    )
  )

  await bookmark.setTags(createdTags.map((tag) => tag[0]))
}

exports.getBookmarks = async (req, res) => {
  try {
    const data = await Bookmark.findAndCountAll({
      include: [{ model: models.Tag, as: 'tags' }],
      order: [['updatedAt', 'DESC']],
    })

    if (data) {
      res.send(data.rows)
    }
  } catch (e) {
    console.error(e)
  }
}

exports.createBookmark = async (req, res) => {
  const { title, url, description, quote, tags } = req.body

  try {
    const bookmark = await Bookmark.create(
      {
        title: title,
        url: url,
        description: description,
        quote: quote,
      },
      {
        include: [models.Tag],
        exclude: [models.BookmarkTags],
      }
    )

    if (tags) {
      setTagsOnBookmark(bookmark, tags)
    }

    if (bookmark) {
      res.json({ bookmark, tags })
    }
  } catch (e) {
    console.error(e)
  }
}

exports.updateBookmark = async (req, res) => {
  const { id, title, url, description, quote, tags } = req.body

  try {
    const data = await Bookmark.update(
      { title: title, url: url, description: description, quote: quote },
      { returning: true, where: { id: id } }
    )

    if (tags) {
      setTagsOnBookmark(data, tags)
    }

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}

exports.deleteBookmark = async (req, res) => {
  const { id } = req.body

  try {
    const data = await Bookmark.destroy({
      returning: true,
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
