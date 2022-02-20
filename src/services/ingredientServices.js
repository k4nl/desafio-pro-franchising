const { ObjectId, isValid } = require('mongodb');
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

  return ingredientModels.createIngredient(dataFormat);
};

const findIngredientById = async (id) => {
  if (!ObjectId.isValid(id) || id !== 'string') {
    throw new CustomError(e.wrongObjectIdFormat);
  };

  const ingredient = await ingredientModels.findIngredientById(id);
  verify.verifyIfIngredientIdExist(ingredient);

  return ingredient;
}

module.exports = {
  createIngredient,
  findIngredientById,
}