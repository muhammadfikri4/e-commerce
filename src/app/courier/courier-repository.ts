import { db } from "../../config";
import { Query } from "../../interface/Query";
import { CourierDAO } from "./courier-dao";

export const createCourier = async (data: CourierDAO) => {
  return await db.courier.create({
    data: {
      name: data.name,
    },
  });
};

export const getCourier = async (query?: Query) => {
  const { search } = query ?? {};
  return await db.courier.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      _count: true,
    },
  });
};
