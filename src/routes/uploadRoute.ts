import { Router } from 'express'
import verifyJwt from '../middleware/verifyJwt'
import { multerUpload } from '../config/s3.config'
import * as controller from '../controllers/uploadController'

const uploadRouter = Router()

uploadRouter.post(
  '/upload/images',
  verifyJwt,
  multerUpload.array('images', 10),
  controller.uploadImages
)

export default uploadRouter
