import { Address } from "@prisma/client";
import { AddressDTO } from "./address-dto";

export const getAddressDTOMapper = (data: Address[]): AddressDTO[] => {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    phoneNumber: item.phoneNumber,
    longitude: item.longitude,
    latitude: item.latitude,
    isPrimary: item.isPrimary,
    createdAt: item.createdAt,
  }));
};
