import dotenv from 'dotenv'
dotenv.config()

const BASE_URL = process.env.BACKEND_API_URL || 'http://localhost:3005'

export const API_URL = BASE_URL
export const IMG_URL = BASE_URL + '/public/img'
export const BE_URL = BASE_URL
export const UPLOAD_URL = BASE_URL + '/public/uploads'
