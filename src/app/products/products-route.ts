import { Router } from "express";
import { createProduct, getProducts } from "./products-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";
import { createUploader } from "../../utils/upload-file";
import { BUCKET_FOLDER } from "../../utils/upload-file-storage";

export const productRoute = Router();

const upload = createUploader(BUCKET_FOLDER.products);

productRoute.post(
  "/",
  CatchWrapper(upload.single("image")),
  CatchWrapper(createProduct)
);

productRoute.get("/", CatchWrapper(getProducts));
