import { db } from "../../config";
import { Query } from "../../interface/Query";
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

export const getAddressCustomer = async (query: Query) => {
  const { customerId, search } = query;
  return await db.address.findMany({
    where: {
      customerId,
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
};
