import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().integer().min(1),
  product: Joi.string().when("id", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  quantity: Joi.number().integer().min(1).when("id", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  price: Joi.number().precision(2).min(0).when("id", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  saleOrderId: Joi.number().integer().min(1).when("id", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
});

export default schema;
