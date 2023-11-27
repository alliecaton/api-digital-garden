const express = require('express')
const router = express.Router()

const controller = require('../controllers/bookController')

router.get('/current-book', controller.getCurrentlyReading)

module.exports = router
