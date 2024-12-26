import { Category, Product } from "@prisma/client";
import { ProductDTO } from "./products-dto";
import { filePath } from "../../utils/file-path";
import { BUCKET_FOLDER } from "../../utils/upload-file-storage";

interface ProductData extends Product {
  category: Category;
}

export const getProductsDTOMapper = (data: ProductData[]): ProductDTO[] => {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description,
    image: filePath(`${BUCKET_FOLDER.products}/${item.image}`),
    price: Number(item.price),
    stock: item.stock,
    category: {
      id: item.category.id,
      name: item.category.name,
    },
  }));
};
