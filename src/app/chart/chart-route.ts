import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createChart, getChart } from "./chart-controller";
import { createChartSchema } from "./chart-request";
import { CatchWrapper } from "../../utils/catch-wrapper";

export const chartRoute = Router();

chartRoute.post(
  "/",
  validateRequest(createChartSchema),
  CatchWrapper(createChart)
);

chartRoute.get("/", CatchWrapper(getChart));
