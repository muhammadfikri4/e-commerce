import {
  DeleteObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3,
} from "@aws-sdk/client-s3";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import { config } from "../libs";
import { MESSAGE_CODE } from "./error-code";
import { ErrorApp } from "./http-error";

export interface FileInterface {
  ContentType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ACL: any;
  Bucket: string;
  Key: string;
  Body: Buffer;
}

export const BUCKET_FOLDER = {
  products: "product",
};

export const FileType: Record<string, string> = {
  "image/pdf": ".pdf",
  "image/png": ".png",
  "image/jpeg": ".jpeg",
  "image/jpg": ".jpg",
  "image/webp": ".webp",
  "application/pdf": ".pdf",
  "application/octet-stream": ".jpg",
};

export const storage = multer.memoryStorage();

export const MulterFileFilter = (
  request: Request,
  file: Express.Multer.File,
  callBack: FileFilterCallback
): void => {
  if (file.mimetype && FileType[file.mimetype]) {
    callBack(null, true);
  } else {
    callBack(null, false);
    callBack(
      new ErrorApp(
        "Tipe file tidak mendukung, tipe file harus berjenis: png, jpg, dan jpeg",
        400,
        MESSAGE_CODE.BAD_REQUEST
      )
    );
  }
};

export const StorageS3Client = new S3({
  forcePathStyle: true,
  endpoint: `${config.STORAGE.ENDPOINT}/s3`,
  credentials: {
    accessKeyId: config.STORAGE.ACCESS_KEY,
    secretAccessKey: config.STORAGE.SECRET_KEY,
  },
  region: config.STORAGE.REGION,
});

export const UploadFileToStorage = async (data: FileInterface) => {
  try {
    const file = await StorageS3Client.send(new PutObjectCommand(data));
    const object = `${data.Bucket}/${data.Key}`;
    console.log("success", object, file);
    return {
      file,
      object,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const RemoveFileFromStorage = async (key: string) => {
  try {
    const file = new DeleteObjectCommand({
      Bucket: config.STORAGE.BUCKET,
      Key: key,
    });
    const result = await StorageS3Client.send(file);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const GetFileFromStorage = async (key: string) => {
  const command = new HeadObjectCommand({
    Bucket: config.STORAGE.BUCKET,
    Key: key,
  });

  try {
    await StorageS3Client.send(command);
    console.log(`File exists: ${key}`);
    return { exists: true, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.name === "NotFound") {
      console.log(`File does not exist: ${key}`);
      return { exists: false, error: null };
    }
    console.error(`Error checking file existence: ${error}`);
    return { exists: false, error };
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: MulterFileFilter,
});
