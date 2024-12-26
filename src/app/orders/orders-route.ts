import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createOrderSchema } from "./orders-request";
import { createOrder } from "./orders-controller";

export const orderRoute = Router();

orderRoute.post("/", validateRequest(createOrderSchema), createOrder);
