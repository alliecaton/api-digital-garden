import type { Request, Response, NextFunction } from 'express'
import { uploadToS3 } from '../config/s3.config'

interface MulterRequest extends Request {
  file?: Express.Multer.File
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
}

export const uploadImages = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Handle both array and object formats from multer
    let files: Express.Multer.File[] = []
    if (Array.isArray(req.files)) {
      files = req.files
    } else if (req.files && typeof req.files === 'object') {
      // If files is an object (fieldname -> File[]), flatten it
      files = Object.values(req.files).flat()
    }

    if (files.length === 0) {
      return res.status(400).json({ 
        error: 'No files uploaded',
        message: 'Please provide at least one image file with the field name "images"'
      })
    }

    const uploadPromises = files.map((file) =>
      uploadToS3(file.buffer, file.originalname, file.mimetype).then((result) => ({
        success: true,
        url: result.url,
        key: result.key,
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      }))
    )

    const results = await Promise.all(uploadPromises)

    // Return array of uploaded images with their URLs
    res.json({
      success: true,
      count: results.length,
      images: results,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

