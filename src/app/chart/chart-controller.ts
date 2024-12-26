import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/error-code";
import { HandleResponse } from "../../utils/handle-response";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import * as chartService from "./chart-service";

export const createChart = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { body, customerId } = req;
  const result = await chartService.createChart({
    ...body,
    customerId,
  });
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.SUCCESS.CHART.ADD);
};

export const getChart = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { customerId } = req;
  const result = await chartService.getChart(customerId ?? "");
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.CHART.GET,
    result
  );
};
