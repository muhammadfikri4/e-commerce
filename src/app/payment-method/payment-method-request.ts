import Joi from "joi";

export const createPaymentMethodSchema = Joi.object({
  name: Joi.string().required(),
});
