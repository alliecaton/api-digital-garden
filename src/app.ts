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
import uploadRouter from './routes/uploadRoute'

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

const base = (process.env.API_BASE as string) || ''
// Redirect site-facing paths to the new website domain (preserve query)
app.get('/posts/:slug', (req, res) => {
  const { slug } = req.params
  const query = req.url.includes('?') ? `?${req.url.split('?')[1]}` : ''
  res.redirect(301, `https://its-spelled-allie.com/posts/${slug}${query}`)
})

app.get(`${base}/posts/:slug`, (req, res) => {
  const { slug } = req.params
  const query = req.url.includes('?') ? `?${req.url.split('?')[1]}` : ''
  res.redirect(301, `https://its-spelled-allie.com/posts/${slug}${query}`)
})

// Redirect RSS feed to new site feed URL
app.get('/rss', (req, res) => {
  res.redirect(301, 'https://its-spelled-allie.com/rss')
})

app.get(`${base}/rss`, (req, res) => {
  res.redirect(301, 'https://its-spelled-allie.com/rss')
})

// Routes
app.use(base, postRouter)
app.use(base, bookRouter)
app.use(base, userRouter)
app.use(base, bookmarkRouter)
app.use(base, tagRouter)
app.use(base, rssRouter)
app.use(base, uploadRouter)

app.use(errorHandler)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
