import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt'
import * as controller from '../controllers/userController'

const user = Router()

user.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )

  next()
})

user.get('/user', [verifyJwt], controller.isLoggedIn)

user.post('/login', controller.login)

export default user
