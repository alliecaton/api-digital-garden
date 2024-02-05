import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt'
import * as controller from '../controllers/bookmarkController'

const bookmark = Router()

bookmark.get('/bookmarks', controller.getBookmarks)

bookmark.post('/bookmarks', [verifyJwt], controller.createBookmark)

bookmark.put('/bookmarks/:id', [verifyJwt], controller.updateBookmark)

bookmark.delete('/bookmarks/:id', [verifyJwt], controller.deleteBookmark)

export default bookmark
