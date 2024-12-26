import { ChartDAO } from "./chart-dao";
import * as productRepository from "../products/products-repository";
import * as chartRepository from "./chart-repository";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { MESSAGE_CODE } from "../../utils/error-code";

export const createChart = async (data: ChartDAO) => {
  const product = await productRepository.getProductById(data.productId);

  if (!product) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.PRODUCT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const result = await chartRepository.createChart({
    customerId: data.customerId,
    productId: data.productId,
  });

  return result;
};
