import { db } from "../../config";
import { AddressDAO } from "./address-dao";

export const getAddressPrimary = async (customerId: string) => {
  return await db.address.findFirst({
    where: {
      customerId,
      isPrimary: true,
    },
  });
};

export const createAddress = async (data: AddressDAO) => {
  return await db.address.create({
    data: {
      customerId: data.customerId,
      name: data.name,
      phoneNumber: data.phoneNumber,
      description: data.description,
      longitude: data.longitude,
      latitude: data.latitude,
      isPrimary: data.isPrimary,
    },
  });
};
