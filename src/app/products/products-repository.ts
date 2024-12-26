import { db } from "../../config";
import { ProductDAO } from "./products-dao";

export const createProduct = async (data: ProductDAO) => {
  return await db.product.create({
    data: {
      description: data.description,
      image: data.image as string,
      name: data.name,
      price: Number(data.price),
      stock: Number(data.stock),
      categoryId: data.categoryId,
    },
  });
};

export const getProductByName = async (name: string) => {
  return await db.product.findFirst({
    where: {
      name,
    },
  });
};
