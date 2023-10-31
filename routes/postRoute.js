const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/postController')

router.get('/posts', controller.getPosts)

router.get('/posts/:id', controller.getPost)

router.post('/post', [verifyJwt], controller.createPost)

module.exports = router
