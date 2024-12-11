import { ErrorApp } from "../../utils/HttpError";
import * as customersRepository from "../customers/customers-repository";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { MESSAGES } from "../../utils/Messages";
import * as bcrypt from "bcrypt";
import { CustomerDAO } from "../customers/customers-dao";

export const register = async (data: CustomerDAO) => {
  const existEmail = await customersRepository.getCustomerByEmail(data.email);
  if (existEmail) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.GLOBAL.EMAIL,
    );
  }

  const existPhone = await customersRepository.getCustomerByPhoneNumber(
    data.phoneNumber,
  );
  if (existPhone) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.GLOBAL.PHONE_NUMBER,
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
