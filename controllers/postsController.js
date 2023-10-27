const pool = require('../db')

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body

    console.log(req.body)

    // const newPost = await pool.query(
    //   'INSERT INTO post (content) VALUES($1) RETURNING *',
    //   [content]
    // )
    // res.json(newPost.rows[0])
  } catch (err) {
    console.error(err.message)
  }
}

exports.getPosts = async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM post')
    res.json(posts.rows)
  } catch (err) {
    console.error(err.message)
  }
}
