import { Customer } from "@prisma/client";
import { ProfileDTO } from "./profile-dto";

export const getProfileDTOMapper = (customer: Customer): ProfileDTO => {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
  };
};
