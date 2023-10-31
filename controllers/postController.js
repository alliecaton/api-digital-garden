const models = require('../models')

exports.getPosts = async (req, res) => {
  try {
    const data = await models.Post.findAndCountAll({
      order: [['updatedAt', 'DESC']],
    })

    if (data) {
      const json = res.json(data.rows)

      res.send(json)
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
      const json = res.json(data.dataValues)

      res.send(json)
    }
  } catch (e) {
    console.error(e.message)
  }
}
