import { db } from "../../config";
import { getEstimated } from "../../utils/replace-estimated";
import { OrderRepositoryProps } from "./orders-dao";
import { Query } from "../../interface/Query";
import { OrderStatus } from "@prisma/client";

export const createOrder = async (data: OrderRepositoryProps) => {
  return await db.order.create({
    data: {
      customerId: data.customerId,
      orderDate: new Date(),
      sendDate: data.sendDate,
      finishDate: new Date(getEstimated(data.estimated)),
      addressId: data.addressId,
      paymentMethodId: data.paymentMethodId,
      courierId: data.courierId,
      estimated: data.estimated,
      status: OrderStatus.PENDING,
      productOrder: {
        createMany: {
          data: data.products.map((item) => ({
            productId: item.productId,
            total: Number(item.count),
          })),
        },
      },
    },
  });
};

export const getOrders = async (query: Query) => {
  const { customerId, search, status } = query;
  return await db.order.findMany({
    where: {
      customerId,
      status: status as OrderStatus,
      OR: [
        {
          productOrder: {
            some: {
              product: {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            },
          },
        },
      ],
    },
    include: {
      productOrder: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      address: true,
      courier: true,
      paymentMethod: true,
    },
  });
};
