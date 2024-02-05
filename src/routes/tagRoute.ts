import { Router } from 'express'

import * as controller from '../controllers/tagController'

const tag = Router()

tag.get('/tags', controller.getTags)

export default tag
