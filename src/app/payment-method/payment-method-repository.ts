import { db } from "../../config";
import { Query } from "../../interface/Query";

export const createPaymentMethod = async (name: string) => {
  return await db.paymentMethod.create({
    data: {
      name,
    },
  });
};

export const getPaymentMethod = async (query: Query) => {
  const { search } = query;
  return await db.paymentMethod.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
};

export const getPaymentMethodByName = async (name: string) => {
  return await db.paymentMethod.findFirst({
    where: {
      name: name?.toLowerCase(),
    },
  });
};

export const getPaymentMethodById = async (paymentMethodId: string) => {
  return await db.paymentMethod.findUnique({
    where: {
      id: paymentMethodId,
    },
  });
};
