const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')

router.get('/posts', controller.getPosts)

router.get('/posts/:id', controller.getPost)

module.exports = router
