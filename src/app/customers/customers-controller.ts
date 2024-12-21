import { NextFunction, Request, Response } from "express";
import * as customerService from "./customers-service";
import { ErrorApp } from "../../utils/HttpError";
import { HandleResponse } from "../../utils/HandleResponse";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const result = await customerService.createCustomer(body);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.CUSTOMER);
};
