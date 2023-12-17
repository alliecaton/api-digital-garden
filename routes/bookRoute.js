import { Router } from 'express'
import * as controller from '../controllers/bookController.js'

const book = Router()

book.get('/current-book', controller.getCurrentlyReading)

export default book
