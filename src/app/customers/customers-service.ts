import { ErrorApp } from "../../utils/http-error";
import { CustomerDAO } from "./customers-dao";
import * as customersRepository from "./customers-repository";
import { MESSAGE_CODE } from "../../utils/error-code";
import { MESSAGES } from "../../utils/messages";
import * as bcrypt from "bcrypt";

export const createCustomer = async (data: CustomerDAO) => {
  const existEmail = await customersRepository.getCustomerByEmail(data.email);
  if (existEmail) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL
    );
  }
  const existPhone = await customersRepository.getCustomerByPhoneNumber(
    data.phoneNumber
  );
  if (existPhone) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.GLOBAL.PHONE_NUMBER
    );
  }

  const password = await bcrypt.hash(data.password, 10);
  const result = await customersRepository.createCustomer({
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    password,
  });
  return result;
};
