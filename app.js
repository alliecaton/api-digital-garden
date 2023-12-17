import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './config/db.js'

import postRouter from './routes/postRoute.js'
import userRouter from './routes/userRoute.js'
import bookRouter from './routes/bookRoute.js'
import bookmarkRouter from './routes/bookmarkRoute.js'

import errorHandler from './middleware/errorHandler.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CORS_URL,
  })
)

// DB check
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

app.use(errorHandler)

// Routes
app.use(process.env.API_BASE, postRouter)
app.use(process.env.API_BASE, bookRouter)
app.use(process.env.API_BASE, userRouter)
app.use(process.env.API_BASE, bookmarkRouter)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
