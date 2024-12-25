import dotenv from "dotenv";

dotenv.config();
const env = process.env;

export const config = {
  PORT: env.PORT ?? 5000,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRES: env.JWT_EXPIRES,
  STORAGE: {
    BUCKET: env.AWS_STORAGE_BUCKET ?? "",
    ENDPOINT: env.AWS_STORAGE_ENDPOINT ?? "",
    ENDPOINT_RESPONSE: env.AWS_STORAGE_ENDPOINT
      ? `${env.AWS_STORAGE_ENDPOINT}/object/public`
      : "",
    REGION: env.AWS_STORAGE_REGION ?? "",
    ACCESS_KEY: env.AWS_STORAGE_ACCESS_KEY ?? "",
    SECRET_KEY: env.AWS_STORAGE_SECRET_KEY ?? "",
    BUCKET_FOLDER: env.AWS_STORAGE_BUCKET_FOLDER ?? "",
  },
};
