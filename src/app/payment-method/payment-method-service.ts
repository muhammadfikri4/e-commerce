import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/error-code";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { PaymentMethodDAO } from "./payment-method-dao";
import * as paymentMethodRepository from "./payment-method-repository";

export const createPaymentMethod = async (data: PaymentMethodDAO) => {
  const paymentMethod = await paymentMethodRepository.getPaymentMethodByName(
    data.name
  );
  if (paymentMethod) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.PAYMENT_METHOD
    );
  }
  const result = await paymentMethodRepository.createPaymentMethod(data.name);
  return result;
};

export const getPaymentMethods = async (query: Query) => {
  const paymentMethods = await paymentMethodRepository.getPaymentMethod(query);
  return paymentMethods;
};
