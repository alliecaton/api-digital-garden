const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/userController')

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )

  next()
})

router.get('/user', [verifyJwt], controller.isLoggedIn)

router.post('/login', controller.login)

module.exports = router
