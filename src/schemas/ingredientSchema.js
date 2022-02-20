const Joi = require('joi');

const ingredientSchema = Joi.object({
  name: Joi.string().required(),
  unitOfMeasurement: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  unitPrice: Joi.number().min(0).required(),
});

const updateSchema = Joi.object({
  quantity: Joi.number().min(0).required(),
  unitPrice: Joi.number().min(0).required(),
});

module.exports = {
  ingredientSchema,
  updateSchema,
}