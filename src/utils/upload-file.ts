import multer from "multer";
import { MulterFileFilter } from "./upload-file-storage";
import fs from "fs";
import path from "path";

const ensureFolderExists = (folder: string) => {
  const folderPath = path.resolve(folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // Buat folder secara rekursif jika belum ada
  }
};

const getStorage = (folder: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const folderPath = `src/assets/${folder}`;
      ensureFolderExists(folderPath); // Pastikan folder sudah ada
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  });

const createUploader = (folder: string) => {
  return multer({ storage: getStorage(folder), fileFilter: MulterFileFilter });
};

export { createUploader };
