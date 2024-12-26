import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/error-code";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { Meta } from "../../utils/meta";
import * as categoryRepository from "../categories/categories-repository";
import { ProductDAO } from "./products-dao";
import { getProductsDTOMapper } from "./products-mapper";
import * as productsRepository from "./products-repository";

export const createProduct = async (data: ProductDAO) => {
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
    const result = await productsRepository.createProduct({
      price: data.price,
      description: data?.description,
      stock: data.stock,
      categoryId: data.categoryId,
      name: data.name,
      image: img.filename,
    });

    return result;
  } catch (error) {
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
