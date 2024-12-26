import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/error-code";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import { AddressDAO } from "./address-dao";
import { getAddressDTOMapper } from "./address-mapper";
import * as addressRepository from "./address-repository";

export const createAddress = async (data: AddressDAO) => {
  const primaryAddress = await addressRepository.getAddressPrimary(
    data.customerId
  );
  if (primaryAddress && data.isPrimary) {
    return new ErrorApp(
      MESSAGES.ERROR.INVALID.DOUBLE_PRIMARY_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const result = await addressRepository.createAddress(data);
  return result;
};

export const getAddressCustomer = async (query: Query) => {
  const result = await addressRepository.getAddressCustomer(query);
  return getAddressDTOMapper(result);
};
