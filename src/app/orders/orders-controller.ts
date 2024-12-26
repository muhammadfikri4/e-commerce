import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/error-code";
import { HandleResponse } from "../../utils/handle-response";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import * as orderService from "./orders-service";

export const createOrder = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { body, customerId } = req;
  const result = await orderService.createOrder(customerId ?? "", body);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 200, MESSAGE_CODE.CREATED, MESSAGES.SUCCESS.ORDER.CREATE);
};

export const getOrders = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { query, customerId } = req;
  const result = await orderService.getOrders({
    ...query,
    customerId,
  });
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.ORDER.GET,
    result
  );
};
