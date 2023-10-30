const bcrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken')

const models = require('../models')

const config = require('../config/auth.config')

exports.isLoggedIn = (req, res) => {
  res.status(200).send('User logged in.')
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await models.User.findOne({
      where: {
        username: username,
      },
    })

    if (!user) {
      res.status(404).send({ error: 'User not found.' })
    }

    if (user) {
      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        res.status(401).send({
          accessToken: null,
          error: 'Invalid Password',
        })
      }

      if (valid) {
        const token = jwt.sign({ id: user.id }, config.secret, {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        })

        res.status(200).send({
          id: user.id,
          username: username,
          accessToken: token,
        })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: err.message })
  }
}
