import { MESSAGE_CODE } from "../../utils/error-code";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { ProductDAO } from "./products-dao";
import * as productsRepository from "./products-repository";
import * as categoryRepository from "../categories/categories-repository";
import sharp from "sharp";
import {
  BUCKET_FOLDER,
  FileType,
  UploadFileToStorage,
} from "../../utils/upload-file-storage";
import { config } from "../../libs";
import { Query } from "../../interface/Query";
import { Meta } from "../../utils/meta";
import { getProductsDTOMapper } from "./products-mapper";

export const createProduct = async (data: ProductDAO) => {
  let fileName;
  try {
    const product = await productsRepository.getProductByName(data.name);
    if (product) {
      return new ErrorApp(
        MESSAGE_CODE.BAD_REQUEST,
        400,
        MESSAGES.ERROR.ALREADY.PRODUCT
      );
    }
    const category = await categoryRepository.getCategoryById(data.categoryId);
    if (!category) {
      return new ErrorApp(
        MESSAGE_CODE.BAD_REQUEST,
        400,
        MESSAGES.ERROR.NOT_FOUND.CATEGORY
      );
    }
    const img = data.image as Express.Multer.File;
    fileName = `${img?.originalname.replace(FileType[img.mimetype], "")} - ${+new Date()}.webp`;
    const quality =
      ((img as unknown as Express.Multer.File)?.size as number) >
      5 * 1024 * 1024
        ? 75
        : 100;
    const compress = await sharp(img.buffer).webp({ quality }).toBuffer();
    await UploadFileToStorage({
      Bucket: config.STORAGE.BUCKET,
      Key: `${BUCKET_FOLDER.products}/${fileName}`,
      Body: compress,
      ContentType: FileType["image/webp"],
      ACL: "public-read",
    });
    const result = await productsRepository.createProduct({
      price: data.price,
      description: data?.description,
      stock: data.stock,
      categoryId: data.categoryId,
      name: data.name,
      image: fileName,
    });

    return result;
  } catch (error) {
    console.log(error);
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.INVALID.UPLOAD_FILE
    );
  }
};

export const getProducts = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [products, totalData] = await Promise.all([
    productsRepository.getProducts(query),
    productsRepository.getProductsCount(query),
  ]);
  const meta = Meta(Number(page), Number(perPage), Number(totalData));
  return {
    data: getProductsDTOMapper(products),
    meta,
  };
};
