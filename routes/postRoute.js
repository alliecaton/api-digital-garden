const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/postController')

router.get('/posts', controller.getPosts)

router.get('/posts/:id', controller.getPost)

router.post('/posts', [verifyJwt], controller.createPost)

router.put('/posts/:id', [verifyJwt], controller.updatePost)

router.delete('/posts/:id', [verifyJwt], controller.deletePost)

module.exports = router
