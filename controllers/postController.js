const models = require('../models')

const Post = models.Post

exports.getPosts = async (req, res) => {
  try {
    const data = await Post.findAndCountAll({
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
    const data = await Post.findByPk(id)

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
    const data = await Post.create(
      { title: title, content: content },
      { isNewRecord: true },
      {
        returning: true,
      }
    )

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}

exports.updatePost = async (req, res) => {
  console.log(req.params)
  const { title, content } = req.body
  const { id } = req.params

  try {
    const data = await Post.update(
      { title: title, content: content },
      { returning: true, where: { id: id } }
    )

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}

exports.deletePost = async (req, res) => {
  const { id } = req.params

  try {
    const data = await Post.destroy({
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
