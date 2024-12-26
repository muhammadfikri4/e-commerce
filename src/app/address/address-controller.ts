import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/error-code";
import { HandleResponse } from "../../utils/handle-response";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import * as addressService from "./address-service";

export const createAddress = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { body, customerId } = req;
  const result = await addressService.createAddress({ ...body, customerId });
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.ADDRESS);
};
