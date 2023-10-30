const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')

router.get('/posts', controller.getPosts)

// router.get('/posts/:slug', (req, res) => {
//   res.send('A post based on slug')
// })

module.exports = router
