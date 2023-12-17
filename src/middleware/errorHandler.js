const errorHandler = (err, req, res, next) => {
  err.code = err.statusCode || 500
  res.status(err.code)

  const errData = {
    title: 'Error',
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
