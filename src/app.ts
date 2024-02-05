import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

import postRouter from './routes/postRoute'
import userRouter from './routes/userRoute'
import bookRouter from './routes/bookRoute'
import bookmarkRouter from './routes/bookmarkRoute'
import tagRouter from './routes/tagRoute'
import rssRouter from './routes/rssRoute'

import errorHandler from './middleware/errorHandler'

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

const base = process.env.API_BASE as string
// Routes
app.use(base, postRouter)
app.use(base, bookRouter)
app.use(base, userRouter)
app.use(base, bookmarkRouter)
app.use(base, tagRouter)
app.use(base, rssRouter)

app.use(errorHandler)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
