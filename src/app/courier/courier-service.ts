import { Query } from "../../interface/Query";
import { CourierDAO } from "./courier-dao";
import { getCourierDTOMapper } from "./courier-mapper";
import * as courierRepository from "./courier-repository";

export const createCourier = async (data: CourierDAO) => {
  const result = await courierRepository.createCourier({
    name: data.name,
  });
  return result;
};

export const getCourier = async (query: Query) => {
  const result = await courierRepository.getCourier(query);
  return getCourierDTOMapper(result);
};
