import { db } from "../../config";
import { Query } from "../../interface/Query";
import { queryPagination } from "../../utils/query-pagination";
import { CategoryDAO } from "./categories-dao";

export const getCategoryByName = async (name: string) => {
  return await db.category.findFirst({
    where: {
      name,
    },
  });
};

export const createCategory = async (data: CategoryDAO) => {
  return await db.category.create({
    data: {
      name: data.name,
      description: data.description,
    },
  });
};

export const getCategory = async (query: Query) => {
  const { search } = query;
  return await db.category.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      description: {
        contains: search,
        mode: "insensitive",
      },
    },
    ...queryPagination(query),
  });
};

export const getCategoryCount = async (query: Query) => {
  const { search } = query;
  return await db.category.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
      description: {
        contains: search,
        mode: "insensitive",
      },
    },
  });
};

export const getCategoryById = async (categoryId: string) => {
  return await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
};
