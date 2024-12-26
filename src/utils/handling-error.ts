import { NextFunction, type Request, type Response } from "express";
import { MESSAGE_CODE } from "./error-code";
import { HandleResponse } from "./handle-response";
import { ErrorApp } from "./http-error";
import { MESSAGES } from "./messages";

export const HandlingError = (
  err: ErrorApp | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req, next);
  console.log(err)
  if (err instanceof ErrorApp) {
    return HandleResponse(res, err.statusCode, err.code, err.message);
  }
  return HandleResponse(
    res,
    500,
    MESSAGE_CODE.INTERNAL_SERVER_ERROR,
    MESSAGES.ERROR.SERVER_ERROR.INTERNAL_SERVER_ERROR
  );
};
