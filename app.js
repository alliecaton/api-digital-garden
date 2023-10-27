const express = require('express')
const app = express()

const postsController = require('./controllers/postsController')

app.use(express.json())

// const posts = require('./routes/posts.js')

require('dotenv').config()

// define the routes
app.post('/posts', postsController.createPost)

app.get('/posts', postsController.getPosts)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
