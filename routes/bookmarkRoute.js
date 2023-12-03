const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/bookmarkTagController')

router.get('/bookmarks', controller.getBookmarks)

router.post('/bookmarks', [verifyJwt], controller.createBookmark)

module.exports = router
