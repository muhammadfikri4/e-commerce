import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createCourierSchema } from "./courier-request";
import { createCourier, getCourier } from "./courier-controller";

export const courierRoute = Router();

courierRoute.post("/", validateRequest(createCourierSchema), createCourier);
courierRoute.get("/", getCourier);
