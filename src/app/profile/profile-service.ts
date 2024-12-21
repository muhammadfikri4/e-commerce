import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import * as customersRepository from "../customers/customers-repository";
import { getProfileDTOMapper } from "./profile-mapper";

export const getProfile = async (customerId: string) => {
  const customer = await customersRepository.getCustomerById(customerId);
  if (!customer) {
    return new ErrorApp(
      MESSAGE_CODE.NOT_FOUND,
      404,
      MESSAGES.ERROR.NOT_FOUND.USER.ACCOUNT
    );
  }
  const result = getProfileDTOMapper(customer);
  return result;
};
