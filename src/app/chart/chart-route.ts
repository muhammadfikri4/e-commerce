import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createChart } from "./chart-controller";
import { createChartSchema } from "./chart-request";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const chartRoute = Router();

chartRoute.post(
  "/",
  validateRequest(createChartSchema),
  CatchWrapper(createChart)
);
