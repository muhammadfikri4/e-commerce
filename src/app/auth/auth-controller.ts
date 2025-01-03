import { NextFunction, Request, Response } from "express";
import { ErrorApp } from "../../utils/http-error";
import { HandleResponse } from "../../utils/handle-response";
import { MESSAGES } from "../../utils/messages";
import { MESSAGE_CODE } from "../../utils/error-code";
import * as authService from "./auth-service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const result = await authService.register(body);

  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    201,
    MESSAGE_CODE.CREATED,
    MESSAGES.SUCCESS.USER.REGISTER
  );
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const result = await authService.login(body);

  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.USER.LOGIN,
    result
  );
};
