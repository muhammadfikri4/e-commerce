import { ChartDAO } from "./chart-dao";
import * as productRepository from "../products/products-repository";
import * as chartRepository from "./chart-repository";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { MESSAGE_CODE } from "../../utils/error-code";
import { getChartDTOMapper } from "./chart-mapper";
import { Query } from "../../interface/Query";

export const createChart = async (data: ChartDAO) => {
  const product = await productRepository.getProductById(data.productId);

  if (!product) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.PRODUCT,
      404,
      MESSAGE_CODE.NOT_FOUND
    );
  }

  const chartProduct = await chartRepository.getChartProduct({
    customerId: data.customerId,
    productId: data.productId,
  });

  if (chartProduct) {
    const result = await chartRepository.updateChartIncreaseCount(
      chartProduct.id,
      {
        count: data.count,
        customerId: data.customerId,
        productId: data.productId,
      }
    );
    return result;
  }

  const result = await chartRepository.createChart({
    customerId: data.customerId,
    productId: data.productId,
    count: data.count,
  });

  return result;
};

export const getChart = async (query: Query) => {
  const result = await chartRepository.getChartsByCustomerId(query);
  const data = getChartDTOMapper(result);
  return data;
};
