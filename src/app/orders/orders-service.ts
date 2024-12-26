import { OrderDAO } from "./orders-dao";
// import * as ordersRepository from "./orders-repository";
import * as addressRepository from "../address/address-repository";
import * as productRepository from "../products/products-repository";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { MESSAGE_CODE } from "../../utils/error-code";

export const createOrder = async (data: OrderDAO) => {
  const address = await addressRepository.getAddressById(data.addressId);
  if (!address) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const products = await productRepository.getProductByIds(
    data.products.map((item) => item.productId)
  );
  let isNotFound = false;
  data.products.forEach((item) => {
    const exist = products.find((product) => product.id === item.productId);
    if (!exist) {
      isNotFound = true;
    }
  });
  if (isNotFound) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.PRODUCT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

//   const result = await ordersRepository.createOrder({
//     addressId: data.addressId,
    
//   });
};
