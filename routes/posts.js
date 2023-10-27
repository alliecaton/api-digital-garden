const express = require('express')
const router = express.Router()

router.get('/posts', (req, res) => {
  res.send('All posts')
})

router.get('/posts/:slug', (req, res) => {
  res.send('A post based on slug')
})

module.exports = router
