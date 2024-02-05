import { Router } from 'express'

import * as controller from '../controllers/rssController.js'

const rss = Router()

rss.get('/rss', controller.generateRss)

export default rss
