import { Query } from "../../interface/Query";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import { ErrorApp } from "../../utils/HttpError";
import { MESSAGES } from "../../utils/Messages";
import { Meta } from "../../utils/Meta";
import { CategoryDAO } from "./categories-dao";
import * as categoryRepository from "./categories-repository";

export const createCategory = async (data: CategoryDAO) => {
  const category = await categoryRepository.getCategoryByName(data.name);
  if (category) {
    return new ErrorApp(
      MESSAGE_CODE.BAD_REQUEST,
      400,
      MESSAGES.ERROR.ALREADY.CATEGORY
    );
  }

  const result = await categoryRepository.createCategory({
    description: data.description,
    name: data.name,
  });

  return result;
};

export const getCategories = async (query: Query) => {
  const { page = "1", perPage = "10" } = query;
  const [categories, totalData] = await Promise.all([
    categoryRepository.getCategory(query),
    categoryRepository.getCategoryCount(query),
  ]);
  const meta = Meta(Number(page), Number(perPage), Number(totalData));
  return {
    data: categories,
    meta,
  };
};
