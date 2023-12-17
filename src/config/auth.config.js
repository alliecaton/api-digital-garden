import dotenv from 'dotenv'
dotenv.config()

const config = {
  secret: process.env.AUTH_SECRET,
}

export default config
