import type { Request, Response, NextFunction } from 'express'
import { uploadToS3 } from '../config/s3.config'

interface MulterRequest extends Request {
  file?: Express.Multer.File
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] }
}

export const uploadImage = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        error: 'No file uploaded',
        message: 'Please provide an image file with the field name "image"'
      })
    }

    // Upload to S3 using the AWS SDK v3
    const { url, key } = await uploadToS3(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    )

    // Return the S3 URL that can be used directly in the frontend
    res.json({
      success: true,
      url: url, // This is the public URL you can use in your frontend
      key: key,
      filename: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
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

    // Upload all files to S3 in parallel
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

