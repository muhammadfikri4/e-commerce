import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createAddressSchema } from "./address-request";
import { createAddress, getAddressCustomer } from "./address-controller";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const addressRoute = Router();

addressRoute.post(
  "/",
  validateRequest(createAddressSchema),
  CatchWrapper(createAddress)
);

addressRoute.get("/", CatchWrapper(getAddressCustomer));
