import Joi from "joi";

const schema = Joi.object({
  id: Joi.number().integer().min(1),
  customer: Joi.string().when("id", {
    is: Joi.exist(),
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  deliveryAddress: Joi.string().optional().allow(""),
  paymentMethod: Joi.string()
    .valid("Cash", "Credit Card", "Debit Card")
    .when("id", {
      is: Joi.exist(),
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
});

export default schema;
