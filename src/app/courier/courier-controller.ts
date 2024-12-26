import { NextFunction, Response, Request } from "express";
import * as courierService from "./courier-service";
import { ErrorApp } from "../../utils/http-error";
import { HandleResponse } from "../../utils/handle-response";
import { MESSAGE_CODE } from "../../utils/error-code";
import { MESSAGES } from "../../utils/messages";

export const createCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const result = await courierService.createCourier(body);

  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    201,
    MESSAGE_CODE.CREATED,
    MESSAGES.SUCCESS.COURIER.CREATE
  );
};

export const getCourier = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { query } = req;
  const result = await courierService.getCourier(query);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    201,
    MESSAGE_CODE.CREATED,
    MESSAGES.SUCCESS.COURIER.GET,
    result
  );
};
