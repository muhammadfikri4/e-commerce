import Joi from "joi";

export const createProductSchema = Joi.object({
  image: Joi.any().required(),
  categoryId: Joi.string().required(),
  name: Joi.string().required(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  description: Joi.string().optional(),
});
