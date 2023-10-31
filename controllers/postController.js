const models = require('../models')

exports.getPosts = async (req, res) => {
  try {
    const data = await models.Post.findAndCountAll({
      order: [['updatedAt', 'DESC']],
    })

    if (data) {
      res.send(data.rows)
    }
  } catch (e) {
    console.error(e.message)
  }
}

exports.getPost = async (req, res) => {
  const { id } = req.params

  try {
    const data = await models.Post.findByPk(id)

    if (data) {
      res.send(data.dataValues)
    }
  } catch (e) {
    console.error(e.message)
  }
}

exports.createPost = async (req, res) => {
  const { title, content } = req.body

  try {
    const data = await models.Post.create(
      { title: title, content: content },
      { isNewRecord: true }
    )

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}
