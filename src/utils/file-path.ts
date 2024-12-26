import { config } from "../libs"

export const filePath = (filename:string) => {
  const endpoint = config.STORAGE.ENDPOINT_RESPONSE
  const bucket = config.STORAGE.BUCKET

  return `${endpoint}/${bucket}/${filename}`
}