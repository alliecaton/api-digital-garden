import jwt from 'jsonwebtoken'

import config from '../config/auth.config.js'

import type { Request, Response, NextFunction } from 'express'

interface RequestExtended extends Request {
  userId: string
}

interface JwtPayload {
  id: string
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token'] as string

  if (!token) return res.status(403).send({ error: 'No token provided' })

  if (!config.secret) return res.status(500).send({ error: 'Server error' })

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Unauthorized' })

    if (decoded) {
      const typedReq = req as RequestExtended
      typedReq.userId = (decoded as JwtPayload).id
    }

    next()
  })
}

export default verifyToken
