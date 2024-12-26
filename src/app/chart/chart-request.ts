import Joi from "joi";

export const createChartSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().min(1).required(),
});
