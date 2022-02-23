const { ObjectId } = require('mongodb');
const productModels = require('../models/productModels');
const ingredientModels = require('../models/ingredientModels');
const schema = require('../schemas/saleSchema');
const verify = require('../utils/functions');




const register = async (sale) => {
  const allProducts = await productModels.findAllProducts();
  const newQuantity = verify.setNewQuantity(allProducts, sale);
  console.log(newQuantity);
  const allIngredients = await ingredientModels.findAll();
  const newStock = verify.verifyIngredientStock(allIngredients, newQuantity);
  await newStock.forEach((item) => ingredientModels.decreaseIngredientStock(item));
};

module.exports = {
  register,
}