import Joi from "joi";

export const createChartSchema = Joi.object({
    productId: Joi.string().required(),
})