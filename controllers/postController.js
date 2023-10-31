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
  } catch (err) {
    console.error(err.message)
  }
}
