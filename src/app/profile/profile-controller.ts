import { NextFunction, Response } from "express";
import { RequestWithAccessToken } from "../../interface/Request";
import { MESSAGE_CODE } from "../../utils/error-code";
import { HandleResponse } from "../../utils/handle-response";
import { ErrorApp } from "../../utils/http-error";
import { MESSAGES } from "../../utils/messages";
import * as profileService from "./profile-service";

export const getProfile = async (
  req: RequestWithAccessToken,
  res: Response,
  next: NextFunction
) => {
  const { customerId } = req;
  const result = await profileService.getProfile(customerId ?? "");

  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(
    res,
    200,
    MESSAGE_CODE.SUCCESS,
    MESSAGES.SUCCESS.PROFILE.GET,
    result
  );
};
