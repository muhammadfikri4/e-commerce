import { db } from "../../config";
import { ChartDAO } from "./chart-dao";

export const createChart = async (data: ChartDAO) => {
  return await db.chart.create({
    data: {
      customerId: data.customerId,
      productId: data.productId,
    },
  });
};

export const getChartByCustomerId = async (customerId: string) => {
  return await db.chart.findMany({
    where: {
      customerId,
    },
  });
};
