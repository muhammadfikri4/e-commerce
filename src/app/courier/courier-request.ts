import Joi from "joi";

export const createCourierSchema = Joi.object({
  name: Joi.string().required(),
});
