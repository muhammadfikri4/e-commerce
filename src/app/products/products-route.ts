import { Router } from "express";
import { createProduct } from "./products-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";
import { upload } from "../../utils/upload-file-storage";

export const productRoute = Router();

productRoute.post(
  "/",
  CatchWrapper(upload.single("image")),
  CatchWrapper(createProduct)
);
