import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import multer from 'multer'
import path from 'path'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-west-1',
})

export const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    const allowedMimes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
    ]
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(
        new Error(
          'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'
        )
      )
    }
  },
})

/**
 * Upload a file to S3 using AWS SDK v3
 * @param fileBuffer - The file buffer to upload
 * @param originalName - Original filename
 * @param mimetype - MIME type of the file
 * @returns Object containing the S3 URL and key
 */
export const uploadToS3 = async (
  fileBuffer: Buffer,
  originalName: string,
  mimetype: string
): Promise<{ url: string; key: string }> => {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  const filenameStripped = originalName.replace(/\s+/g, '_')
  const ext = path.extname(filenameStripped)
  const name = path.basename(filenameStripped, ext)
  const filename = `${name}-${uniqueSuffix}${ext}`
  const key = `images/${filename}`

  const bucketName = process.env.AWS_S3_BUCKET_NAME
  if (!bucketName) {
    throw new Error('AWS_S3_BUCKET_NAME environment variable is not set')
  }

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: mimetype,
  }

  try {
    await s3Client.send(new PutObjectCommand(params))

    const region = process.env.AWS_REGION || 'us-west-1'
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`

    return { url, key }
  } catch (err) {
    console.error('Error uploading file to S3:', err)
    throw new Error('Failed to upload file to S3')
  }
}
