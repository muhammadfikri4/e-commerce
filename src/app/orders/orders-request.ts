import Joi from "joi";

const productItemSchema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().required(),
});

export const createOrderSchema = Joi.object({
  estimated: Joi.string().required(),
  addressId: Joi.string().required(),
  paymentMethodId: Joi.string().required(),
  products: Joi.array().items(productItemSchema).required(),
});
