import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createOrderSchema, paymentOrderSchema } from "./orders-request";
import { createOrder, getOrders, paymentOrder, receivedOrder } from "./orders-controller";

export const orderRoute = Router();

orderRoute.post("/", validateRequest(createOrderSchema), createOrder);
orderRoute.get("/", getOrders);
orderRoute.post("/:orderId/payment", validateRequest(paymentOrderSchema), paymentOrder);
orderRoute.post("/:orderId/received", receivedOrder);
