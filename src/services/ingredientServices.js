const { ObjectId } = require('mongodb');
const ingredientModels = require('../models/ingredientModels');
const CustomError = require('../middlewares/CustomError');
const e = require('../utils/dictionary/errorObjects');
const schema = require('../schemas/ingredientSchema');
const verify = require('../utils/functions');


const createIngredient = async (ingredientData) => {
  const { error } = schema.ingredientSchema.validate(ingredientData);
  verify.verifyJoiError(error);
  const dataFormat = verify.dataFormat(ingredientData);

  const ingredient = await ingredientModels.findIngredientByName(dataFormat.name);
  verify.verifyIngredientName(ingredient);
  console.log(dataFormat);

  const ingredientCreated = await ingredientModels.createIngredient(dataFormat);
  return ingredientCreated;

};

module.exports = {
  createIngredient,
}