import { db } from "../../config";
import { Query } from "../../interface/Query";
import { ChartDAO } from "./chart-dao";

export const createChart = async (data: ChartDAO) => {
  return await db.chart.create({
    data: {
      customerId: data.customerId,
      productId: data.productId,
      count: data.count,
    },
  });
};

export const getChartsByCustomerId = async (query: Query) => {
  const { customerId, search } = query;
  return await db.chart.findMany({
    where: {
      OR: [
        {
          customerId,
        },
        {
          product: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          product: {
            category: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const getChartProduct = async (data: Omit<ChartDAO, "count">) => {
  return await db.chart.findFirst({
    where: {
      customerId: data.customerId,
      productId: data.productId,
    },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const updateChartIncreaseCount = async (
  chartId: string,
  data: Partial<ChartDAO>
) => {
  return await db.chart.update({
    where: {
      id: chartId,
    },
    data: {
      count: {
        increment: data.count,
      },
      productId: data.productId,
      customerId: data.customerId,
    },
  });
};
