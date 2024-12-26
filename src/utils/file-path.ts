import { config } from "../libs"

export const filePath = (filename:string) => {
  const endpoint = config.STORAGE.ENDPOINT
  const bucket = config.STORAGE.BUCKET

  return `${endpoint}/${bucket}/${filename}`
}