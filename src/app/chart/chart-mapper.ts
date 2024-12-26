import { Chart } from "@prisma/client";
import { ProductData } from "../products/products-mapper";
import { ChartDTO } from "./chart-dto";

interface ChartData extends Chart {
  product: ProductData;
}

export const getChartDTOMapper = (data: ChartData[]): ChartDTO[] => {
  return data.map((item) => ({
    id: item.id,
    product: {
      id: item.product.id,
      name: item.product.name,
      price: Number(item.product.price),
      category: {
        id: item.product.category.id,
        name: item.product.category.name,
      },
    },
    total: {
      count: Number(item.count),
      price: Number(item.product.price) * Number(item.count),
    },
  }));
};
