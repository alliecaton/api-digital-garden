import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt'
import { multerUpload } from '../config/s3.config'
import * as controller from '../controllers/uploadController'

const uploadRouter = Router()

// POST endpoint to upload multiple images
// Accepts multiple files with field name "images"
uploadRouter.post(
  '/upload/images',
  verifyJwt,
  multerUpload.array('images', 10), // Allow up to 10 images
  controller.uploadImages
)

export default uploadRouter
