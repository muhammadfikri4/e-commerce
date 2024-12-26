import Joi from "joi";

export const createAddressSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  description: Joi.string().required(),
  longitude: Joi.string().required(),
  latitude: Joi.string().required(),
  isPrimary: Joi.boolean().required(),
});
