import { MESSAGE_CODE } from "../../utils/error-code";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { ProductDAO } from "./products-dao";
import * as productsRepository from "./products-repository";
import * as categoryRepository from "../categories/categories-repository";

export const createProduct = async (data: ProductDAO) => {
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
  const result = await productsRepository.createProduct(data);

  return result;
};
