import { config } from "../libs"

export const filePathStorage = (filename:string) => {
  const endpoint = config.STORAGE.ENDPOINT_RESPONSE
  const bucket = config.STORAGE.BUCKET

  return `${endpoint}/${bucket}/${filename}`
}

export const filePath = (filename:string) => {
  return `http://localhost:${config.PORT}/assets/${filename}`
}