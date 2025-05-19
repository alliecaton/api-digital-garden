import { Router } from 'express'

import * as controller from '../controllers/tagController'

const tag = Router()

tag.get('/tags', controller.getTags)
tag.get('/post-tags', controller.getPostTags)
tag.get('/bookmark-tags', controller.getBookmarkTags)

export default tag
