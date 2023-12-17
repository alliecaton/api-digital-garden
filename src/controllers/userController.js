import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma/prisma.js'
import config from '../config/auth.config.js'

const { Users } = prisma

export const isLoggedIn = (req, res) => {
  res.status(200).send({ message: 'User is logged in.', loggedIn: true })
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await Users.findFirst({
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
    next(e)
  }
}
