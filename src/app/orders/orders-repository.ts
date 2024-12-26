import { db } from "../../config";
import { getEstimated } from "../../utils/replace-estimated";
import { OrderRepositoryProps } from "./orders-dao";

export const createOrder = async (data: OrderRepositoryProps) => {
  return await db.order.create({
    data: {
      customerId: data.customerId,
      orderDate: new Date(),
      sendDate: data.sendDate,
      finishDate: new Date(getEstimated(data.estimated)),
      totalPrice: Number(data.totalPrice),
      addressId: data.addressId,
      paymentMethodId: data.paymentMethodId,
      courierId: data.courierId,
      estimated: data.estimated,
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
