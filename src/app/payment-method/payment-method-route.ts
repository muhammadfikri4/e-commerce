import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createPaymentMethodSchema } from "./payment-method-request";
import { CatchWrapper } from "../../utils/catch-wrapper";
import { createPaymentMethod } from "./payment-method-controller";

export const paymentMethodRoute = Router();

paymentMethodRoute.post(
  "/",
  validateRequest(createPaymentMethodSchema),
  CatchWrapper(createPaymentMethod)
);
