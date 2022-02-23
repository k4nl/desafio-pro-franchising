const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(1).required(),
  productIngredients: Joi.array().required(),
});


module.exports = {
  productSchema,
}