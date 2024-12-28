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

export const updateAddress = async (
  addressId: string,
  data: Partial<AddressDAO>
) => {
  const address = await addressRepository.getAddressById(addressId);
  if (!address) {
    return new ErrorApp(
      MESSAGES.ERROR.NOT_FOUND.ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }
  if (data.customerId && typeof data.isPrimary === "boolean") {
    const primaryAddress = await addressRepository.getAddressPrimary(
      data.customerId
    );
    if (primaryAddress && primaryAddress.id !== address.id && data.isPrimary) {
      return new ErrorApp(
        MESSAGES.ERROR.INVALID.DOUBLE_PRIMARY_ADDRESS,
        400,
        MESSAGE_CODE.BAD_REQUEST
      );
    }
  }

  if (
    address.isPrimary &&
    typeof data.isPrimary === "boolean" &&
    !data.isPrimary
  ) {
    return new ErrorApp(
      MESSAGES.ERROR.REQUIRED.PRIMARY_ADDRESS,
      400,
      MESSAGE_CODE.BAD_REQUEST
    );
  }

  const result = await addressRepository.updateAddress(addressId, data);
  return result;
};

export const getAddressCustomer = async (query: Query) => {
  const result = await addressRepository.getAddressCustomer(query);
  return getAddressDTOMapper(result);
};
