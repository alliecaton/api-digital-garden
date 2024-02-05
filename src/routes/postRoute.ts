import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt'

import * as controller from '../controllers/postController'

const post = Router()

post.get('/posts', controller.getPosts)

post.get('/posts/:id', controller.getPost)

post.post('/posts', [verifyJwt], controller.createPost)

post.put('/posts/:id', [verifyJwt], controller.updatePost)

post.delete('/posts/:id', [verifyJwt], controller.deletePost)

export default post
