const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const db = require('./config/db.js')

const postRouter = require('./routes/postRoute')
const userRouter = require('./routes/userRoute')

require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// DB check
db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

// Routes
app.use(process.env.API_BASE, postRouter)
app.use(process.env.API_BASE, userRouter)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
