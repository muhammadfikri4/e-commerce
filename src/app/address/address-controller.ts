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

export const updateAddress = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { body, customerId, params } = req;
  const { addressId } = params;
  const result = await addressService.updateAddress(addressId, {
    ...body,
    customerId,
  });
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.SUCCESS.ADDRESS.UPDATE);
};

export const getAddressCustomer = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { customerId, query } = req;
  const result = await addressService.getAddressCustomer({
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
    MESSAGES.SUCCESS.ADDRESS.GET,
    result
  );
};
