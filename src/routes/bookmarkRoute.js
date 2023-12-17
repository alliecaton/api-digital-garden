import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt.js'
import * as controller from '../controllers/bookmarkController.js'

const bookmark = Router()

bookmark.get('/bookmarks', controller.getBookmarks)

bookmark.post('/bookmarks', [verifyJwt], controller.createBookmark)

bookmark.put('/bookmarks/:id', [verifyJwt], controller.updateBookmark)

bookmark.delete('/bookmarks/:id', [verifyJwt], controller.deleteBookmark)

export default bookmark
