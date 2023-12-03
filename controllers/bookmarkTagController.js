const models = require('../models')

const Bookmark = models.Bookmark
const Tag = models.Tag

exports.getBookmarks = async (req, res) => {
  try {
    const data = await Bookmark.findAndCountAll({
      include: [models.Tag],
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
      }
    )

    if (tags) {
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

    if (bookmark) {
      res.status(200).json({ success: true, bookmark, tags })
    }
  } catch (e) {
    console.error(e)
  }
}
