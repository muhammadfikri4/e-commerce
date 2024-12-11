import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../../utils/HttpError";
import { HandleResponse } from "utils/HandleResponse";
import { MESSAGES } from "../../utils/Messages";
import { MESSAGE_CODE } from "../../utils/ErrorCode";
import * as authService from "./auth-service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { body } = req;
  const result = await authService.register(body);

  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.CUSTOMER);
};
