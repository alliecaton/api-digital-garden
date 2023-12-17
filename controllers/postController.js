// import Post from '../models/post.js'
import * as models from '../models/index.js'

const Post = models.Post

export const getPosts = async (req, res) => {
  console.log('CHECKING...', Post)

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

export const getPost = async (req, res) => {
  const { id: slug } = req.params

  try {
    const data = await Post.findOne({
      where: {
        slug: slug,
      },
    })

    if (data) {
      res.send(data.dataValues)
    }
  } catch (e) {
    console.error(e.message)
  }
}

export const createPost = async (req, res) => {
  const { title, content } = req.body

  try {
    const slug = title.toLowerCase().replace(/\s+/g, '-')

    const data = await Post.create(
      { title: title, content: content, slug: slug },
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

export const updatePost = async (req, res) => {
  const { title, content } = req.body
  const { id: slug } = req.params

  try {
    const data = await Post.update(
      { title: title, content: content },
      { returning: true, where: { slug: slug } }
    )

    if (data) {
      res.json(data)
    }
  } catch (e) {
    console.error(e)
  }
}

export const deletePost = async (req, res) => {
  const { id: slug } = req.params

  try {
    const data = await Post.destroy({
      returning: true,
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
