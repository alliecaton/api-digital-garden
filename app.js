const express = require('express')
const app = express()

const db = require('./config/db.js')

const postRouter = require('./routes/postRoute')

require('dotenv').config()

app.use(express.json())

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error)
  })

// Routes
app.use(process.env.API_BASE, postRouter)

let port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Server Listening at http://localhost:${port}`)
})
