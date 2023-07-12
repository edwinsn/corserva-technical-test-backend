import Joi from "joi";

export const schema = Joi.object({
  id: Joi.number().integer().min(1),
  product: Joi.string().required(),
  quantity: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).min(0).required(),
  saleOrderId: Joi.number().integer().min(1).required(),
});

export default schema;
