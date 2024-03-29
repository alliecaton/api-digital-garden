import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma/prisma'
import config from '../config/auth.config'

import type { Request, Response, NextFunction } from 'express'

const { users } = prisma

export const isLoggedIn = (req: Request, res: Response) => {
  res.status(200).send({ message: 'User is logged in.', loggedIn: true })
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body

    const user = await users.findFirst({
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

      if (valid && config.secret) {
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
    next(error)
  }
}
