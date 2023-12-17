import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import postRouter from './src/routes/postRoute.js'
import userRouter from './src/routes/userRoute.js'
import bookRouter from './src/routes/bookRoute.js'
import bookmarkRouter from './src/routes/bookmarkRoute.js'
import tagRouter from './src/routes/tagRoute.js'

import errorHandler from './src/middleware/errorHandler.js'

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

// Routes
app.use(process.env.API_BASE, postRouter)
app.use(process.env.API_BASE, bookRouter)
app.use(process.env.API_BASE, userRouter)
app.use(process.env.API_BASE, bookmarkRouter)
app.use(process.env.API_BASE, tagRouter)

app.use(errorHandler)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
