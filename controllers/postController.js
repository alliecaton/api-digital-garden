const db = require('../config/db')
const postService = require('../services/postService')

exports.getPosts = async (req, res) => {
  try {
    const data = await postService.getPosts()

    if (data) {
      const json = res.json(data.rows)

      res.send(json)
    }
  } catch (err) {
    console.error(err.message)
  }
}
