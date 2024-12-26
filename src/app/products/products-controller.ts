import { NextFunction, Request, Response } from "express";
import * as productService from "./products-service";
import { ErrorApp } from "../../utils/http-error";
import { HandleResponse } from "../../utils/handle-response";
import { MESSAGE_CODE } from "../../utils/error-code";
import { MESSAGES } from "../../utils/messages";
import { createProductSchema } from "./products-request";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file as Express.Multer.File;
  const { body } = req;
  const combine = {
    ...body,
    image: file,
  };

  const validate = createProductSchema.validate(combine);
  if (validate.error) {
    next(
      new ErrorApp(
        validate.error.message.replace(/"/g, ""),
        400,
        MESSAGE_CODE.BAD_REQUEST
      )
    );
    return;
  }

  const result = await productService.createProduct(combine);
  if (result instanceof ErrorApp) {
    next(result);
    return;
  }
  HandleResponse(res, 201, MESSAGE_CODE.CREATED, MESSAGES.CREATED.PRODUCT);
};
