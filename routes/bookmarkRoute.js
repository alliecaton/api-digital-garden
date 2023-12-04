const express = require('express')
const router = express.Router()

const verifyJwt = require('../middleware/verifyJwt')

const controller = require('../controllers/bookmarkTagController')

router.get('/bookmarks', controller.getBookmarks)

router.post('/bookmarks', [verifyJwt], controller.createBookmark)

router.put('/bookmarks/:id', [verifyJwt], controller.updateBookmark)

router.delete('/bookmarks/:id', [verifyJwt], controller.deleteBookmark)

module.exports = router
