import {
  Address,
  Category,
  Courier,
  Order,
  PaymentMethod,
  Product,
  ProductOrder,
} from "@prisma/client";
import { filePath } from "../../utils/file-path";
import { BUCKET_FOLDER } from "../../utils/upload-file-storage";

interface ProductData extends Product {
  category: Category;
}

interface ProductOrderData extends ProductOrder {
  product: ProductData;
}

interface OrderData extends Order {
  productOrder: ProductOrderData[];
  address: Address;
  courier: Courier;
  paymentMethod: PaymentMethod;
}

export const getOrdersDTOMapper = (data: OrderData[]) => {
  return data.map((item) => ({
    id: item.id,
    orderDate: item.orderDate,
    sendDate: item.sendDate,
    finishDate: item.finishDate,
    estimated: item.estimated,
    status: item.status,
    totalPrice: item.productOrder.reduce(
      (total, orderProduct) =>
        Number(total) +
        Number(orderProduct.product.price) * Number(orderProduct.total),
      0
    ),
    address: {
      id: item.address.id,
      name: item.address.name,
      phoneNumber: item.address.phoneNumber,
      description: item.address.description,
      longitude: item.address.longitude,
      latitude: item.address.latitude,
      isPrimary: item.address.isPrimary,
    },
    courier: {
      id: item.courier.id,
      name: item.courier.name,
    },
    paymentMethod: {
      id: item.paymentMethod.id,
      name: item.paymentMethod.name,
    },
    products: item.productOrder.map((productOrder) => ({
      id: productOrder.product.id,
      name: productOrder.product.name,
      price: productOrder.product.price,
      description: productOrder.product.description,
      image: filePath(
        `${BUCKET_FOLDER.products}/${productOrder.product.image}`
      ),
      category: {
        id: productOrder.product.category.id,
        name: productOrder.product.category.name,
      },
      count: productOrder.total,
    })),
  }));
};
