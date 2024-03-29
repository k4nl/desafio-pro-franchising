const { ObjectId } = require('mongodb');
const ingredientModels = require('../models/ingredientModels');
const productModels = require('../models/productModels')
const CustomError = require('../middlewares/CustomError');
const e = require('../utils/dictionary/errorObjects');
const schema = require('../schemas/ingredientSchema');
const verify = require('../utils/functions');


const createIngredient = async (ingredientData) => {
  const { error } = schema.ingredientSchema.validate(ingredientData);
  verify.verifyJoiError(error);
  verify.verifyUnitOfMeasurement(ingredientData.unitOfMeasurement);
  const dataFormat = verify.dataFormat(ingredientData);

  const ingredient = await ingredientModels.findIngredientByName(dataFormat.name);
  verify.verifyIngredientName(ingredient);

  return ingredientModels.createIngredient(dataFormat);
};

const findIngredientById = async (id) => {
  if (!ObjectId.isValid(id)) {
    throw new CustomError(e.wrongObjectIdFormat);
  };

  const ingredient = await ingredientModels.findIngredientById(id);
  verify.verifyIfIngredientIdExist(ingredient);

  return ingredient;
}

const findAll = async () => ingredientModels.findAll();

const updateIngredient = async (id, data) => {
  const { error } = schema.updateSchema.validate(data);
  verify.verifyJoiError(error);

  const { ingredient } = await findIngredientById(id);
  const newData = verify.dataFormat({ ...ingredient, quantity: data.quantity, unitPrice: data.unitPrice });

  await ingredientModels.updateIngredient(id, newData)
  const products = await productModels.findAllProducts();
  const productsCostUpdated = verify.verifyAllProductsToUpdate(products, id, newData);
  
  await productsCostUpdated.forEach(({ _id, product}) => productModels.updateProductCost(_id, product));

  return { _id: id, ingredient: newData };
};

const deleteIngredient = async (id) => {
  const ingredient = await findIngredientById(id);
  await ingredientModels.deleteIngredient(id);
  return ingredient;
}


module.exports = {
  createIngredient,
  findIngredientById,
  findAll,
  updateIngredient,
  deleteIngredient,
}