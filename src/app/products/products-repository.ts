import { db } from "../../config";
import { Query } from "../../interface/Query";
import { queryPagination } from "../../utils/query-pagination";
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

export const getProducts = async (query: Query) => {
  const { search, categoryId } = query;
  return await db.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          categoryId,
        },
      ],
    },
    include: {
      category: true,
    },
    ...queryPagination(query),
  });
};
export const getProductsCount = async (query: Query) => {
  const { search, categoryId } = query;
  return await db.product.count({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          category: {
            name: {
              contains: search,
            },
          },
        },
        {
          categoryId,
        },
      ],
    },
  });
};

export const getProductById = async (productId: string) => {
  return await db.product.findUnique({
    where: {
      id: productId,
    },
  });
};
