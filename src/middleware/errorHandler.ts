import type { Response } from 'express'

const errorHandler = (err: any, res: Response) => {
  if (err.message && err.message.includes('Not Found')) {
    err.statusCode = 404
  }

  err.code = err.statusCode || 500
  res.status(err.code)

  const errData = {
    title: err.message || 'Error',
    errors: [
      {
        name: err.name || 'Error',
        code: err.code,
        message: err.message,
      },
    ],
  }

  res.json(errData)
}

export default errorHandler
