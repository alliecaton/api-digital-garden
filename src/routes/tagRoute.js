import { Router } from 'express'

import * as controller from '../controllers/tagController.js'

const tag = Router()

tag.get('/tags', controller.getTags)

export default tag
