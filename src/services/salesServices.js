const productModels = require('../models/productModels');
const ingredientModels = require('../models/ingredientModels');
const salesModels = require('../models/salesModels');
const verify = require('../utils/functions');




const register = async (sale) => {
  const allProducts = await productModels.findAllProducts();
  const newQuantity = verify.setNewQuantity(allProducts, sale);
  const allIngredients = await ingredientModels.findAll();
  const newStock = verify.verifyIngredientStock(allIngredients, newQuantity);
  const cost = newStock.reduce((acc, curr) => acc + curr.stockPrice, 0);
  const saleData = {
    productsSold: sale,
    ingredients: newStock,
    cost,
  }
  await newStock.forEach((item) => ingredientModels.decreaseIngredientStock(item));

  await salesModels.createSale(saleData);
  return { sale: saleData };
};

module.exports = {
  register,
}