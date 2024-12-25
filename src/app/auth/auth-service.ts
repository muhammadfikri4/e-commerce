import { ErrorApp } from "../../utils/http-error";
import * as customersRepository from "../customers/customers-repository";
import { MESSAGE_CODE } from "../../utils/error-code";
import { MESSAGES } from "../../utils/messages";
import * as bcrypt from "bcrypt";
import { CustomerDAO } from "../customers/customers-dao";
import { LoginDAO } from "./auth-dao";
import { GenerateToken } from "../../utils/generate-token";

export const register = async (data: CustomerDAO) => {
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

export const login = async (data: LoginDAO) => {
  const customer = await customersRepository.getCustomerByEmail(data.email);

  if (!customer) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT
    );
  }

  const isMatch = await bcrypt.compare(data.password, customer.password);
  if (!isMatch) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.INVALID.USER.PASSWORD
    );
  }
  const accessToken = await GenerateToken(customer.id);

  return {
    accessToken,
  };
};
