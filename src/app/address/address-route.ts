import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAddressSchema, updateAddressSchema } from "./address-request";
import { createAddress, getAddressCustomer, updateAddress } from "./address-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const addressRoute = Router();

addressRoute.post(
  "/",
  validateRequest(createAddressSchema),
  CatchWrapper(createAddress)
);
addressRoute.patch('/:addressId', validateRequest(updateAddressSchema), CatchWrapper(updateAddress))
addressRoute.get("/", CatchWrapper(getAddressCustomer));
