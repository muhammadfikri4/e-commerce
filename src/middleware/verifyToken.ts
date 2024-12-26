import { NextFunction, type Request, type Response } from "express";
import { TokenDecodeInterface } from "../interface";
import {
  TokenExpiredError,
  decode,
  verify,
  JsonWebTokenError,
} from "jsonwebtoken";
import { RequestWithAccessToken } from "../interface/Request";
import { config } from "../libs";
import { MESSAGE_CODE } from "../utils/error-code";
import { HandleResponse } from "../utils/handle-response";
import { MESSAGES } from "../utils/messages";
import { ErrorApp } from "../utils/http-error";
import * as customersRepository from "../app/customers/customers-repository";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization?.replace("Bearer ", "");

    if (!token) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.FORBIDDEN
      );
    }
    const decoded = decode(token) as TokenDecodeInterface;
    let errno: ErrorApp | undefined;
    verify(token, config.JWT_SECRET as string, (err: unknown) => {
      if (err) {
        console.log(err);
        if (err instanceof TokenExpiredError) {
          errno = new ErrorApp(
            MESSAGES.ERROR.UNAUTHORIZED.EXPIRED,
            401,
            MESSAGE_CODE.UNAUTHORIZED
          );
          return;
        }
        if (err instanceof JsonWebTokenError) {
          errno = new ErrorApp(err.message, 401, MESSAGE_CODE.UNAUTHORIZED);
          return;
        }
        errno = new ErrorApp(
          MESSAGES.ERROR.INVALID.TOKEN,
          401,
          MESSAGE_CODE.UNAUTHORIZED
        );
      }
    });

    if (errno) {
      next(errno);
      return;
    }
    if (!decoded?.customerId) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED
      );
    }

    const user = await customersRepository.getCustomerById(decoded?.customerId);
    if (!user) {
      return HandleResponse(
        res,
        401,
        MESSAGE_CODE.UNAUTHORIZED,
        MESSAGES.ERROR.UNAUTHORIZED.RECOGNIZED
      );
    }
    (req as RequestWithAccessToken).customerId = decoded?.customerId;
    next();
  } catch (error) {
    console.log(error);
  }
};
