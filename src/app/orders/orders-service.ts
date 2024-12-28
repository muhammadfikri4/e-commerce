import * as ordersRepository from "./orders-repository";
import * as addressRepository from "../address/address-repository";
import * as courierRepository from "../courier/courier-repository";
import * as productRepository from "../products/products-repository";
import * as paymentMathodRepistory from "../payment-method/payment-method-repository";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { MESSAGE_CODE } from "../../utils/error-code";
import { OrderDAO, PaymentOrderDAO } from "./orders-dao";
import { Query } from "../../interface/Query";
import { getOrdersDTOMapper } from "./orders-mapper";
import { StatusOrder } from "./orders-dto";

export const createOrder = async (customerId: string, data: OrderDAO) => {
  const address = await addressRepository.getAddressById(data.addressId);
  if (!address) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (address.customerId !== customerId) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ORDER_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const paymentMethod = await paymentMathodRepistory.getPaymentMethodById(
    data.paymentMethodId
  );
  if (!paymentMethod) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.PAYMENT_METHOD,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const products = await productRepository.getProductByIds(
    data.products.map((item) => item.productId)
  );

  let isNotFound = false;
  let isDuplicate = false;

  data.products.forEach((item) => {
    const exist = products.find((product) => product.id === item.productId);
    if (!exist) {
      isNotFound = true;
    }
    const duplicate = data.products.filter(
      (product) => item.productId === product.productId
    );
    if (duplicate.length > 1) {
      isDuplicate = true;
    }
  });

  if (isNotFound) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.PRODUCT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (isDuplicate) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.DUPLICATE_ORDER_PRODUCT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const couriers = await courierRepository.getCourier();
  if (!couriers.length) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ORDER_COURIER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const sortingCourier = couriers.sort(
    (a, b) => a._count.order - b._count.order
  );

  const courier = sortingCourier?.[0];

  const result = await ordersRepository.createOrder({
    addressId: data.addressId,
    courierId: courier.id,
    customerId,
    estimated: data.estimated,
    paymentMethodId: data.paymentMethodId,
    sendDate: new Date(),
    products: data.products.map((item) => ({
      productId: item.productId,
      count: item.count,
    })),
  });
  return result;
};

export const getOrders = async (query: Query) => {
  const result = await ordersRepository.getOrders(query);
  const data = getOrdersDTOMapper(result);
  return data;
};

export const paymentOrder = async (
  customerId: string,
  data: PaymentOrderDAO
) => {
  const order = await ordersRepository.getOrderById(data.orderId);
  if (!order) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ORDER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  const totalPrice = order.productOrder.reduce(
    (total, orderProduct) =>
      Number(total) +
      Number(orderProduct.product.price) * Number(orderProduct.total),
    0
  );

  if (Number(totalPrice) > Number(data.amount)) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.AMOUNT,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (order.customerId !== customerId) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ORDER_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  return await ordersRepository.updateStatusOrder(
    data.orderId,
    StatusOrder.PROCESS
  );
};

export const receiveOrder = async (
  customerId: string,
  data: Omit<PaymentOrderDAO, "amount">
) => {
  const order = await ordersRepository.getOrderById(data.orderId);
  if (!order) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ORDER,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (order.customerId !== customerId) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ORDER_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  if (order.status !== StatusOrder.PROCESS) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.ORDER_STATUS_RECEIVED,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  return await ordersRepository.updateStatusOrder(
    data.orderId,
    StatusOrder.FINISHED
  );
};
