import { Router } from 'express'

import * as controller from '../controllers/rssController'

const rss = Router()

rss.get('/rss', controller.generateRss)

export default rss
