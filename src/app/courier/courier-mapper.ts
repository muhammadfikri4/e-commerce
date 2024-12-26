import { Courier } from "@prisma/client";

interface CourierData extends Courier {
  _count: {
    order: number;
  };
}

export const getCourierDTOMapper = (data: CourierData[]) => {
  return data.map((item) => ({
    id: item.id,
    name: item.name,
    totalOrder: item._count.order,
  }));
};
