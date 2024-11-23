import { db } from "config";
import { CustomerDAO } from "./customers-dao";

export const createCustomer = async (data: CustomerDAO) => {
  return await db.customer.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
    },
  });
};

export const getCustomerByEmail = async (email: string) => {
  return await db.customer.findUnique({
    where: {
      email,
    },
  });
};

export const getCustomerByPhoneNumber = async (phoneNumber: string) => {
  return await db.customer.findUnique({
    where: {
      phoneNumber,
    },
  });
};
